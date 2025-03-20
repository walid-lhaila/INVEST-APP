import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";

const UseLogout= () => {
    const router = useRouter();
        const handleLogout = async () => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            router.push('/login');
        }
    return { handleLogout }
}

export default UseLogout;
