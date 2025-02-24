import React, { useState } from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Platform, KeyboardAvoidingView
} from "react-native";
import profile from "@/assets/images/profile.png";
import ProjectRealizedCard from "@/app/Components/ProjectRealizedCard";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';

function Profile() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onChangeStartDate = (event, selectedDate) => {
        setShowStartDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setStartDate(selectedDate);
        }
    };

    const onChangeEndDate = (event, selectedDate) => {
        setShowEndDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setEndDate(selectedDate);
        }
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
                <Text style={styles.name}>Walid Lhaila</Text>
                <Text style={styles.email}>walidlhaila00@gmail.com</Text>
            </View>

            <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
                <Ionicons name={"add-sharp"} color="white" size={33} />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
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

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                style={styles.modal}
            >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add New Project</Text>

                    <TextInput style={styles.input} placeholder="Title" placeholderTextColor="#888"/>

                    <TextInput style={styles.input} placeholder="Description" placeholderTextColor="#888" multiline/>

                    <TextInput style={styles.input} placeholder="Budget" placeholderTextColor="#888" keyboardType="numeric"/>

                    <TextInput style={styles.input} placeholder="Tags (comma separated)" placeholderTextColor="#888"/>

                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.datePicker}>
                        <Text style={styles.dateText}>Start Date: {startDate.toDateString()}</Text>
                    </TouchableOpacity>

                    {showStartDatePicker && (
                        <DateTimePicker style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: 100, marginBottom: 10}}
                            value={startDate}
                            mode="date"
                            display="default"
                            onChange={onChangeStartDate}
                        />
                    )}

                    <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.datePicker}>
                        <Text style={styles.dateText}>End Date: {endDate.toDateString()}</Text>
                    </TouchableOpacity>

                    {showEndDatePicker && (
                        <DateTimePicker style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: 100, marginBottom: 10}}
                            value={endDate}
                            mode="date"
                            display="default"
                            onChange={onChangeEndDate}
                        />
                    )}

                    <TouchableOpacity style={styles.submitButton} onPress={toggleModal}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}

const DetailItem = ({ label, value, color = "black" }) => (
    <View style={styles.detailItem}>
        <Text>{label}</Text>
        <Text style={ color }>{value}</Text>
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
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        color: "#000",
    },
    datePicker: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    dateText: {
        color: "#555",
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: "#77a6f7",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 5,
    },
    submitText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
