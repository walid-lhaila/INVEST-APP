import React, { useState } from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import profile from "@/assets/images/profile.png";
import ProjectRealizedCard from "@/app/Components/ProjectRealizedCard";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import ProjectRealizedForm from "@/app/Components/ProjectRealizedForm";
import useUser from "@/app/hooks/useUser";
import {Toast} from "@/app/CustomToast";
import useGetAllMyRealizedProject from "@/app/hooks/useGetAllMyRealizedProject";
import useDeleteProjects from "@/app/hooks/useDeleteProjects";

function Profile() {
    const [isModalVisible, setModalVisible] = useState(false);
    const { user, loading } = useUser();
    const {projects} = useGetAllMyRealizedProject();
    const { handleDelete } = useDeleteProjects();
    if(loading) {
        return <ActivityIndicator size="large" color="#77a6f7" />;
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
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

            <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
                <Ionicons name={"add-sharp"} color="white" size={33} />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>About</Text>
                <View style={styles.card}>
                    <DetailItem label="USERNAME" value={user.username} color="#77a6f7" />
                    <DetailItem label="MOBILE" value={user.phone} />
                    <DetailItem label="SERVICE" value={user.services} />
                </View>

                {user.role === "Entrepreneur" ? (
                    <>
                        <Text style={styles.sectionTitle}>Company</Text>
                        <View style={styles.card}>
                            <DetailItem label="NAME" value={user.companyName} />
                            <DetailItem label="DESCRIPTION" value={user.companyDescription} />
                        </View>
                    </>
                ) : null}


                <Text style={styles.sectionTitle}>Project Realized</Text>
                <View style={{paddingVertical: 10}}>
                    {projects.map((project) => (
                        <ProjectRealizedCard onDelete={() => handleDelete(project._id)} username={user.username} tags={project.tags} role={user.role} description={project.description} title={project.title} creator={user.username} budget={project.budget} endDate={project.endDate} startDate={project.startDate} key={project._id} />
                    ))}
                </View>
            </ScrollView>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                style={styles.modal}
            >
                <ProjectRealizedForm toggleModal={toggleModal} />
            </Modal>
            <Toast />
        </View>
    );
}

const DetailItem = ({ label, value, color = "black", }) => (
    <View style={styles.detailItem}>
        <Text>{label}</Text>
        <Text style={{ color, paddingVertical: 3 }}>{value}</Text>
    </View>
);

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7f7",
    },
    header: {
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
    addButton: {
        position: 'absolute',
        bottom: 40,
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
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});
