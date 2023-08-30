<template>
  <div class="bg-red-100">
    <v-button v-on:click="train()">Train now</v-button>
  </div>
</template>

<script lang="ts">
import { useSync } from "@directus/extensions-sdk";

// const api = useApi();
const sync = useSync();

export default {
  props: {},
  setup(props) {
    const modelName = useSync(props, "model_name");
  },
  methods: {
    async train() {
      console.log(modelName);

      // const data = await api.post("/ml-ops/train/");
      // console.log(data);
      // sync.
      // console.log("training");
    },
  },
};
</script>