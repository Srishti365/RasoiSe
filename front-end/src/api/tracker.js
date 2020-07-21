import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
<<<<<<< HEAD
    baseURL: 'http://c48b01667651.ngrok.io'
=======
    baseURL: 'http://ecc24ee77f7f.ngrok.io'
>>>>>>> 723027f53710f275b05c7ba5b449d452eea61933
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