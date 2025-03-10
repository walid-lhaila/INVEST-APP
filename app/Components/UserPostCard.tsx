import { ImageBackground, Pressable, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import profile from "@/assets/images/profile.png";
import { Ionicons } from "@expo/vector-icons";
import useAnimatedPercentage from "@/app/hooks/useAnimatedPercentage";
import React from "react";
import {formatDistanceToNow} from "date-fns";

interface UserPostCardProps {
    title: string;
    description: string;
    category: string;
    location: string;
    currentInvestment: number;
    investmentGoal: number;
    entrepreneur: string;
    createdAt: string;
    onDelete: () => void;
    onPress: () => void;
}

function UserPostCard({ onPress, title, description, category, location, currentInvestment, investmentGoal, entrepreneur, onDelete, createdAt }: UserPostCardProps) {
    const truncateTitle = title.length > 14 ? title.substring(0, 13) + '...' : title;
    const truncateUser = entrepreneur.length > 8 ? entrepreneur.substring(0, 13) + '...' : entrepreneur;
    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    const targetPercentage = Math.floor((currentInvestment / investmentGoal) * 100);
    const animatedPercentage = useAnimatedPercentage(targetPercentage)
    return (
        <Pressable onPress={onPress} style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{truncateTitle}</Text>
                <View style={{ paddingHorizontal: 10, width: '40%' }}>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, {width: `${animatedPercentage}%`}]}/>
                    </View>
                    <Text style={styles.percentageText}>{animatedPercentage}%</Text>
                </View>
            </View>

            <Text style={styles.description}>{description}</Text>

            <View style={styles.infoContainer}>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>{category}</Text>
                </View>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>{location}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.entrepreneurInfo}>
                    <ImageBackground
                        style={styles.profileImage}
                        source={profile}
                        resizeMode="cover"
                    />
                    <View>
                        <Text style={styles.entrepreneur}>{truncateUser}</Text>
                        <View style={styles.role}>
                            <Ionicons name="briefcase-outline" size={13} color="#77a6f7" />
                            <Text style={styles.roleText}>Entrepreneur</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.actions}>
                    <Text style={styles.time}>{timeAgo}</Text>
                    <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                        <Ionicons name="trash-outline" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </Pressable>
    );
}

export default UserPostCard;

const styles = StyleSheet.create({
    card: {
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 15,
        padding: 12,
        alignSelf: "center",
        shadowColor: '#77a6f7',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        flexShrink: 1,
    },
    investment: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#77a6f7',
    },
    description: {
        paddingVertical: 6,
        fontSize: 14,
        color: 'gray',
    },
    infoContainer: {
        gap: 10,
        marginVertical: 6,
    },
    tag: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    tagText: {
        fontWeight: '600',
        fontSize: 13,
    },
    footer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    entrepreneurInfo: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        marginRight: 10,
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 50,
        overflow: "hidden",
    },
    entrepreneur: {
        color: 'gray',
        fontSize: 15,
        fontWeight: '600',
    },
    role: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    roleText: {
        color: 'gray',
        fontSize: 14,
        marginLeft: 5,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        color: "#77a6f7",
        fontSize: 15,
        fontWeight: '600',
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 10,
    },
    progressBarContainer: {
        position: 'relative',
        height: 23,
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#77a6f7',
        borderRadius: 5,
    },
    percentageText: {
        position: 'absolute',
        fontSize: 14,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
        top: 4,
        left: 60
    },
});
