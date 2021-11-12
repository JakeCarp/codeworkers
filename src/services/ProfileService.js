import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfileService {

    async getAllProfiles(query) {
        const res = await api.get('api/profiles/' + query)
        logger.log(res.data)
        AppState.profileList = res.data
    }

    async getProfilebyId(id) {
        const res = await api.get('api/profiles/' + id)
        logger.log(res.data)
        AppState.profile = res.data
    }
    
    async getPostsByProfile(id) {
        const res = await api.get('api/profiles/' + id + '/posts')
        logger.log(res.data)
        AppState.posts =res.data
    }
}
export const profileService = new ProfileService()