import { Filter } from "@directus/types";
export interface TrainingParams {
  collection: string;
  filter?: Filter;
  input_fields: string[];
  output_fields: string[];
  validation_split?: number;
  model_name?: string;
  model_type: BrainJsModel;
  model_params?: Record<string, any>;
  input_fields: string[];
  output_fields: string[];
  training_checkpoint?: string;
  training_params?: Record<string, any>;
}

export interface TrainingData {
  trainSplit: any[];
  validationSplit: any[];
}

export interface ModelData {
  collection: string;
  filter?: Filter;
  input_fields: string[];
  output_fields: string[];
  validation_split?: number;
  model_name?: string;
  model_type: BrainJsModel;
  model_params: Record<string, any>;
  input_fields: string[];
  output_fields: string[];
  training_checkpoint?: string;
  training_params?: Record<string, any>;
  training_logs?: Record<string, any>;
  training_progress?: number;
}

export type BrainJsModel = "NeuralNetwork" | "RNN" | "LSTMTimeStep" | "LSTM";
