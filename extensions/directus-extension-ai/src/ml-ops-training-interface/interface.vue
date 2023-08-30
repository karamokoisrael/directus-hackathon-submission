<template>
  <div class="extension-container">
    <v-skeleton-loader v-if="loading" class="loader" />
    <ul v-if="!loading">
      <li>Collection: {{ modelData.collection }}</li>
      <li>Model name: {{ modelData.model_name }}</li>
      <li>
        Input fields:
        {{ listToWord(modelData.input_fields) }}
      </li>
      <li>
        Output fields:
        {{ listToWord(modelData.output_fields) }}
      </li>
      <li>
        Training progress:
        <v-progress-linear
          v-if="
            modelData.training_progress != 100 &&
            modelData.training_progress != 0
          "
          :value="modelData.training_progress"
          indeterminate
        />
        {{ modelData.training_progress }} %
      </li>
    </ul>
    <br />
    <v-button v-on:click="train()">Train now</v-button>
  </div>
</template>

<script lang="ts">
import { ref, toRef } from "vue";
import { useItems, useApi } from "@directus/extensions-sdk";
export default {
  props: {
    model_name: {
      type: String,
      default: null,
    },
    model_type: {
      type: String,
      default: "NeuralNetwork",
    },
    collection_name: {
      type: String,
    },
    input_fields: {
      type: String,
      default: undefined,
    },
    output_fields: {
      type: String,
      default: undefined,
    },
    model_params: {
      type: String,
      default: undefined,
    },
    training_params: {
      type: String,
      default: undefined,
    },
  },
  setup(props: Record<string, any>) {
    const modelPrompt = props;
    modelPrompt.collection = props.collection_name;
    delete modelPrompt.collection_name;
    const api = useApi();
    const loading = ref(true);
    const modelData = ref({
      collection: "",
      model_name: "",
      input_fields: [],
      output_fields: [],
      model_params: {},
      training_params: {},
      training_logs: {
        logs: {
          error: 0,
          iterations: 0,
        },
        training_sample: 0,
      },
      training_progress: 0,
    });

    const mlOpsItems = useItems(toRef("ml_ops"), {
      filter: toRef({
        model_name: {
          _eq: props.model_name,
        },
      }),
      fields: toRef(["*"]),
      limit: toRef(undefined),
      sort: toRef(undefined),
      search: toRef(undefined),
      page: toRef(undefined),
    });

    loadModel();
    return { props, modelData, loading, train };

    async function train() {
      await api.post("/ml-ops/train", modelPrompt);
      modelData.value.training_progress = 1;
    }

    async function loadModel() {
      try {
        await syncOpsData();
        setInterval(() => syncOpsData(), 10000);
        loading.value = false;
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          loadModel();
        }, 15000);
      }
    }

    async function syncOpsData() {
      await mlOpsItems.getItems();
      if (mlOpsItems.items.value.length != 0) {
        modelData.value = mlOpsItems.items.value[0] as any;
      } else {
        modelData.value = {
          ...modelData.value,
          ...props,
        };
      }
    }
  },
  methods: {
    listToWord(list: string[]) {
      if (list.length == 0) return "";
      return list.reduce((prev, current) => `${prev}, ${current}`);
    },
  },
};
</script>

<style scoped>
.loader {
  height: 200px !important;
}
</style>