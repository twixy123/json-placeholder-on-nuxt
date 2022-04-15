<template>
  <span :class="className" v-html="iconPath" />
</template>

<script>
export default {
  name: 'SvgIcon',

  props: {
    name: {
      type: String,
      required: true
    }
  },

  computed: {
    iconPath () {
      let icon = require(`~/assets/icons/${this.name}.svg?raw`)

      if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
        icon = icon.default
      }

      return icon
    },

    className () {
      return 'svg-icon svg-icon--' + this.name
    }
  }
}
</script>
