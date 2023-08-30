<template>
  <div class="extension-container">
    <textarea
      :value="predictionData"
      @input="handleChange($event.target.value)"
    />
    <br />
    <v-progress-linear v-if="loading" indeterminate />

    <div style="background-color: #f0f4f9; height: 200px; width: 100%">
      {{ predictionOutput }}
    </div>
    <br />
    <v-button v-on:click="predict()">Predict</v-button>
  </div>
</template>
  
  <script lang="ts">
import { ref } from "vue";
import { useApi } from "@directus/extensions-sdk";
export default {
  props: {
    model_name: {
      type: String,
      default: null,
    },
  },
  setup(props: Record<string, any>) {
    const api = useApi();
    const loading = ref(false);
    const predictionOutput = ref("No prediction for now");
    const predictionData = ref("");
    return {
      props,
      predictionOutput,
      predictionData,
      loading,
      predict,
      handleChange,
    };
    function handleChange(value: string) {
      predictionData.value = value;
    }
    async function predict() {
      try {
        loading.value = true;
        const response = await api.post(`/ml-ops/predict/${props.model_name}`, {
          payload: [JSON.parse(predictionData.value)],
        });
        if (!response.data?.data) throw new Error("");
        predictionOutput.value = JSON.stringify(response.data?.data);
      } catch (error) {
        console.log(error);
        predictionOutput.value = "Something went wrong";
      } finally {
        loading.value = false;
      }
    }
  },
};
</script>
  
<style scoped>
.loader {
  height: 200px !important;
}

.extension-container {
  width: 50% !important;
}
</style>