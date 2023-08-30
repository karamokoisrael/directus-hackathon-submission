import { ModelData } from "./../@types/model.d";
import { defineEndpoint } from "@directus/extensions-sdk";
import { createError } from "@directus/errors";
import { getReqServiceOptions } from "../utils/api.util";
import { TrainingParams } from "../@types/model";
import {
  createModelData,
  getModelData,
  predict,
  trainModel,
} from "./helpers/model.helper";
import { getTrainingData } from "./helpers/data.helper";

export default defineEndpoint({
  id: "ml-ops",
  handler: (router, context) => {
    router.use((err: any, req: any, res: any, next: Function) => {
      console.log(err);
      if (err)
        throw createError(
          "INTERNAL_SERVER_ERROR",
          "We encountered an unexpected error during the operation",
          500
        );
      next();
    });
    
    router.post("/predict/:model", async (req, res) => {
      try {
        const serviceOptions = getReqServiceOptions(context.database, req);
        const modelData = await getModelData(
          req.params.model,
          context,
          serviceOptions
        );
        if (!modelData)
          return res.status(400).send({
            message: "Model not found",
            errors: [
              {
                code: "MODEL_NOT_FOUND",
              },
            ],
          });
        const prediction = await predict(
          modelData as ModelData,
          req.body.payload
        );
        res.json({
          data: prediction,
        });
      } catch (error) {
        console.log(error);

        return res.status(500).send({
          message: "We encountered an unexpected error during the operation",
          errors: [
            {
              code: "INTERNAL_SERVER_ERROR",
            },
          ],
        });
      }
    });

    router.post("/train/:model", async (req, res) => {
      try {
        const serviceOptions = getReqServiceOptions(context.database, req);
        const trainingData = await getTrainingData(
          req.body as TrainingParams,
          context,
          serviceOptions
        );
        const modelData = await getModelData(
          req.params.model,
          context,
          serviceOptions
        );

        if (!modelData)
          return res.status(400).send({
            message: "Model not found",
            errors: [
              {
                code: "MODEL_NOT_FOUND",
              },
            ],
          });
        await trainModel(
          {
            modelData: modelData as ModelData,
            trainingData,
          },
          context,
          serviceOptions
        );

        return res.json({
          data: {
            model_data: modelData,
            train_split_length: trainingData.trainSplit?.length,
            validation_split_length: trainingData.validationSplit?.length,
          },
        });
      } catch (error) {
        return res.status(500).send({
          message: "We encountered an unexpected error during the operation",
          errors: [
            {
              code: "INTERNAL_SERVER_ERROR",
            },
          ],
        });
      }
    });

    router.post("/train-new-model", async (req, res) => {
      try {
        const serviceOptions = getReqServiceOptions(context.database, req);
        const trainingData = await getTrainingData(
          req.body as TrainingParams,
          context,
          serviceOptions
        );
        const modelData = await createModelData(
          req.body as TrainingParams,
          context,
          serviceOptions
        );
        await trainModel(
          {
            modelData,
            trainingData,
          },
          context,
          serviceOptions
        );

        res.json({
          data: {
            model_data: modelData,
            train_split_length: trainingData.trainSplit?.length,
            validation_split_length: trainingData.validationSplit?.length,
          },
        });
      } catch (error) {
        console.log(error);
        res.json({
          message: "We encountered an unexpected error during the operation",
          errors: [
            {
              code: "INTERNAL_SERVER_ERROR",
            },
          ],
        });
      }
    });
  },
});
