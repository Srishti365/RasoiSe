import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({

<<<<<<< HEAD
    baseURL: 'http://6fdff88f28f6.ngrok.io'
=======
    baseURL: 'http://3add3c126f6b.ngrok.io'
>>>>>>> e0c7197035f79030a4450edc5213239a46523af6

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