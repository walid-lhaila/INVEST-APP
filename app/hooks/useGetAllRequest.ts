import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllRequest} from "@/app/redux/slices/RequestSlice";


const useGetAllRequest = () => {
    const dispatch = useDispatch();
    const {requests, isLoading, error} =  useSelector((state) => state.request);

    useEffect(() => {
        dispatch(getAllRequest());
    }, [dispatch]);

    return {requests, isLoading, error};
};

export default useGetAllRequest;
