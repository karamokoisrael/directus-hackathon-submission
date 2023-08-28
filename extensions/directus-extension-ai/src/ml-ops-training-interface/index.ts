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
      field: "modelType",
      name: "Model type",
      type: "string",
      meta: {
		required: true,
        width: "half",
        interface: "select-dropdown",
        options: {
          choices: [{ text: "Neural Network", value: "NeuralNetwork" }],
        },
      },
      schema: {
        default_value: "NeuralNetwork",
      },
    },
	{
		field: 'selectedCollection',
		type: 'string',
		name: 'Collection',
		meta: {
			required: true,
			interface: 'system-collection',
			options: {
				includeSystem: true
			},
			width: 'half',
		},
	},
	{
		field: 'inputFields',
		name: 'Input fields',
		type: 'string',
		meta: {
			required: true,
			width: 'half',
			interface: 'tags',
		},
	},
	{
		field: 'outputFields',
		name: 'Output fields',
		type: 'string',
		meta: {
			required: true,
			width: 'half',
			interface: 'tags',
		},
	},
  ],
};
