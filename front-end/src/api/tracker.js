import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
<<<<<<< HEAD
    baseURL: 'http://4383b93f3b86.ngrok.io'
=======
    baseURL: 'http://12f23e47e2f7.ngrok.io'
>>>>>>> a119cc10f47457cf9258e56461248a2cbe2ef59c
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