import axios from 'axios';
import { AsyncStorage } from 'react-native';

// Ngrok tunnel for connecting to backend through expo

const instance = axios.create({
    baseURL: 'http://d4730c47dccd.ngrok.io'
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