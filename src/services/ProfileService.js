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
    async updateProfile(profileData) {
        const res = await api.put('account', profileData)
        logger.log(res.data)
        AppState.profile = res.data
    }
    
}
export const profileService = new ProfileService()