import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/app/redux/slices/PostSlice";

const useGetAllPosts = () => {
    const dispatch = useDispatch();
    const { posts, isLoading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    return { posts, isLoading, error };
};

export default useGetAllPosts;
