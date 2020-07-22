import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({

<<<<<<< HEAD
    baseURL: 'http://391d092a29c9.ngrok.io'
=======
    baseURL: 'http://edb75c3ea0f4.ngrok.io'
>>>>>>> a925b036bdfdcba4b406a54ca8f142b7346181dc

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