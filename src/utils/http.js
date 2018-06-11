import Vue from 'vue'
import axios from 'axios'

let instance = axios.create({
    timeout: 3000
})
//请求拦截
instance.interceptors.request.use((config) => {
    //console.log(config)

    if (process.env.NODE_ENV == 'production') {
        config.baseURL = 'https://eip.btte.net'
    } else {
        config.baseURL = 'http://localhost:8080'
    }
    return config
}, (err) => {
    return Promise.reject(err)
})
//响应拦截
instance.interceptors.response.use((response) => {
    //console.log(response)
    if (response.status == 200) {
        return response.data
    } else {
        return Promise.reject(response)
    }

}, (err) => {
    return Promise.reject(err)
})
//vue插件
let httpPlugin = {
    install(Vue) {
        //防止$http在将来覆盖
        Object.defineProperty(Vue.prototype, '$http', {
            value: instance
        })
    }
}
export { instance }
export default httpPlugin
