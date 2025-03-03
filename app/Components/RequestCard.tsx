import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import profile from "@/assets/images/profile.png";
import {formatDistanceToNow} from "date-fns";

interface RequestCardProps {
    username: string;
    role: string;
    createdAt: string;
    requestId: string;
    onAccept: (requestId: string) => void;
    onReject: (requestId: string) => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ username, role, createdAt, onAccept, onReject, requestId }) => {
    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    return (
        <View style={styles.card}>
            <Image source={profile} style={styles.profileImage} />

            <View style={styles.details}>
                <View>
                    <Text style={styles.username}>{username}</Text>
                    <View style={{ gap: 5, backgroundColor: '#5b94f7', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10, width: '35%', marginBottom: 2, marginLeft: 2}}>
                        <Text style={{color: 'white', fontSize: 10, fontWeight: 400, fontFamily: "serif", textAlign: 'center'}}>{role}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                    <Ionicons name="time" size={17} color="black" />
                    <Text style={styles.role}>{timeAgo}</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => onAccept(requestId)} style={styles.acceptButton}>
                    <Ionicons name="checkmark-circle" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onReject(requestId)} style={styles.rejectButton}>
                    <FontAwesome name="times-circle" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RequestCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        width: '100%',
        marginHorizontal: 'auto',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    profileImage: {
        width:55,
        height:55,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'gray'
    },
    details: {
        flex: 1,
        marginLeft: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    service: {
        fontSize: 14,
        color: "#555",
        paddingVertical: 3
    },
    role: {
        fontSize: 12,
        color: "#777",
    },
    actions: {
        flexDirection: "row",
    },
    acceptButton: {
        backgroundColor: "#4CAF50",
        padding: 8,
        borderRadius: 20,
        marginRight: 10,
    },
    rejectButton: {
        backgroundColor: "#FF3B30",
        padding: 8,
        borderRadius: 20,
    },
});
