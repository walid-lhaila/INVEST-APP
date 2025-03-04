import {useDispatch} from "react-redux";
import {removeFavorite} from "@/app/redux/slices/FavoritesSlice";
import {Toast} from "@/app/CustomToast";


const useRemoveFavorites = () => {
    const dispatch = useDispatch();
    const handleDelete = async (id: string) => {
        try {
            await dispatch(removeFavorite(id)).unwrap();
            Toast.show({
                type: "success",
                text1: "Favorite Deleted Successfully",
                text2: "Your Favorite has been successfully deleted!",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Favorite Deleted Failed",
                text2: "There was an issue deleting your Favorite. Please try again.",
            });
        }
    };

    return {handleDelete};
};
export default useRemoveFavorites;
