import axios from 'axios'

const BASE_URI = 'http://localhost:3000'

const createMovieService = (data) => axios.post(`${BASE_URI}/api/v1/createMovie`, data)

const loginUserService = (data) => axios.post(`${BASE_URI}/login`, data)

const getSingleUserService = (id) => axios.get(`${BASE_URI}/users/${id}`)

export {
    createMovieService,
  loginUserService,
  getSingleUserService
}