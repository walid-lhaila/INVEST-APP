import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import profile from "@/assets/images/profile.png";
import {Ionicons} from "@expo/vector-icons";
import useProjectDuration from "@/app/Components/useProjectDuration";

interface ProjectRealizedProps {
    title: string;
    description: string;
    budget: number;
    startDate: Date;
    endDate: Date;
    tags: string;
    user: string;
    role: string
    onDelete: () => void;
}
function ProjectRealizedCard({title, description, budget, startDate, endDate, tags, user, role, onDelete}: ProjectRealizedProps) {
    const truncateTitle = title.length > 14 ? title.substring(0, 21) + '...' : title;
    const {duration} = useProjectDuration();
    return (
        <View style={{ width: '95%', backgroundColor: 'white', marginHorizontal: 'auto', borderRadius: 10, marginTop: 10, shadowColor: '#77a6f7', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3,}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                <Text style={{fontWeight: 900, fontSize: 20}}>{truncateTitle}</Text>
                <Text style={{fontWeight: 800, fontSize: 18, color: '#77a6f7'}}>${budget}</Text>
            </View>
            <Text style={{paddingHorizontal: 10, fontSize: 14, fontWeight: 400, color: 'gray'}}>{description}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',  paddingHorizontal: 10,}}>
                <View style={{flexDirection: 'row', gap: 8, paddingVertical: 10}}>
                    <View style={{backgroundColor: '#f0f0f0', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 13}}>
                        <Text style={{fontWeight: 600, fontSize: 13}}>{tags}</Text>
                    </View>
                </View>
                <View style={{backgroundColor: '#f0f0f0', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 13}}>
                    <Text style={{fontWeight: 600, fontSize: 13}}>{duration(startDate, endDate)}</Text>
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
                        <Text style={{color: 'gray', fontSize: 15, fontWeight: 600, fontFamily: "Roboto"}}>{user}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10}}>
                            <Ionicons name={"briefcase-outline"} size={13} color={"#77a6f7"} />
                            <Text style={{color: 'gray', fontSize: 14, fontWeight: 300, fontFamily: "serif"}}>{role}</Text>
                        </View>
                    </View>
                </View>
                    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                        <Ionicons name="trash-outline" size={20} color="white" />
                    </TouchableOpacity>
            </View>
        </View>
    );
}

export default ProjectRealizedCard;

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
    deleteButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 10,
    },

});
