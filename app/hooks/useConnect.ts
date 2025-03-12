import { useDispatch } from "react-redux";
import {getAllRequest, sendRequest} from "@/app/redux/slices/RequestSlice";
import { Toast } from "@/app/CustomToast";

const useConnect = (onClose: () => void) => {
    const dispatch = useDispatch();

    const handleConnect = (entrepreneur: string) => {
        if (!entrepreneur) {
            Toast.show({
                type: "error",
                text1: "Failed to Send Request",
                text2: "All fields are required!",
            });
            return;
        }
        dispatch(sendRequest({ receiver: entrepreneur })).unwrap()
        dispatch(getAllRequest())
        Toast.show({
            type: "success",
            text1: "Request Sent Successfully",
            text2: "Your request was sent successfully!",
        });
        setTimeout(() => {
            onClose();
        }, 600);
    };

    return { handleConnect };
};

export default useConnect;
