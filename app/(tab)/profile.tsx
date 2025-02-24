import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import profile from "@/assets/images/profile.png";
import ProjectRealizedCard from "@/app/Components/ProjectRealizedCard";

function Profile() {
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
                <Text style={styles.name}>Walid Lhaila</Text>
                <Text style={styles.email}>walidlhaila00@gmail.com</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
                <Text style={styles.sectionTitle}>About</Text>
                <View style={styles.card}>
                    <DetailItem label="USERNAME" value="@WalidLhaila" color="#77a6f7" />
                    <DetailItem label="MOBILE" value="(+212) 65667828" />
                    <DetailItem label="SERVICE" value="IA Solutions" />
                </View>

                <Text style={styles.sectionTitle}>Company</Text>
                <View style={styles.card}>
                    <DetailItem label="NAME" value="Tech Innovations" />
                    <DetailItem label="DESCRIPTION" value="A tech startup focused on AI" />
                </View>

                <Text style={styles.sectionTitle}>Project Realized</Text>
                <ProjectRealizedCard />
            </ScrollView>
        </View>
    );
}

const DetailItem = ({ label, value, color = "black" }) => (
    <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={[styles.detailValue, { color }]}>{value}</Text>
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
    detailLabel: {
        fontSize: 14,
        color: "gray",
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 18,
        fontWeight: "600",
    },
});
