import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class PostsService {
    async getAll(query) {
        const res = await api.get('/api/posts' + query)
        logger.log(res.data)
        AppState.posts = res.data.posts
        if (res.data.newer) { 
            let newer = res.data.newer.split('?')
            AppState.nextPage = newer[1]
        }
        if (res.data.older) {
            let  older = res.data.older.split('?')
            AppState.prevPage = older[1]
        }

    }
    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log(res.data)
        AppState.posts.unshift(res.data)
    }
    async likePost(id) {
        const index = AppState.posts.findIndex(p => p.id === id)
        const res = await api.post('api/posts/' + id + '/like')
        logger.log(res.data)
        AppState.posts.splice(index, 1, res.data)
    }
    async removePost(id) {
        await api.delete('api/posts/' + id)
        let filter = AppState.posts.filter(p => p.id !== id)
        AppState.posts = filter
    }
}
export const postsService = new PostsService()