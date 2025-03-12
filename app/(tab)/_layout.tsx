import {Tabs} from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeSocket } from "@/app/services/socket";
import useUser from "@/app/hooks/useUser";
import { Text } from "react-native";

export default function TabLayout() {

    useEffect(() => {
        const initSocket = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                    initializeSocket(token);
                } else {
                    console.warn("Aucun token trouvé, la connexion WebSocket ne sera pas établie.");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du token :", error);
            }
        };
        initSocket();
    }, []);



    const { user, loading } = useUser();
    if (loading) {
        return <Text>Loading...</Text>;
    }
    const isEntrepreneur = user.role === "Entrepreneur";
    const tabIconName = isEntrepreneur ? "business" : "bookmark";
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                headerStyle: {
                    backgroundColor: "gray",
                },
                headerShadowVisible: false,
                headerTintColor: "black",
                tabBarStyle: {
                    backgroundColor: "white",
                    height: 70,
                    shadowColor: 'gray',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 5,
                    marginBottom: 2
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "home" : "home-outline"} color={'#77a6f7'} size={30} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(user)"
                options={{
                    title: "",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? tabIconName: `${tabIconName}-outline`}
                            color={'#77a6f7'}
                            size={30}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    title: "",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} color={'#77a6f7'} size={30} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "person" : "person-outline"} color={'#77a6f7'} size={30} />
                    ),
                }}
            />

        </Tabs>
    );
}
