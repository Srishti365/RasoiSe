import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_err':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'chefSignin':
            return { errorMessage: '', token: action.payload };
        case 'signup':
            return { errorMessage: '' };
        case 'chefSignup':
            return { errorMessage: '' };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'signout':
            return { token: null, errorMessage: '' };
        default:
            return state;
    }
};


const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    const method = await AsyncStorage.getItem('method')
    if (token) {
        console.log(token);
        if(method == 'User') {
            dispatch({ type: 'signin', payload: token });
            navigate('mainflow');
        } else {
            dispatch({ type: 'chefSignin', payload: token });
            navigate('chefflow');
        }
    } else {
        navigate('loginFlow');
    }

};


const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => {
    return async ({ email, password, confirmPassword }) => {
        // make api request to sign up with that email and password
        try {
            const response = await trackerApi.post('/signup', { email, password, confirmPassword });
            // await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signup' });

            navigate('Verify', { email })
        } catch (err) {
            console.log(err);
            dispatch({ type: 'add_err', payload: err.response.data.error });
        }

    };
};


const chefSignup = (dispatch) => {
    return async ({ name, location, email, password, phone }) => {
        // make api request to sign up with that email and password
        try {
            const response = await trackerApi.post('/chef/signup', { name, location, email, password , phone});
            // await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'chefSignup' });

            navigate('ChefSignin')
        } catch (err) {
            console.log('error',err);
            dispatch({ type: 'add_err', payload: err.response.data.error });
        }

    };
};



const signin = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('method', 'User');

            dispatch({ type: 'signin', payload: response.data.token });
            navigate('mainflow', { email })
        } catch (err) {
            console.log(err.response.data);
            if (err.response.data.verify) {
                navigate('Verify', { email })
            } else {
                dispatch({
                    type: 'add_err',
                    payload: err.response.data.error
                });
            }
        }
    };

};


const chefSignin = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/chef/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('method', 'Chef');

            dispatch({ type: 'chefSignin', payload: response.data.token });
            navigate('chefflow', { email })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: 'add_err',
                payload: err.response.data.error
            });
        }
    };

};


const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('method');
        dispatch({ type: 'signout' });
        navigate('loginFlow');
    };
};



export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin, chefSignup, chefSignin },
    { token: null, errorMessage: '' }
);
