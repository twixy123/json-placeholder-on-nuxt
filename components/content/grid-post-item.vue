<template>
  <nuxt-link
    :to="{
      name: 'id',
      params: {
        id: post.id
      }
    }"
    class="post"
  >
    <div class="post__row post__row--image">
      <img v-if="postImage" :src="postImage.url" :alt="postImage.title">
    </div>
    <div class="post__row post__row--content">
      <h3 class="post__title">
        {{ post.title }}
      </h3>
      <p class="post__description">
        {{ post.body }}
      </p>
    </div>
    <div class="post__row post__row--footer">
      <client-only>
        <nuxt-link
          :to="{
            name: 'id',
            params: {
              id: post.id
            },
            query: {
              comment: true
            }
          }"
          class="post__link"
        >
          <SvgIcon name="comment" class="post__action-svg" />
          <span class="post__action-count">
            {{ countOfComments }}
          </span>
        </nuxt-link>
        <nuxt-link
          :to="{
            name: 'id',
            params: {
              id: post.id
            },
            query: {
              edit: true
            }
          }"
          class="post__link"
        >
          <SvgIcon name="pencil-create" class="post__action-svg" />
        </nuxt-link>
      </client-only>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'PostItem',

  props: {
    post: {
      type: Object,
      default: null
    }
  },

  computed: {
    countOfComments () {
      return this.post.comments ? this.post.comments.length : 0
    },
    postImage () {
      return this.post.photos ? this.post.photos[0] : null
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  align-items: center;
  border: 1px solid $border-color;
  border-radius: 20px;
  color: $clr-main;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px;
  text-decoration: none;
  position: relative;
  width: 100%;

  &__row {
    &:not(:last-child) {
      margin-bottom: 20px;
    }

    &--image {
      background: $clr-light-grey;
      border-radius: 15px;
      height: 230px;
      overflow: hidden;
      width: 100%;

      img {
        height: 100%;
        object-fit: cover;
        width: 100%;
      }
    }

    &--content > * {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &--footer {
      width: 100%;
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin-top: auto;
    }
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.16;
    margin-bottom: 8px;
  }

  &__description {
    color: $clr-secondary;
    font-size: 17px;
    line-height: 1.29;
    margin-top: auto;
    -webkit-line-clamp: 3;
  }

  &__link {
    color: inherit;
    text-decoration: inherit;
    &:not(:last-child) {
      margin-right: 30px;
    }
  }

  &__action-count {
    color: $clr-secondary;
    margin-left: 10px;
  }

  @include xs-block {
    border: none;
    padding: 0;
    align-items: flex-start;
    min-height: 200px;

    &::after {
      display: block;
      content: '';
      width: 100%;
      height: 1px;
      background: $divide-color;
      margin: 25px 0;
    }

    .post__row{
      width: 49%;

      &--image {
        max-height: calc(200px - 32px);
        position: absolute;
        bottom: 50px;
        right: 0;
        margin-bottom: 0;
      }
    }
  }
}

</style>
