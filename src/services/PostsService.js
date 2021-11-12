import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
    async getAll(query) {
        const res = await api.get('/api/posts' + query)
        logger.log(res.data)
        AppState.posts = res.data
    }
    async likePost(id) {
        const res = await api.post('api/posts/' + id + '/like')
        logger.log(res.data)
    }
}
export const postsService = new PostsService()