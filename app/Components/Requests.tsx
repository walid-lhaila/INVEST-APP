import React from 'react';
import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Toast} from "@/app/CustomToast";
import {Ionicons} from "@expo/vector-icons";
import RequestCard from "@/app/Components/RequestCard";
import useGetAllRequest from "@/app/hooks/useGetAllRequest";

interface RequestProps {
    onPress: () => void;
}
function Requests({onPress}: RequestProps) {
    const {requests, isLoading, error} = useGetAllRequest();
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient colors={['#77a6f7', '#f6f7ff']} style={styles.gradient}>
                <View style={styles.content}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15}}>
                        <Pressable onPress={onPress} style={{ backgroundColor: 'white', paddingHorizontal: 7, paddingVertical: 7, borderRadius: 50,shadowColor: 'gray', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3,}}>
                            <Ionicons name="arrow-back" color="black" size={30} />
                        </Pressable>
                        <Text style={styles.header}>My Invitations</Text>
                    </View>
                    <ScrollView contentContainerStyle={styles.requestList}>
                        {requests.map((request) => (
                            <RequestCard username={request.sender} role="Entrepreneur" createdAt={request.createdAt} />
                        ))}
                    </ScrollView>
                </View>
            </LinearGradient>
            <Toast />
        </View>
    );
}

export default Requests;


const styles = StyleSheet.create({
    content: {
        paddingVertical: 35,
        flex: 1,
        top: 30,
        width: '100%'
    },
    header: {
        fontSize: 28,
        paddingHorizontal: 15,
        fontWeight: "800",
        color: "white",
    },
    requestList: {
        paddingBottom: 20,
        marginTop: 20
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
    },
});
