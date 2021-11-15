import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PromotionsService {
    async getPromotions() {
        const res = await api.get('api/ads')
        logger.log(res.data)
        AppState.promotions = res.data
 }
}

export const promotionsService = new PromotionsService()