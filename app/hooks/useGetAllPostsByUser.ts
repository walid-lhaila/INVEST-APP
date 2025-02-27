import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllPostsByUser} from "@/app/redux/slices/PostSlice";


const useGetAllPostsByUser = () => {
    const dispatch = useDispatch();
    const {userPosts, isLoading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getAllPostsByUser());
    }, [dispatch]);

    return {userPosts, isLoading, error};
};

export default useGetAllPostsByUser;
