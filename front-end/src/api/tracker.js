import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
<<<<<<< HEAD
    baseURL: 'http://12f23e47e2f7.ngrok.io'
=======
    baseURL: 'http://a1d9c59f4ebe.ngrok.io'
>>>>>>> 67d8fb58e0444b0d92f24ebb245782c7e6535c90
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