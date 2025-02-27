import {useDispatch} from "react-redux";
import {deletePost} from "@/app/redux/slices/PostSlice";
import {Toast} from "@/app/CustomToast";


const useDeletePosts = () => {
    const dispatch = useDispatch();
    const handleDelete = async (id: string) => {
        try {
            await dispatch(deletePost(id)).unwrap();
            Toast.show({
                type: "success",
                text1: "Post Deleted Successfully",
                text2: "Your Post has been successfully deleted!",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Post Deleted Failed",
                text2: "There was an issue deleting your post. Please try again.",
            });
        }
    };

    return {handleDelete};
};

export default useDeletePosts;
