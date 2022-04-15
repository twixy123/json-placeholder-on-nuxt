<template>
  <div class="block">
    <div class="search">
      <SvgIcon
        class="svg-icon"
        name="search"
      />
      <input
        v-model="search"
        type="text"
        placeholder="Поиск"
      >
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'

export default {
  name: 'AppSearch',
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search (val) {
      this.throttleEmitValue(val)
    }
  },

  methods: {
    ...mapActions({
      searchPosts: 'searchPosts'
    }),
    throttleEmitValue: _.debounce(function (value) {
      this.emitValue(value)
    }, 500),

    emitValue (val) {
      this.searchPosts(val)
      this.$router.push('/?page=1')
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  color: $clr-secondary;
  position: relative;

  input {
    background: $bg-light-gray;
    border: none;
    border-radius: 10px;
    color: $clr-main;
    font-size: 17px;
    line-height: 1.29;
    outline: none;
    padding: 14px 16px 14px 36px;

    &::placeholder {
      color: $clr-secondary;
    }

    @include xs-block {
      padding-top: 7px;
      padding-bottom: 7px;
      width: 100%;
    }
  }

  .svg-icon {
    left: 8px;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
  }
}
</style>
