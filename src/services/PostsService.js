import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class PostsService {
    async getAll(query) {
        const res = await api.get('/api/posts' + query)
        logger.log(res.data)
        AppState.posts = res.data.posts
        let newer = res.data.newer.split('?')
        AppState.nextPage = newer[1]
        let older = res.data.older.split('?')
        AppState.prevPage = older[1]
    }
    async likePost(id) {
        const index = AppState.posts.findIndex(p => p.id === id)
        const res = await api.post('api/posts/' + id + '/like')
        logger.log(res.data)
        AppState.posts.splice(index, 1, res.data)
    }
}
export const postsService = new PostsService()