import React from 'react';
import {ActivityIndicator, ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";
import profile from "@/assets/images/profile.png";
import {Ionicons} from "@expo/vector-icons";
import useUser from "@/app/hooks/useUser";
import useGetAllRequest from "@/app/hooks/useGetAllRequest";

interface LoggedInUserProps {
    onNotification: () => void;
}

function LoggedInUser({onNotification}: LoggedInUserProps) {
    const {user, loading} = useUser();
    const {requests} = useGetAllRequest();
    if(loading) {
        return <ActivityIndicator size="large" color="#77a6f7" />;
    }
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', marginHorizontal: 'auto'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <View style={styles.profileContainer}>
                    <ImageBackground
                        style={styles.profileImage}
                        source={profile}
                        resizeMode="cover"
                    />
                </View>

                <View>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 700, fontFamily: "Roboto"}}>{user.firstName} {user.lastName}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#5b94f7', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10, width: 'auto'}}>
                        <Ionicons name={"briefcase-outline"} size={13} color={"white"} />
                        <Text style={{color: 'white', fontSize: 14, fontWeight: 400, fontFamily: "serif"}}>{user.role}</Text>
                    </View>
                </View>
            </View>
            <Pressable onPress={onNotification} style={{backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 50, padding: 8, justifyContent: 'center', alignItems: 'center'}}>
                {requests.length > 0 && <View style={styles.notificationDot} />}
                <Ionicons name="notifications-outline" color="white" size={25} />
            </Pressable>
        </View>
    );
}

export default LoggedInUser;

const styles = StyleSheet.create({
    profileContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
    },
    notificationDot: {
        backgroundColor: 'red',
        width: 8,
        height: 8,
        borderRadius: 50,
        position: 'absolute',
        top: 0,
        right: 8,
    }

});
