import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
<<<<<<< HEAD
    baseURL: 'http://391d092a29c9.ngrok.io'
=======

    baseURL: 'http://dd88592e75db.ngrok.io'

>>>>>>> eba4f972e9c8a8cb77ae13c04b55a99b94e4a986
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