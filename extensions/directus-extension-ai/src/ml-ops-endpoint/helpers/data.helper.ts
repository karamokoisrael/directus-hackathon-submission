import { AbstractServiceOptions } from "./../../@types/services.d";
import { AbstractService } from "../../@types/services";
import { TrainingData, TrainingParams } from "./../../@types/model.d";
// import natural from "natural";

export async function getTrainingData(
  trainingParams: TrainingParams,
  context: any,
  serviceOptions: AbstractServiceOptions
): Promise<TrainingData> {
  const collectionService: AbstractService = new context.services.ItemsService(
    trainingParams.collection,
    serviceOptions
  );
  const dataFilter = trainingParams.filter ? trainingParams.filter : {};
  const dataFields = [
    ...trainingParams.input_fields,
    ...trainingParams.output_fields,
  ];
  const data = await collectionService.readByQuery({
    filter: dataFilter,
    fields: dataFields,
    limit: -1,
  });
  // const splitPercentage =
  //   trainingParams.validation_split &&
  //   trainingParams.validation_split > 0 &&
  //   trainingParams.validation_split <= 100
  //     ? Math.round(trainingParams.validation_split)
  //     : 10;
  // const [validationSplit, trainSplit] = splitArray(data, splitPercentage);
  const trainSplit = data;
  const validationSplit: any = [];
  return {
    trainSplit: trainSplit as any,
    validationSplit: validationSplit as any,
  };
}

export function splitArray(array: unknown[], percentage: number) {
  const totalElements = array.length;
  const splitIndex = Math.floor(totalElements * (percentage / 100));

  const firstPart = array.slice(0, splitIndex);
  const secondPart = array.slice(splitIndex);

  return [firstPart, secondPart];
}

export function sanitizeFieldValue(value: any) {
  switch (typeof value) {
    case "boolean":
      return value ? 1 : 0;
    default:
      return value;
  }
}

export function tokenizeWord() {}
