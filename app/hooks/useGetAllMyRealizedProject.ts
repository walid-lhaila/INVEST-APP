import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllProjectsByUser} from "@/app/redux/slices/ProjectRealizedSlice";


const useGetAllMyRealizedProject = () => {
    const dispatch = useDispatch();
    const { projects, isLoading, error } = useSelector((state) => state.project);

    useEffect(() => {
        dispatch(getAllProjectsByUser());
    }, [dispatch]);

    return { projects, isLoading, error };
};
export default useGetAllMyRealizedProject;
