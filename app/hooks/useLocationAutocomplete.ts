import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCities, fetchCities } from '@/app/redux/slices/CitiesSlice';

const useLocationAutocomplete = () => {
    const dispatch = useDispatch();
    const { cities } = useSelector((state) => state.cities);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (query.length > 2) {
            dispatch(fetchCities(query));
        } else {
            dispatch(clearCities());
        }
    }, [query, dispatch]);

    return {
        query,
        setQuery,
        cities,
    };
};

export default useLocationAutocomplete;
