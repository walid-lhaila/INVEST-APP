import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";
import profile from "@/assets/images/profile.png";

interface ConversationsCardProps {
    name: string;
    message: string;
    count: string;
    time: string;
    onPress: () => void;
}
function ConversationsCard({name, message, count, time, onPress} : ConversationsCardProps) {
    return (
        <Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: "#9c9c9c", borderWidth: 1, borderBottomWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10}}>
                <View style={styles.profileContainer}>
                    <ImageBackground
                        style={styles.profileImage}
                        source={profile}
                        resizeMode="cover"
                    />
                </View>

                <View>
                    <Text style={{color: 'black', fontSize: 19, fontWeight: 700, fontFamily: "Roboto"}}>{name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10}}>
                        <Text style={{color: '#717171', fontSize: 14, fontWeight: 300, fontFamily: "serif"}}>{message}</Text>
                    </View>
                </View>
            </View>
            <View style={{ alignItems: 'center', gap: 5}}>
                <Text style={{ color: '#77a6f7'}}>{time}</Text>
                <View style={{backgroundColor: '#77a6f7', paddingVertical: 1, paddingHorizontal: 5, borderRadius: 50}}>
                    <Text>{count}</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default ConversationsCard;

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

});
