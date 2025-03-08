import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {register} from "@/app/redux/slices/AuthSlice";
import Toast from "react-native-toast-message";
import {useRouter} from "expo-router";


const useRegister = (role: 'Entrepreneur' | 'Investor') => {
    const Router = useRouter();
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        fieldOfInterest: '',
        companyName: '',
        companyDescription: '',
        services: '',
        role: role
    })

    const handleChange = useCallback((key: string, value: string) => {
        setFormData((prev) => ({...prev, [key]: value }));
    }, []);


    const handleRegister = () => {
        const { firstName, lastName, username, phone, email, password } = formData;
        if (!firstName || !lastName || !username || !phone || !email || !password) {
            Toast.show({
                type: "error",
                text1: "Missing Fields",
                text2: "All fields are required!",
            });
            return;
        }
        dispatch(register(formData));
        Toast.show({
            type: "success",
            text1: "Registration Successful",
            text2: "You have successfully registered!",
        });

        setTimeout(() => {
            Router.push('/login');
        }, 2000)
    };

    return {handleChange, handleRegister, formData, setFormData};
};

export default useRegister;
