<template>
  <div class="extension-container">
    <v-textarea
      v-model="predictionData"
      placeholder="Enter you json data here"
      style="width: 100%"
    />
    <br />
    <v-progress-linear v-if="loading" indeterminate />

    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #f0f4f9;
        height: 200px;
        width: 100%;
      "
    >
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
    display_template: {
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
        console.log(predictionData.value);
        
        const response = await api.post(`/ml-ops/predict/${props.model_name}`, {
          payload: [JSON.parse(predictionData.value)],
        });
        if (!response.data?.data || response.data?.data.length == 0) throw new Error("");
        const outputData = response.data?.data[0];
        if(props.display_template){
          let stringData = "";
          Object.keys(outputData).forEach((key) => {
            stringData = stringData
              .replace(new RegExp(`{{${key}}}`, "g"), outputData[key])
              .replace(new RegExp(`{{ ${key} }}`, "g"), outputData[key]);
          });
          predictionOutput.value = stringData;
        }
        console.log(outputData);
        
        predictionOutput.value = JSON.stringify(outputData);
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
  width: 100% !important;
}
</style>