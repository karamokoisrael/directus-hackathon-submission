import InterfaceComponent from "./interface.vue";

export default {
  id: "ml-ops-prediction-interface",
  name: "Ml Ops Prediction Interface",
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
  ],
};
