import {useDispatch} from "react-redux";
import {deleteProject} from "@/app/redux/slices/ProjectRealizedSlice";
import {Toast} from "@/app/CustomToast";


const useDeleteProjects = () => {
    const dispatch = useDispatch();
    const handleDelete = async (id: string) => {
        try {
            await dispatch(deleteProject(id)).unwrap();
            Toast.show({
                type: "success",
                text1: "Project Deleted Successfully",
                text2: "Your Project has been successfully deleted!",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Project Deleted Failed",
                text2: "There was an issue deleting your project. Please try again.",
            });
        }
    };

    return { handleDelete };
};

export default useDeleteProjects;
