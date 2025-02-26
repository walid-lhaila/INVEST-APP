import {useDispatch, useSelector} from "react-redux";
import {fetchUserByUsername} from "@/app/redux/slices/UserSlice";


const useGetUserByUsername = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state) => state.user)

    const getUserByUsername = (username: string) => {
        dispatch(fetchUserByUsername(username));
    };

    return { user, isLoading, error, getUserByUsername };

};

export default useGetUserByUsername;
