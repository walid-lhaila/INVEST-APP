import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const toastConfig = {
    success: ({ text1, text2 }: any) => (
        <View style={[styles.toastContainer, styles.successToast]}>
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <View style={styles.toastContent}>
                <Text style={styles.toastTitle}>{text1}</Text>
                {text2 && <Text style={styles.toastMessage}>{text2}</Text>}
            </View>
        </View>
    ),

    error: ({ text1, text2 }: any) => (
        <View style={[styles.toastContainer, styles.errorToast]}>
            <Ionicons name="close-circle" size={24} color="white" />
            <View style={styles.toastContent}>
                <Text style={styles.toastTitle}>{text1}</Text>
                {text2 && <Text style={styles.toastMessage}>{text2}</Text>}
            </View>
        </View>
    ),
};

const styles = StyleSheet.create({
    toastContainer: {
        flexDirection: "row",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "90%",
        alignSelf: "center",
        marginTop: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    successToast: {
        backgroundColor: "#2ecc71",
    },
    errorToast: {
        backgroundColor: "#e74c3c",
    },
    toastContent: {
        marginLeft: 10,
        flex: 1,
    },
    toastTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    toastMessage: {
        color: "white",
        fontSize: 14,
    },
});

export { toastConfig, Toast };
