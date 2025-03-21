import React, { useEffect } from "react";
import {
    Modal,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    ActivityIndicator, Pressable, Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import profile from "@/assets/images/profile.png";
import useGetUserByUsername from "@/app/hooks/useGetUserByUsername";
import {useDispatch} from "react-redux";
import {sendRequest} from "@/app/redux/slices/RequestSlice";
import {Toast} from "@/app/CustomToast";
import useConnect from "@/app/hooks/useConnect";
import useAddFavorite from "@/app/hooks/useAddFavorite";
import useUser from "@/app/hooks/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PostDetailsProps {
    title: string;
    description: string;
    category: string;
    tags: string;
    location: string;
    currentInvestment: string;
    investmentGoal: string;
    src: string;
    status: string;
    entrepreneur: string;
    onClose: () => void;
    onUserDetails: () => void;
    visible: boolean;
    id: string;
}

function PostDetails({visible, onClose, title, description, location, category, currentInvestment, investmentGoal, src, status, entrepreneur, tags, onUserDetails, id}: PostDetailsProps) {
    const { handleConnect } = useConnect(onClose);
    const { handleAddFavorite } = useAddFavorite();
    const { user: fetchedUser, isLoading, error, getUserByUsername } = useGetUserByUsername();
    const {user: loggedInUser, loading} = useUser();

    useEffect(() => {
        if (visible && entrepreneur) {
            getUserByUsername(entrepreneur);
        }
    }, [visible, entrepreneur]);

    const handleUserDetails = () => {
        onClose();
        onUserDetails();
    }
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Job Detail</Text>
                        <TouchableOpacity>
                            <Ionicons name="share-social-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" nestedScrollEnabled={true} contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.jobInfo}>
                            <Image source={{ uri: src }} style={styles.companyLogo} />
                            <View>
                                <Text style={styles.jobTitle}>{title}</Text>
                                <Text style={styles.companyName}>Location • {location}</Text>
                            </View>
                        </View>

                        <View style={styles.tagsContainer}>
                            <Text style={styles.tag}>{tags}</Text>
                        </View>

                        <View style={styles.tabs}>
                            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                                <Text style={[styles.tabText, styles.activeTabText]}>Description</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.content}>
                            <Text style={styles.sectionTitle}>About this role</Text>
                            <Text style={styles.description}>{description}</Text>

                            <Text style={styles.sectionTitle}>Category</Text>
                            <Text style={styles.qualification}>• {category}</Text>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.sectionTitle}>Details</Text>
                                <Text style={styles.qualification}>• Technologies</Text>
                                <Text style={styles.qualification}>• Investment Goal: ${investmentGoal}</Text>
                                <Text style={styles.qualification}>• Current Investment: ${currentInvestment}</Text>
                                <Text style={styles.qualification}>• Status: {status}</Text>
                            </View>
                        </View>

                        <View style={styles.content}>
                            <Text style={styles.sectionTitle}>Company Information</Text>
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#77a6f7" />
                            ) : error ? (
                                <Text style={styles.error}>Error: {error}</Text>
                            ) : fetchedUser ? (
                                <>
                                    <Text style={styles.qualification}>• {fetchedUser.companyName}</Text>
                                    <Text style={styles.qualification}>• {fetchedUser.companyDescription}</Text>
                                </>
                            ) : (
                                <Text style={styles.error}>No company information available</Text>
                            )}
                        </View>

                        <View style={styles.content}>
                            <Text style={styles.sectionTitle}>Contact Information</Text>
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#77a6f7" />
                            ) : error ? (
                                <Text style={styles.error}>Error: {error}</Text>
                            ) : fetchedUser ? (
                                <>
                                    <Pressable onPress={handleUserDetails} style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10 }}>
                                            <View style={styles.profileContainer}>
                                                <ImageBackground style={styles.profileImage} source={profile} resizeMode="cover"/>
                                            </View>

                                            <View>
                                                <Text style={{ color: "black", fontSize: 17, fontWeight: "700", fontFamily: "Roboto" }}>
                                                    {fetchedUser.firstName} {fetchedUser.lastName}
                                                </Text>
                                                <View style={{backgroundColor: "#77a6f7", flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10,}}>
                                                    <Ionicons name={"briefcase-outline"} size={13} color={"white"} />
                                                    <Text style={{ color: "white", fontSize: 13, fontWeight: "300", fontFamily: "serif" }}>{fetchedUser.role}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Pressable>
                                </>
                            ) : (
                                <Text style={styles.error}>No contact information available</Text>
                            )}
                        </View>
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#77a6f7" />
                        ) : error ? (
                                <Text style={styles.error}>Error: {error}</Text>
                            ) : loggedInUser && loggedInUser.role === "Entrepreneur" ? (
                            <TouchableOpacity onPress={() => handleConnect(entrepreneur)} style={[styles.messageButton, loggedInUser && fetchedUser && loggedInUser.username === fetchedUser.username ? { backgroundColor: "#ccc" } : {}]} disabled={loggedInUser && fetchedUser && loggedInUser.username === fetchedUser.username}>
                                <Ionicons name="person-add-outline" size={20} color="white" />
                                <Text style={styles.buttonText}>Connect</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={{ flexDirection: "row", flex: 1 }}>
                                <TouchableOpacity onPress={() => handleAddFavorite(id)} style={styles.favoriteButton}>
                                    <Ionicons name="bookmark-outline" size={20} color="white" />
                                    <Text style={styles.buttonText}>Favorite</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleConnect(entrepreneur)} style={styles.messageButton}>
                                    <Ionicons name="person-add-outline" size={20} color="white" />
                                    <Text style={styles.buttonText}>Connect</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                </View>
                <Toast />
            </View>
        </Modal>
    );
}

export default PostDetails;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "85%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    scrollContainer: {
        paddingBottom: 90,
        marginTop: 10,
    },
    jobInfo: {
        gap: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    companyLogo: {
        width: 65,
        height: 65,
        borderRadius: 10,
    },
    jobTitle: {
        width: '97%',
        fontSize: 20,
        fontWeight: "bold",
    },
    companyName: {
        fontSize: 14,
        color: "gray",
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginVertical: 10,
    },
    tag: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        fontSize: 12,
        fontWeight: "bold",
    },
    tabs: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    tab: {
        paddingVertical: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#77a6f7",
    },
    tabText: {
        fontSize: 16,
        color: "gray",
    },
    activeTabText: {
        color: "#77a6f7",
        fontWeight: "bold",
    },
    content: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: "gray",
        marginBottom: 10,
    },
    qualification: {
        fontSize: 17,
        color: "#333",
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
    },
    favoriteButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#FFA500",
        paddingVertical: 15,
        borderRadius: 10,
        marginRight: 10,
    },
    messageButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#77a6f7",
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 5,
    },
    profileContainer: {
        backgroundColor: "white",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        overflow: "hidden",
    },
    error: {
        color: "red",
        fontSize: 14,
        marginTop: 10,
    },
});
