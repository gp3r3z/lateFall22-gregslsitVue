import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
class HousesService {
    async getHouses() {
        const res = await api.get('api/houses')
        logger.log(res.data)
        AppState.houses = res.data
    }
    async getHouseById(id) {
        const res = await api.get('api/houses/' + id)
        logger.log('[gethouses]', res.data)
        AppState.activeHouse = res.data
    }
    async createHouse(houseData) {
        const res = await api.post('api/houses', houseData)
        logger.log(res.data)

        AppState.houses.push(res.data)
    }
    async removeHouse(id) {
        const res = await api.delete('api/houses/' + id)
        logger.log('[removeHouse]', res.data)
        let index = AppState.houses.findIndex(c => c.id == id)
        if (index >= 0) {
            AppState.houses.splice(index, 1)
        }
    }
    async editHouse(houseData) {
        logger.log(houseData)
        const res = await api.put('api/houses/' + houseData.id, houseData)
        logger.log('[editHouse]', res.data)
    }

}

export const housesService = new HousesService()