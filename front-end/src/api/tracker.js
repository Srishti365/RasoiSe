import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
<<<<<<< HEAD

    baseURL: 'http://391d092a29c9.ngrok.io'

=======
    baseURL: 'http://aec6118bbae7.ngrok.io'
>>>>>>> 446efbf44aa6044b18bf1994cc9778b03f4d25a3
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