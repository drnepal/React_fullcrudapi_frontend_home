// this is where our api calls for the homes resource will live
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllHomes = () => {
    return axios(`${apiUrl}/homes`)
}

// READ -> Show
export const getOneHome = (id) => {
    return axios(`${apiUrl}/homes/${id}`)
}

// Create (create a home)
export const createHome = (user, newHome) => {
    console.log('this is the user', user)
    console.log('this is the newHome', newHome)
    return axios({
        url: `${apiUrl}/homes`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { home: newHome }
    })
}

// Update (update a home)
export const updateHome = (user, updatedHome) => {
    return axios({
        url: `${apiUrl}/homes/${updatedHome.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { home: updatedHome }
    })
}

// Delete (delete a home)
export const removeHome = (user, homeId) => {
    return axios({
        url: `${apiUrl}/homes/${homeId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}