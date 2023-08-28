<template>
  <div class="bg-red-100">
    <v-button>Train now</v-button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  emits: ["input"],
  setup(props, { emit }) {
    return { handleChange };

    function handleChange(value) {
      emit("input", value);
    }
  },
};
</script>