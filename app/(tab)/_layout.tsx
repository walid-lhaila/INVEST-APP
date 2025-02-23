import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
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
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            color={'#77a6f7'}
                            size={30}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="projects"
                options={{
                    title: "",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "briefcase" : "briefcase-outline"}
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
                        <Ionicons
                            name={focused ? "chatbubble" : "chatbubble-outline"}
                            color={'#77a6f7'}
                            size={30}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            color={'#77a6f7'}
                            size={30}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
