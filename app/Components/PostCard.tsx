import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";
import profile from "@/assets/images/profile.png";
import {Ionicons} from "@expo/vector-icons";
import useAnimatedPercentage from "@/app/hooks/useAnimatedPercentage";
import {formatDistanceToNow} from "date-fns";

interface PostCardProps {
    title: string;
    description: string;
    category: string;
    location: string;
    currentInvestment: number;
    investmentGoal: number;
    entrepreneur: string;
    createdAt: string;
    onPress: () => void;
}

function PostCard({onPress, title, description ,category, location, currentInvestment, investmentGoal, entrepreneur, createdAt}: PostCardProps) {
    const truncateTitle = title.length > 14 ? title.substring(0, 13) + '...' : title;
    const truncateUser = entrepreneur.length > 8 ? entrepreneur.substring(0, 13) + '...' : entrepreneur;
    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    const targetPercentage = Math.floor((currentInvestment / investmentGoal) * 100);
    const animatedPercentage = useAnimatedPercentage(targetPercentage)
    return (
        <Pressable onPress={onPress} style={{ width: '95%', backgroundColor: 'white', marginHorizontal: 'auto', borderRadius: 10, marginTop: 15, shadowColor: '#77a6f7', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3,}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center'}}>
                <Text style={{fontWeight: 900, fontSize: 20}}>{truncateTitle}</Text>
                <View style={{ paddingHorizontal: 10, width: '40%' }}>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, {width: `${animatedPercentage}%`}]}/>
                    </View>
                    <Text style={styles.percentageText}>{animatedPercentage}%</Text>
                </View>
            </View>
            <Text style={{paddingHorizontal: 10, fontSize: 14, fontWeight: 400, color: 'gray'}}>{description}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',  paddingHorizontal: 10,}}>
                <View style={{flexDirection: 'row', gap: 8, paddingVertical: 10}}>
                    <View style={{backgroundColor: '#f0f0f0', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 13}}>
                        <Text style={{fontWeight: 600, fontSize: 13}}>{category}</Text>
                    </View>
                </View>
                <View style={{backgroundColor: '#f0f0f0', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 13}}>
                    <Text style={{fontWeight: 600, fontSize: 13}}>{location}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <View style={styles.profileContainer}>
                        <ImageBackground
                            style={styles.profileImage}
                            source={profile}
                            resizeMode="cover"
                        />
                    </View>

                    <View>
                        <Text style={{color: 'gray', fontSize: 15, fontWeight: 600, fontFamily: "Roboto"}}>{truncateUser}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10}}>
                            <Ionicons name={"briefcase-outline"} size={13} color={"#77a6f7"} />
                            <Text style={{color: 'gray', fontSize: 14, fontWeight: 300, fontFamily: "serif"}}>Entrepreneur</Text>
                        </View>
                    </View>
                </View>
                <Text style={{ color: "#77a6f7", fontSize: 15, fontWeight: 600}}>{timeAgo}</Text>
            </View>
        </Pressable>
    );
}

export default PostCard;


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
        width: 30,
        height: 30,
        borderRadius: 25,
        overflow: 'hidden',
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
