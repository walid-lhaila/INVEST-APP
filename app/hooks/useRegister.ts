import {useDispatch} from "react-redux";
import {useState} from "react";
import {register} from "@/app/redux/slices/AuthSlice";


const useRegister = (role: 'Entrepreneur' | 'Investor') => {
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

    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({...prev, [key]: value }));
    };

    const handleRegister = () => {
        dispatch(register(formData));
    };

    return {handleChange, handleRegister, formData};
};

export default useRegister;
