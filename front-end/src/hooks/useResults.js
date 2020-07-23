import { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import trackerApi from '../api/tracker';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

export default () => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [address,setAddress] = useState('Piprali Road, Sikar, Rajasthan');
    const [id,setId] = useState(0)
    const [location, setLocation] = useState(

        {
            "coords": {
                "accuracy": 1799.9990234375,
                "altitude": 0,
                "heading": 0,
                "latitude": 27.6199571,
                "longitude": -112.1605576,
                "speed": 0
            },
            "mocked": false,
            "timestamp": 1586340319005,
        }
       
    );

    const startWatching = async() => {
        try{
            await requestPermissionsAsync();
            await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval:1,
                distanceInterval:10
            }, (pos)=> {
                console.log('position',pos)
                setLocation(pos);
                setId(1)
            })
        } catch (e) {
            setErrorMessage(e);
        }
    }


    const searchApi = async (searchTerm, add, loc ) => {
        try {
            console.log('search result',searchTerm,add,loc);
            setErrorMessage(null)
            setResults([])
            console.log('searchTerm',searchTerm)
            const response = await trackerApi.post(`/home/search`,{ query:searchTerm,lat:location.coords.latitude, long:location.coords.longitude , location:loc, address:add });
            // console.log(response.data.chefs);
            console.log('response',response.data);
            setResults(response.data.chefs);
            setAddress(response.data.location);
            await AsyncStorage.setItem('address',response.data.location)
        }
        catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong');
        }
    };


    //bad code
    //searchApi('pasta);

    useEffect(() => {
        startWatching();
        searchApi('',address,"current");
    }, [id]);

    return [searchApi, results, errorMessage, location, address];
};