import React, {useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import UserPostCard from "@/app/Components/UserPostCard";
import {LinearGradient} from "expo-linear-gradient";
import PostsForm from "@/app/Components/PostsForm";
import {Ionicons} from "@expo/vector-icons";

const Projects = () => {
    const [postForm, setPostForm] = useState(false);
    return (
        postForm ? (
                <PostsForm />
            ) : (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar translucent backgroundColor="transparent" />
                <LinearGradient colors={['#77a6f7', '#f6f7ff']} style={styles.gradient}>
                    <View style={styles.content}>
                        <TouchableOpacity onPress={() => setPostForm(true)} style={styles.addButton}>
                            <Ionicons name={"add-sharp"} color="white" size={33} />
                        </TouchableOpacity>
                        <Text style={styles.header}>My Projects</Text>
                        <ScrollView contentContainerStyle={styles.projectList}>
                            <UserPostCard
                                title="New Investment in IA"
                                description="An exciting new investment opportunity in IA."
                                category="Technologie"
                                location="London"
                                currentInvestment="2000"
                                investmentGoal="500000"
                                entrepreneur="Walid Lhaila"
                            />
                        </ScrollView>
                    </View>
                </LinearGradient>
            </View>
            )
    );
};

export default Projects;

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
        marginBottom: 10,
    },
    projectList: {
        paddingBottom: 20,
    },
    noProjects: {
        textAlign: "center",
        color: "gray",
        fontSize: 16,
        marginTop: 20,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    addButton: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        zIndex: 1,
        alignItems: 'center',
        backgroundColor: '#77a6f7',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 50,
        width: 50,
        elevation: 5,
    },
});
