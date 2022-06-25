import axios from "axios";

const request = axios.create({

    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 3000
})

request.interceptors.request.use(config => {

    return config
}, err => {
    return Promise.reject(err.message)
})

request.interceptors.response.use(res => {
    return res
}, err => {
    return Promise.reject(err.message)
})

export default request