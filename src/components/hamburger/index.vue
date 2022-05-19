<template>
  <div
    style="padding: 0 15px;"
    @click="toggleClick"
  >
    <img
      class="hamburger"
      :class="{ 'is-active': isActive }"
      src="./hamburger.svg"
      alt="hamburger"
    >
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Hamburger-view',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleClick() {
      this.$emit('toggle-click');
    },
  },
});
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  transition: all 0.3s;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
