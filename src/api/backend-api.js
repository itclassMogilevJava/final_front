import axios from 'axios'
import LocalStorageService from '../service/LocalStorageService'
import router from '../router'

const localStorageService = LocalStorageService.getService();

const AXIOS = axios.create({
    baseURL: `http://localhost:8080/`,
    timeout: 1000
});


export default {
    hello() {
        return AXIOS.get(`/goods`);
    },
    createOrder(goods) {
        return AXIOS.post('/goods/order', goods)
    },
    login(loginRequest) {
        return AXIOS.post('/authenticate', loginRequest)
    },
    register(registerRequest) {
        return AXIOS.post('/register', registerRequest)
    }
}

AXIOS.interceptors.request.use(config => {
    const token = localStorageService.getAccessToken();
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    console.log(config);
    return config;
})

AXIOS.interceptors.response.use(response => {
    return response
},
    error => {
        if (error.response.status === 401 && error.config.url !== "/authenticate") {
            router.push("/login");
        }
        if (error.response.status === 403) {
            return new Promise((resolve, reject) => {
                let resp = {
                    success: false,
                    message: "У вас нет доступа к ресурсу"
                }
                reject(resp);
            })
        }
    })
