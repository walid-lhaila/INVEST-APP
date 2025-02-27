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
import useCreateRealizedProject from "@/app/hooks/useCreateRealizedProject";

function ProjectRealizedForm({ toggleModal }) {
    const { handleChange, handleCreateProject, formData } = useCreateRealizedProject();
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add New Project</Text>

                <TextInput style={styles.input} placeholder="Title" placeholderTextColor="#888" value={formData.title} onChangeText={(text) => handleChange('title', text)}/>
                <TextInput style={styles.input} placeholder="Description" placeholderTextColor="#888" value={formData.description} onChangeText={(text) => handleChange('description', text)} multiline/>
                <TextInput style={styles.input} placeholder="Budget" placeholderTextColor="#888" keyboardType="numeric" value={formData.budget} onChangeText={(text) => handleChange('budget', text)}/>
                <TextInput style={styles.input} placeholder="Tags (comma separated)" placeholderTextColor="#888" value={formData.tags} onChangeText={(text) => handleChange('tags', text)}/>

                <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.datePicker}>
                    <Text style={styles.dateText}>Start Date: {new Date(formData.startDate).toDateString()}</Text>
                </TouchableOpacity>

                {showStartDatePicker && (
                    <DateTimePicker
                        value={new Date(formData.startDate)}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowStartDatePicker(false);
                            if (selectedDate) handleChange("startDate", selectedDate);
                        }}
                    />
                )}

                <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.datePicker}>
                    <Text style={styles.dateText}>End Date: {new Date(formData.endDate).toDateString()}</Text>
                </TouchableOpacity>

                {showEndDatePicker && (
                    <DateTimePicker
                        value={new Date(formData.endDate)}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowEndDatePicker(false);
                            if (selectedDate) handleChange("endDate", selectedDate);
                        }}
                    />
                )}


                <TouchableOpacity style={styles.submitButton} onPress={() => handleCreateProject(toggleModal)}>
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
