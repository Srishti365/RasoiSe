import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
<<<<<<< HEAD
    baseURL: 'http://23210a0866f1.ngrok.io'
=======
    baseURL: 'http://6f95deec513a.ngrok.io'
>>>>>>> 87198196684b201a52a572375a98c0162487b724
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