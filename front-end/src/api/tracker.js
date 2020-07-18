import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
<<<<<<< HEAD
    baseURL: 'http://92871fd69faa.ngrok.io'
=======
    baseURL: 'http://12f23e47e2f7.ngrok.io'
>>>>>>> 4a649feca03ebce0a23766263f5021592c95d871
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