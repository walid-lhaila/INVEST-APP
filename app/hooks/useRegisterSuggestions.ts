import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { fetchSuggestions } from '@/app/redux/slices/SuggestionsSlice';

export const useRegisterSuggestions = (setFormData) => {
    const dispatch = useDispatch();
    const suggestions = useSelector((state) => state.suggestions);

    const debouncedSearch = useCallback(
        debounce((text) => {
            dispatch(fetchSuggestions(text));
        }, 1000),
        [dispatch]
    );

    useEffect(() => {
        if (suggestions.interests.length > 0 || suggestions.services.length > 0) {
            setFormData((prev) => ({
                ...prev,
                fieldOfInterest: suggestions.interests.join(', '),
                services: suggestions.services,
            }));
        }
    }, [suggestions.interests, suggestions.services, setFormData]);

    return debouncedSearch;
};
