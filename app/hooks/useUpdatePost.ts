import {useState} from "react";
import {useDispatch} from "react-redux";
import {updatePost} from "@/app/redux/slices/PostSlice";
import {Toast} from "@/app/CustomToast";


const useUpdatePost = (onClose, imageUri, postId) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        title: '',
        description: '',
        investmentGoal: '',
        currentInvestment: '',
        location : '',
        tags: '',
        category: '',
        status: 'Publié',
    });

    const handleChange = (key, value) => {
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [key]: value };
            return updatedForm;
        });
    };

    const handleSubmit = async () => {
        const file = imageUri && !imageUri.startsWith('http') ? {
            uri: imageUri,
            type: 'image/jpeg',
            name: imageUri.split('/').pop(),
        } : null;

        try {
            await dispatch(updatePost({ postId, postData: form, file })).unwrap();
            Toast.show({
                type: "success",
                text1: "Post Updated Successfully",
                text2: "Your Post has been successfully updated!",
            });
            setTimeout(() => {
                onClose();
            }, 300)
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Post Creation Failed",
                text2: "There was an issue creating your post. Please try again.",
            });
        }
    };

    return {
        form,
        handleChange,
        handleSubmit,
    };
};

export default useUpdatePost;
