import React, {useEffect} from 'react';
import {ActivityIndicator, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import profile from "@/assets/images/profile.png";
import ProjectRealizedCard from "@/app/Components/ProjectRealizedCard";
import {useLocalSearchParams, useRouter} from "expo-router";
import useGetUserByUsername from "@/app/hooks/useGetUserByUsername";
import {useDispatch, useSelector} from "react-redux";
import {getProjectByUsername} from "@/app/redux/slices/ProjectRealizedSlice";
import {Ionicons} from "@expo/vector-icons";

function UsersProfile() {
    const {username} = useLocalSearchParams();
    const {user, isLoading: isUserLoading, getUserByUsername} = useGetUserByUsername();
    const dispatch = useDispatch();
    const {userProjects, isLoading: isProjectsLoading, error} = useSelector((state) => state.project);
    const Router = useRouter();
    useEffect(() => {
        if(username) {
            getUserByUsername(username);
            dispatch(getProjectByUsername(username as string));
        }
    }, [username]);
    if(isUserLoading || isProjectsLoading){
        return <ActivityIndicator size="large" color="#77a6f7" style={styles.loading} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => Router.push('/(tab)')} style={{ backgroundColor: 'white', paddingHorizontal: 7, paddingVertical: 7, borderRadius: 50,shadowColor: 'gray', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3, position: 'absolute', left: 20, top: 50}}>
                    <Ionicons name="arrow-back" color="black" size={30} />
                </Pressable>
                <View style={styles.profileWrapper}>
                    <ImageBackground
                        style={styles.profileImage}
                        source={profile}
                        resizeMode="cover"
                    />
                </View>
                <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>About</Text>
                <View style={styles.card}>
                    <DetailItem label="USERNAME" value={user.username} color="#77a6f7" />
                    <DetailItem label="MOBILE" value={user.phone} />
                    <DetailItem label="SERVICE" value={user.services} />
                    <DetailItem label="INTERESTS" value={user.fieldOfInterest} />
                </View>

                    <>
                        <Text style={styles.sectionTitle}>Company</Text>
                        <View style={styles.card}>
                            <DetailItem label="NAME" value={user.companyName} />
                            <DetailItem label="DESCRIPTION" value={user.companyDescription} />
                        </View>
                    </>


                <Text style={styles.sectionTitle}>Project Realized</Text>
                <View style={{paddingVertical: 10}}>
                    {userProjects.length > 0 ? (
                        userProjects.map((project) => (
                            <ProjectRealizedCard
                                role={user.role}
                                key={project._id}
                                title={project.title}
                                description={project.description}
                                tags={project.tags}
                                budget={project.budget}
                                startDate={project.startDate}
                                endDate={project.endDate}
                                creator={project.username}
                                username={project.username}
                            />
                        ))
                    ) : (
                        <Text style={styles.noProjectsText}>No projects found.</Text>
                    )}                </View>
            </ScrollView>

        </View>
    );
}

const DetailItem = ({ label, value, color = "black" }) => (
    <View style={styles.detailItem}>
        <Text style={{fontWeight: 600, fontSize: 16}}>{label}</Text>
        <Text style={{ color, paddingVertical: 3 }}>{value}</Text>
    </View>
);

export default UsersProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7f7",
    },
    header: {
        position: 'relative',
        backgroundColor: "#77a6f7",
        borderRadius: 25,
        paddingVertical: 45,
        alignItems: "center",
    },
    profileWrapper: {
        backgroundColor: "white",
        borderRadius: 50,
        padding: 5,
        elevation: 5,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: "hidden",
    },
    name: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
    },
    email: {
        color: "white",
        fontSize: 16,
        opacity: 0.8,
    },
    sectionTitle: {
        paddingHorizontal: 10,
        fontSize: 22,
        fontWeight: "600",
        marginVertical: 15,
        color: "#333",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    detailItem: {
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.1)",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noProjectsText: {
        textAlign: 'center',
        color: '#777',
        marginTop: 10,
    },
});
