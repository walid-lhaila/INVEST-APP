import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTagsAndCategories } from '@/app/redux/slices/TagsAndCategoriesSlice';
import debounce from 'lodash.debounce';

const useTagsAndCategories = (description) => {
    const dispatch = useDispatch();
    const { tags, categories, loading } = useSelector((state) => state.tagsAndCategories);

    useEffect(() => {
        if (description) {
            debounce(() => {
                dispatch(getTagsAndCategories(description));
            }, 1000)();
        }
    }, [description, dispatch]);

    return {
        tags,
        categories,
        loading,
    };
};

export default useTagsAndCategories;
