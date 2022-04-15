<template>
  <div class="container">
    <div class="grid-wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppGridWrapper',
  props: {
    cols: {
      type: [
        String,
        Number
      ],
      default: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-wrapper {
  column-gap: $col-gap;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: $row-gap;
  width: 100%;

  @include md-block {
    grid-template-columns: repeat(2, 1fr);
  }

  @include sm-block {
    column-gap: $col-gap-sm;
  }

  @include xs-block {
    grid-template-columns: 1fr;
    column-gap: $col-gap-xs;
    row-gap: 0;
  }

  @include xxs-block {
    column-gap: $col-gap-xxs;
  }
}
</style>
