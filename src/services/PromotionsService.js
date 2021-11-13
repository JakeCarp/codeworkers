import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PromotionsService {
    async getPromotions() {
        const res = await api.get('api/ads')
        logger.log(res.data[0])
        AppState.promotions = res.data[0]
 }
}

export const promotionsService = new PromotionsService()