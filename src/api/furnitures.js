import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /furnitures/:homeId
export const createFurniture = (homeId, newFurniture) => {
    return axios({
        url: `${apiUrl}/furnitures/${homeId}`,
        method: 'POST',
        data: { furniture: newFurniture }
    })
}

// UPDATE
// /furnitures/:homeId/:furnitureId
export const updateFurniture = (user, homeId, updatedFurniture) => {
    return axios({
        url: `${apiUrl}/furnitures/${homeId}/${updatedFurniture.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { furniture: updatedFurniture }
    })
}
// DELETE
// /furnitures/:homeId/:furnitureId
export const deleteFurniture = (user, homeId, furnitureId) => {
    return axios({
        url: `${apiUrl}/furnitures/${homeId}/${furnitureId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}