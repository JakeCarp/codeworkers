import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class PostsService {
    async getAll(query) {
        const res = await api.get('/api/posts' + query)
        logger.log(res.data)
        AppState.posts = res.data.posts
        AppState.nextPage = res.data.newer
        AppState.prevPage = res.data.older
    }
    async likePost(id) {
        const index = AppState.posts.findIndex(p => p.id === id)
        const res = await api.post('api/posts/' + id + '/like')
        logger.log(res.data)
        AppState.posts.splice(index, 1, res.data)
    }
}
export const postsService = new PostsService()