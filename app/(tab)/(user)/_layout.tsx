import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import useUser from "@/app/hooks/useUser";
import { Text } from "react-native";

export default function UserLayout() {
    const router = useRouter();
    const { user, loading } = useUser();

    useEffect(() => {
        if (!loading) {
            if (user.role === "Entrepreneur") {
                router.replace("/(user)/projects");
            } else {
                router.replace("/(user)/favorites");
            }
        }
    }, [user, loading]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}
