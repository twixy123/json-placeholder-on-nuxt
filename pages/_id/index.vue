<template>
  <main>
    <div class="container">
      <div class="banner">
        <img v-if="image" :src="image.url" :alt="image.title">
      </div>
      <h1 class="title">
        {{ post.title }}
      </h1>
      <div class="divide" />
      <div class="description">
        <textarea-autosize
          ref="description"
          v-model.trim="description"
          :min-height="30"
          :disabled="disabled"
          class="form-field"
        />
        <div v-show="disabled" class="description__rewrite" @click="disabled = false">
          <SvgIcon name="pencil-create" />
          Редактировать текст
        </div>
        <div v-show="!disabled" class="description__btn-block">
          <button class="btn" variant="primary" @click="saveDescr">
            Сохранить изменения
          </button>
          <button class="btn" variant="secondary" @click="reset">
            Отменить
          </button>
        </div>
      </div>
      <div class="comments">
        <h2>
          Комментарии
        </h2>
        <ul>
          <li v-for="comment in comments" :key="comment.id" class="comment">
            <div class="comment__left-block">
              <div class="cover">
                <SvgIcon name="avatar" />
              </div>
            </div>
            <div class="comment__right-block">
              <div class="comment__user">
                <p>{{ comment.name }}</p>
                <span>{{ comment.email }}</span>
              </div>
              <div class="comment__content">
                <p>{{ comment.body }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PostPageItem',

  async asyncData ({ store, params, redirect }) {
    if (store.state.posts.some(post => post.id === params.id)) {
      return
    }
    try {
      await store.dispatch('getPost', params.id)
      await store.dispatch('getCommentsAndPhotos', params.id)
    } catch (error) {
      redirect('/')
    }
  },

  data () {
    return {
      disabled: true
    }
  },

  computed: {
    ...mapState({
      posts: 'posts'
    }),
    post () {
      return this.posts.find(post => post.id === +this.$route.params.id)
    },
    image () {
      return this.post?.photos?.[0] ? this.post.photos[0] : null
    },
    comments () {
      return this.post?.comments ? this.post.comments : null
    },
    description: {
      get () {
        return this.post.body
      },
      set (val) {
        return val
      }
    }
  },

  mounted () {
    if (this.$route.query.edit) {
      this.disabled = false
    }
  },

  methods: {
    ...mapActions({
      getCommentsAndPhotos: 'getCommentsAndPhotos',
      updatePost: 'updatePost'
    }),

    async saveDescr () {
      if (this.post.body !== this.$refs.description.val) {
        try {
          await this.updatePost({
            id: +this.$route.params.id,
            body: {
              body: this.$refs.description.val,
              title: this.post.title,
              id: this.post.id,
              userId: this.post.userId
            }
          })
        } catch (error) {
          console.log('Error', error)
        } finally {
          this.disabled = true
          this.$router.push(`/${this.$route.params.id}`)
        }
      }
    },

    reset () {
      this.$refs.description.val = this.post.body
      this.disabled = true
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 285px;
  background: $clr-lightest-grey;
  margin-bottom: 25px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.title {
  font-size: 34px;
  line-height: 1.35;
}

.divide {
  width: 100%;
  height: 1px;
  background: $clr-light-grey;
  margin: 30px 0;
}

.description {
  width: 100%;

  textarea {
    font-family: $font-family;
    height: fit-content;
    font-size: 18px;
    line-height: 1.6;
    padding: 20px;
    padding-bottom: 40px;
    width: 100%;
    background: none;
    border: 1px solid $clr-light-grey;
    border-radius: 8px;
    color: $clr-main;
    margin-bottom: 30px;

    &:disabled {
      padding: 0;
      cursor: default;
      border: none;
      color: $clr-secondary;
    }

    &:focus-visible {
      outline: none;
    }
  }

  &__rewrite {
    cursor: pointer;
    color: $clr-pink;
    font-size: 14px;

    span {
      margin-right: 22px;
    }
  }

  &__btn-block {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 30px;
    row-gap: 15px;
  }
}

.comments {
  margin-top: 30px;

  h2 {
    font-size: 24px;
    line-height: 1.3;
    font-weight: 500;
  }

  & ul {
    list-style: none;
    margin-top: 30px;
  }
}

.comment {
  align-items: flex-start;
  display: flex;
  font-size: 18px;
  padding: 8px 16px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &__left-block {
    margin-right: 12px;
  }

  &__user {
    line-height: 1.2;

    span {
      font-size: 12px;
      color: $clr-light-grey;
    }
  }

  &__content {
    margin-top: 10px;
    color: $clr-secondary;
    line-height: 1.22;
  }
}

</style>
