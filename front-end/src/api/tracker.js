import axios from 'axios';
import { AsyncStorage } from 'react-native';

// Tunnel for connecting to backend through expo

const instance = axios.create({

<<<<<<< HEAD
    baseURL: 'http://6e3b2af984e5.ngrok.io'
=======
    baseURL: 'http://d4730c47dccd.ngrok.io'
>>>>>>> 9628e4c939fca1b1f13e9495591f68ebbae94f62

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