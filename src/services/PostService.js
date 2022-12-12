import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"





class PostService {





  async getPosts() {
    const res = await api.get("api/posts")
    logger.log(res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }


  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    AppState.posts.unshift(res.data)
  }


  async deletePost(id) {
    const res = await api.delete('api/posts/' + id)
    AppState.posts.splice(AppState.posts.findIndex(c => c.id == id), 1)
  }


  async changePage(url) {
    const res = await api.get(url)
    logger.log(res.data.older)
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
    AppState.posts = res.data.posts.map(p => new Post(p))
  }
  async changePageProfile(creatorId) {
    const res = await api.get(`/api/profiles/${creatorId}/posts`)
    logger.log(res.data.older)
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async createLikes(id) {
    const res = await api.post(`/api/posts/${id}/like`)
    // logger.log(res.data)
    AppState.posts.splice(AppState.posts.findIndex(l => l.id == id), 1, res.data)
    // AppState.posts.unshift(res.data)
  }


  async getPostsByCreatorId(creatorId) {
    const res = await api.get(`api/profiles/${creatorId}/posts`)
    // logger.log(res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }

}



export const postService = new PostService()