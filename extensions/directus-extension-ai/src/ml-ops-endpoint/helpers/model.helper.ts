import {
  BrainJsModel,
  ModelData,
  TrainingData,
  TrainingParams,
} from "./../../@types/model.d";
import { randomUUID } from "@directus/random";
import { AbstractService, AbstractServiceOptions } from "../../@types/services";
import { sanitizeFieldValue } from "./data.helper";

const brain = require("brain.js");
export async function getModelData(
  modelName: string,
  context: any,
  serviceOptions: AbstractServiceOptions
) {
  const mlOpsService: AbstractService = new context.services.ItemsService(
    "ml_ops",
    serviceOptions
  );

  const modelResponse = await mlOpsService.readByQuery({
    filter: { model_name: { _eq: modelName } },
  });

  return modelResponse.length != 0 ? modelResponse[0] : null;
}

export async function createModelData(
  trainingParams: TrainingParams,
  context: any,
  serviceOptions: AbstractServiceOptions
): Promise<ModelData> {
  const mlOpsService: AbstractService = new context.services.ItemsService(
    "ml_ops",
    serviceOptions
  );
  const modelParams = trainingParams.model_params
    ? trainingParams.model_params
    : getBrainJsDefaultModelParams(trainingParams.model_type);
  const modelTrainingParams = trainingParams.training_params
    ? trainingParams.training_params
    : {};
  // const model = getBrainJsModel(trainingParams.model_type, modelParams);
  const modelName = trainingParams.model_name
    ? trainingParams.model_name
    : `model-${trainingParams.collection}-${randomUUID()}`;
  const modelData = {
    collection: trainingParams.collection,
    model_name: modelName,
    model_type: trainingParams.model_type,
    model_params: modelParams,
    input_fields: trainingParams.input_fields,
    output_fields: trainingParams.output_fields,
    training_params: modelTrainingParams,
  };

  await mlOpsService.createOne(modelData);

  return modelData;
}

export async function predict(modelData: ModelData, payload: any[]) {
  const model = getBrainJsModel(
    modelData.model_type,
    modelData.model_params
  ).fromJSON(JSON.parse(modelData.training_checkpoint as string));
  const predictionData = formatBrainJsData(
    {
      modelType: modelData.model_type,
      inputFields: modelData.input_fields,
      outputFields: modelData.output_fields,
    },
    payload
  );

  return predictionData.map((item) => {
    const newItem: Record<string, any> = {};
    const prediction = model.run(item.input);
    for (let i = 0; i < modelData.output_fields.length; i++) {
      // @ts-ignore
      newItem[modelData.output_fields[i]] = prediction[i];
    }
    return newItem;
  });
}

export async function trainModel(
  data: {
    modelData: ModelData;
    trainingData: TrainingData;
  },
  context: any,
  serviceOptions: AbstractServiceOptions
) {
  const model = getBrainJsModel(
    data.modelData.model_type,
    data.modelData.model_params
  );

  const trainData = formatBrainJsData(
    {
      modelType: data.modelData.model_type,
      inputFields: data.modelData.input_fields,
      outputFields: data.modelData.output_fields,
    },
    data.trainingData.trainSplit
  );

  // const validationData = formatBrainJsData(
  //   {
  //     modelType: data.modelData.model_type,
  //     inputFields: data.modelData.input_fields,
  //     outputFields: data.modelData.output_fields,
  //   },
  //   data.trainingData.validationSplit
  // );

  const trainingOptions: Record<string, any> = {
    ...data.modelData.training_params,
    iterations: trainData.length,
    log: (step: any) => {
      console.log(step);
      updateModel(
        {
          modelName: data.modelData.model_name as string,
          payload: {
            training_logs: {
              step,
            },
            training_progress: Math.round(
              (step.iterations * 100) / trainData.length
            ),
          },
        },
        context,
        serviceOptions
      );
    },
  };

  model
    .trainAsync(trainData, trainingOptions)
    .then((step: any) => {
      // const validation = validationData.map((item) => model.run(item.input));
      // console.log(validationData.map((item) => item.output));
      // console.log(validation);

      // const validationResult = validation.filter((item) => item).length;
      updateModel(
        {
          modelName: data.modelData.model_name as string,
          payload: {
            training_logs: {
              logs: step,
              // validation_accuracy: Math.round(
              //   (validationResult * 100) / validationData.length
              // ),
              training_sample: trainData.length,
              // validation_sample: validationData.length,
            },
            training_progress: Math.round(
              (step.iterations * 100) / trainData.length
            ),
            training_checkpoint: model.toJSON(),
          },
        },
        context,
        serviceOptions
      );
    })
    .catch((err: any) => {
      console.log(err);
    });
}

export async function updateModel(
  data: {
    modelName: string;
    payload: Partial<ModelData>;
  },
  context: any,
  serviceOptions: AbstractServiceOptions
) {
  const mlOpsService: AbstractService = new context.services.ItemsService(
    "ml_ops",
    serviceOptions
  );

  await mlOpsService.updateByQuery(
    {
      filter: {
        model_name: {
          _eq: data.modelName,
        },
      },
    },
    data.payload
  );
}

export function getBrainJsModel(
  modelType: BrainJsModel,
  modelParams: Record<string, any>
) {
  let model = new brain.NeuralNetwork(modelParams);
  switch (modelType) {
    case "NeuralNetwork":
      model = new brain.NeuralNetwork(modelParams);
      break;
    case "RNN":
      model = new brain.recurrent.RNN(modelParams);
      break;
    case "LSTMTimeStep":
      model = new brain.recurrent.LSTMTimeStep(modelParams);
      break;
    case "LSTM":
      model = new brain.recurrent.LSTM(modelParams);
      break;
    default:
      break;
  }
  return model;
}

export function getBrainJsDefaultModelParams(modelType: BrainJsModel) {
  switch (modelType) {
    case "NeuralNetwork":
      return {
        // binaryThresh: 0.5,
        hiddenLayers: [3],
        // activation: "sigmoid",
        // leakyReluAlpha: 0.01,
      };
    default:
      return {};
  }
}

export function formatBrainJsData(
  params: {
    modelType: BrainJsModel;
    inputFields: string[];
    outputFields: string[];
  },
  data: any[]
) {
  switch (params.modelType) {
    case "NeuralNetwork":
      return recordsToNeuralNetworkData(
        data,
        params.inputFields,
        params.outputFields
      );
    default:
      return recordsToNeuralNetworkData(
        data,
        params.inputFields,
        params.outputFields
      );
  }
}

export function recordsToNeuralNetworkData(
  data: any[],
  inputFields: string[],
  outputFields: string[]
) {
  return data.map((item) => {
    // const newItem: Record<string, any> = { input: {}, output: {} };
    const newItem: Record<string, any> = { input: [], output: [] };
    inputFields.forEach((field) => {
      // newItem.input[field] = item[field];
      newItem.input.push(sanitizeFieldValue(item[field]));
    });
    outputFields.forEach((field) => {
      // newItem.output[field] = item[field];
      newItem.output.push(sanitizeFieldValue(item[field]));
    });
    return newItem;
  });
}

export function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
