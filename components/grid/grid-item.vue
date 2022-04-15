<template>
  <div class="grid-item">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppGridItem'
}
</script>

<style lang="scss" scoped>
.grid-item {
  max-width: $main-col-width;
  word-break: break-word;

  @include xs-block {
    max-width: 100%;
  }
}
</style>
