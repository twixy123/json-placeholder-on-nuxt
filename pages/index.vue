<template>
  <main>
    <GridWrapper>
      <GridItem v-for="post in postsForRender[activePage]" :key="post.id">
        <PostItem :post="post" />
      </GridItem>
    </GridWrapper>
    <client-only>
      <div class="container">
        <div class="pagination">
          <vs-pagination
            class="pagination__nav"
            :total-pages="pagesCount"
            @change="changePage"
          />
        </div>
      </div>
    </client-only>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import _ from 'lodash'

import GridWrapper from '@/components/grid/grid-wrapper'
import GridItem from '@/components/grid/grid-item'
import PostItem from '@/components/content/grid-post-item'

export default {
  name: 'IndexPage',

  components: {
    GridWrapper,
    GridItem,
    PostItem
  },

  async asyncData ({ store }) {
    if (store.state.getAllDataHasAllreadyFetched) {
      return
    }
    await store.dispatch('getPosts')
  },

  data () {
    return {
      countItemsInPage: 9
    }
  },

  computed: {
    ...mapState({
      posts: 'posts',
      searchedPosts: 'searchedPosts',
      getAllDataHasAllreadyFetched: 'getAllDataHasAllreadyFetched'
    }),

    postsForRender () {
      const posts = this.searchedPosts.length ? this.searchedPosts : this.posts
      return _.chunk(posts, this.countItemsInPage)
    },

    activePage () {
      return this.$route.query.page || 1
    },

    pagesCount () {
      /* let pages = 1
      if (this.posts.length > this.countItemsInPage) {
        pages = Math.ceil(this.posts.length / this.countItemsInPage)
      } */
      return this.postsForRender.length - 1
    }
  },

  async mounted () {
    if (!this.getAllDataHasAllreadyFetched) {
      await this.getCommentsAndPhotos()
    }
  },

  methods: {
    ...mapActions({
      getCommentsAndPhotos: 'getCommentsAndPhotos'
    }),
    changePage (val) {
      this.$router.push(`/?page=${val}`)
    }
  }
}
</script>

<style lang="scss">
.pagination {
  margin-top: 40px;

  &__nav {
    & > ul {
      justify-content: flex-end;
    }

    & > ul > li:first-child a,
    & > ul > li:last-child a {
      color: $border-color;
    }

    & > ul > li > a {
      border: 1px solid $border-color;
      background: none;
      color: $clr-main;
    }

    & > ul > li.vs-pagination--active > a {
      border: 1px solid $clr-pink;
      background: none;
      color: $clr-pink;
    }

    & .vs-pagination > li > a:hover {
      background: rgba($clr-pink, 0.05);
    }
  }
}
</style>
