import {useRouter} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Toast} from "@/app/CustomToast";
import {login} from "@/app/redux/slices/AuthSlice";


const useLogin = () => {
    const Router = useRouter();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { isLoading } = useSelector((state) => state.auth);

    const handleLogin = async () => {
        if(!username || ! password) {
            Toast.show({
                type: "error",
                text1: "Missing Fields",
                text2: "All fields are required!",
            });
            return;
        }
        try {
            await dispatch(login({ username, password })).unwrap();
            Toast.show({
                type: "success",
                text1: "Login Successful",
                text2: "You have logged in successfully!",
            });

            setTimeout(() => {
                Router.push("/(tab)");
            }, 600);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Login Failed",
                text2: "Invalid Credentials",
            });
        }
    }

    return {handleLogin, setUsername, setPassword, isLoading}
};

export default useLogin;
