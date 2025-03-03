import {useDispatch} from "react-redux";
import {rejectRequest} from "@/app/redux/slices/RequestSlice";
import {Toast} from "@/app/CustomToast";


const useHandleRejectRequest = () => {
    const dispatch = useDispatch();

    const handleReject = async(requestId: string) => {
        try {
            await dispatch(rejectRequest(requestId)).unwrap();
            Toast.show({
                type: "success",
                text1: "Request Rejected",
                text2: "Your request was rejected successfully!",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Action Failed",
                text2: "Failed to reject request!",
            });
        }
    };
    return {handleReject};
};

export default useHandleRejectRequest;
