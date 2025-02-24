import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import profile from "@/assets/images/profile.png";

interface ChatHeaderProps {
    name: string;
    status: string;
    onPress: () => void;
}

function ChatHeader({onPress, name, status}: ChatHeaderProps) {
    return (
        <View style={{ backgroundColor: "#77a6f7", width: '100%', height: 120, borderRadius: 40,}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 40, width: '90%', marginHorizontal: 'auto'}}>
                <Pressable onPress={onPress} style={{ backgroundColor: 'white', paddingHorizontal: 7, paddingVertical: 7, borderRadius: 50,shadowColor: 'gray', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3,}}>
                    <Ionicons name="arrow-back" color="black" size={30} />
                </Pressable>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10}}>
                    <View style={styles.profileContainer}>
                        <ImageBackground
                            style={styles.profileImage}
                            source={profile}
                            resizeMode="cover"
                        />
                    </View>

                    <View>
                        <Text style={{color: 'white', fontSize: 17, fontWeight: 700, fontFamily: "Roboto"}}>{name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10}}>
                            <Text style={{color: 'white', fontSize: 13, fontWeight: 300, fontFamily: "serif"}}>{status}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ChatHeader;

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
        width: 40,
        height: 40,
        borderRadius: 25,
        overflow: 'hidden',
    },
})
