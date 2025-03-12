import { useDispatch } from 'react-redux';
import {addFavorite, getFavoriteByUser} from '@/app/redux/slices/FavoritesSlice';
import { Toast } from '@/app/CustomToast';

const useAddFavorite = () => {
    const dispatch = useDispatch();
    const handleAddFavorite = async (postId: string) => {
        try {
            await dispatch(addFavorite(postId)).unwrap();
            await dispatch(getFavoriteByUser()).unwrap();
            Toast.show({
                type: "success",
                text1: "Favorite Added Successfully",
                text2: "This post has been added to your favorites!",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Favorite Add Failed",
                text2: "This Post Already Favorite",
            });
        }
    };

    return { handleAddFavorite };
};

export default useAddFavorite;
