import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
<<<<<<< HEAD
    baseURL: 'http://c48b01667651.ngrok.io'
=======

    baseURL: 'http://aec6118bbae7.ngrok.io'

>>>>>>> 2f3ccfbb43402ba3c3fa030c937d1404f4a4239e
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
)


export default instance;