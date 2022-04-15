/* eslint-disable */

export const state = () => ({
  posts: [],
  searchedPosts: [],
  getAllDataHasAllreadyFetched: false
})

export const actions = {
  async getCommentsAndPhotos ({commit}, id) {
    try {
      const urls = ['photos', 'comments']

      const data = await Promise.all(urls.map((url) => {
        return new Promise(async (res, rej) => {
          try {
            const dynamicUrl = id ? `/${url}?postId=${id}` : `/${url}`
            const fetchData = await this.$axios(dynamicUrl)
            res({[url]: fetchData})
          } catch (error) {
            rej(error)
          }
        })
      }))
      commit('SET_COMMENTS_AND_PHOTOS', {
        posts: data,
        getAllDataHasAllreadyFetched: id
      })
    } catch (error) {
      console.log('Error', error);
    }
  },
  async getPosts ({commit}) {
    try {
      const data = await this.$axios('/posts')
      commit('PUSH_POSTS', data)
      return data
    } catch (error) {
      console.log('Error', error);
    }
  },
  async getPost ({commit}, id) {
    try {
      const url = `/posts?id=${id}`
      const data = await this.$axios(url)
      commit('PUSH_POSTS', data)
      return data
    } catch (error) {
      console.log('Error', error);
    }
  },
  async updatePost ({commit}, {id, body}) {
    try {
      const url = `/posts/${id}`
      const data = await this.$axios.put(url, body)

      commit('UPDATE_POST', data)
      return data
    } catch (error) {
      console.log('Error', error);
    }
  },
  async searchPosts ({commit}, search) {
    if (search === '') {
      commit('SET_SEARCHING_POSTS', [])
      return
    }
    try {
      const url = `/posts?q=${search}`
      const data = await this.$axios.get(url)

      commit('SET_SEARCHING_POSTS', data)
      return data
    } catch (error) {
      console.log('Error', error);
    }
  }
}

export const mutations = {
  SET_COMMENTS_AND_PHOTOS (state, {posts, getAllDataHasAllreadyFetched}) {
    posts.forEach(element => {
      const keyName = Object.keys(element)[0]
      setAdditionalData(keyName, element[keyName], state.posts, this._vm)
    });
    state.getAllDataHasAllreadyFetched = !getAllDataHasAllreadyFetched
  },
  PUSH_POSTS (state, posts) {
    posts.forEach(post => {
      if(!state.posts.some(_post => _post.id === post.id)) {
        state.posts.push(post)
      }
    })
    state.posts = state.posts.sort((a, b) => a.id - b.id)
  },
  UPDATE_POST (state, post) {
    const findedPost = state.posts.find(_post => post.id === _post.id)
    if (findedPost) {
      this._vm.$set(findedPost, 'body', post.body)
    }
  },
  SET_SEARCHING_POSTS (state, posts) {
    state.searchedPosts = posts
  }
}

function setAdditionalData (keyName, dataArray, posts, vue) {
  dataArray.forEach(data => {
    const post = posts.find(_post => _post.id === data.postId)
    if (post) {
      if (!post[keyName]) vue.$set(post, keyName, [])
      post[keyName].push(data)
    }
  })
}
