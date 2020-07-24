import axios from 'axios';
import { AsyncStorage } from 'react-native';

// Tunnel for connecting to backend through expo

const instance = axios.create({

    baseURL: 'http://1cea31089663.ngrok.io'

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