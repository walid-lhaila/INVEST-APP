import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPosts } from '@/app/redux/slices/PostSlice';
import {Toast} from "@/app/CustomToast";

const useCreatePosts = (onClose, imageUri) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: '',
        investmentGoal: '',
        currentInvestment: '',
        location: '',
        tags: '',
        status: 'Publié',
    });

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const handleSubmit = async () => {
        if (!imageUri) {
            Toast.show({
                type: "error",
                text1: "Image Missing",
                text2: "Please Select an image before submitting!",
            });
            return;
        }

        const file = {
            uri: imageUri,
            type: 'image/jpeg',
            name: imageUri.split('/').pop(),
        };

        try {
            await dispatch(createPosts({ postData: form, file })).unwrap();
            Toast.show({
                type: "success",
                text1: "Post Created Successfully",
                text2: "Your Post has been successfully created!",
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

export default useCreatePosts;
