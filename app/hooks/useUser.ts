import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const useUser = () => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if(storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Failed to load user data:", error);
            } finally {
                setLoading(false)
            }
        };
        fetchUser()
    }, []);

    return {user, loading};
};

export default useUser;
