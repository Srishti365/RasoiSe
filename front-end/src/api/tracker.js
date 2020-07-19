import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
<<<<<<< HEAD
    baseURL: 'http://9ce492687051.ngrok.io'
=======
    baseURL: 'http://464de06dcb25.ngrok.io'
>>>>>>> cdfea3c5977fa58643473e2ac3effc0a4d6e5bac
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