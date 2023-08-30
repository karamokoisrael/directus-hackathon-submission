import InterfaceComponent from "./interface.vue";

export default {
  id: "ml-ops-training-interface",
  name: "Ml Ops Training Interface",
  icon: "box",
  description: "",
  component: InterfaceComponent,
  types: ["alias"],
  localTypes: ["presentation"],
  group: "presentation",
  options: [
    {
      field: "model_name",
      name: "Model Name",
      type: "string",
      meta: {
        required: true,
        width: "half",
        interface: "input",
        options: {
          placeholder: "$t:value_unique",
        },
      },
    },
    {
      field: "model_type",
      name: "Model type",
      type: "string",
      meta: {
        required: true,
        width: "half",
        interface: "select-dropdown",
        options: {
          choices: [
            {
              text: "Neural Network",
              value: "NeuralNetwork",
            },
            {
              text: "RNN",
              value: "RNN",
            },
            {
              text: "LSTMTimeStep",
              value: "LSTMTimeStep",
            },
            {
              text: "LSTM",
              value: "LSTM",
            },
          ],
        },
      },
      schema: {
        default_value: "NeuralNetwork",
      },
    },
    {
      field: "collection_name",
      type: "string",
      name: "Collection",
      meta: {
        required: true,
        interface: "system-collection",
        options: {
          includeSystem: true,
        },
        width: "half",
      },
    },
    {
      field: "input_fields",
      name: "Input fields",
      type: "json",
      meta: {
        required: true,
        width: "half",
        interface: "tags",
        options: {
          includeSystem: true,
        },
      },
    },
    {
      field: "output_fields",
      name: "Output fields",
      type: "json",
      meta: {
        required: true,
        width: "half",
        interface: "tags",
      },
    },
    {
      field: "model_params",
      name: "Additional model parameters",
      type: "json",
      meta: {
        width: "half",
        interface: "input-code",
      },
    },
    {
      field: "training_params",
      name: "Additional training parameters",
      type: "json",
      meta: {
        width: "half",
        interface: "input-code",
      },
    },
  ],
};
