<template>
  <label class="file-select-button">
    <q-btn
      v-bind="$attrs"
      type="a"
    />
    <input
      type="file"
      :multiple="multiple"
      :accept="accept"
      @change="handleFilesChange"
    >
  </label>
</template>

<script>
import { defineComponent } from 'vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'SelectFilesButton',

  props: {
    multiple: {
      type: Boolean,
    },

    accept: {
      type: String,
      default: '*.*',
    },
  },

  setup(props, { emit }) {
    function handleFilesChange(event) {
      if (event.target.files.length) {
        emit('selected', [...event.target.files]);
      }
    }

    return {
      handleFilesChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.file-select-button {
  input[type="file"] {
    display: none;
  }
}
</style>
