import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getFavoriteByUser} from "@/app/redux/slices/FavoritesSlice";


const useGetFavorites = () => {
    const dispatch = useDispatch();
    const {favorites, isLoading} = useSelector((state) => state.favorites);

    useEffect(() => {
        dispatch(getFavoriteByUser());
    }, [dispatch]);

    return {favorites, isLoading};
};

export default useGetFavorites;
