<template>
  <button class="saga-button" :class="{[`saga-button-${type}`]: true}" type="button">
    <slot></slot>
  </button>
</template>

<script>
import { oneOf } from '../../utils';

export default {
  name: 'SButton',
  props: {
    type: {
      validator (value) {
          return oneOf(value, ['default', 'primary', 'info', 'success', 'warning', 'error']);
      },
      type: String,
      default: 'default'
    }
  }
}
</script>
