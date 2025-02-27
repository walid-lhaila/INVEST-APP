import {useDispatch} from "react-redux";
import {useState} from "react";
import Toast from "react-native-toast-message";
import {createProject} from "@/app/redux/slices/ProjectRealizedSlice";


const useCreateRealizedProject = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        budget: '',
        startDate: new Date(),
        endDate: new Date(),
    })

    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({...prev, [key]: key.includes('Date') ? new Date(value) : value}));
    };

    const handleCreateProject = (toggleModal: () => void) => {
        const {title, description, tags, budget, startDate, endDate} = formData;
        if(!title || !description || !tags || !budget || !startDate || !endDate) {
            Toast.show({
                type: "error",
                text1: "Missing Fields",
                text2: "All fields are required!",
            });
            return;
        }
        dispatch(
            createProject({
                title,
                description,
                tags,
                budget: Number(budget),
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
            })
        ).unwrap()
        Toast.show({
            type: "success",
            text1: "Project Created Successful",
            text2: "Your Project has been successfully created!",
        });
        toggleModal();
    }

    return {handleChange, handleCreateProject, formData}
};

export default useCreateRealizedProject;
