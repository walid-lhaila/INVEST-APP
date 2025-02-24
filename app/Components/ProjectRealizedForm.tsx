import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function ProjectRealizedForm({ toggleModal }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

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
                    <DateTimePicker
                        style={{marginLeft: 100, marginBottom: 10}}
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
                    <DateTimePicker
                        style={{marginLeft: 100, marginBottom: 10}}
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
    );
}

export default ProjectRealizedForm;

const styles = StyleSheet.create({
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
