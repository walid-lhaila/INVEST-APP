import React, { useState } from 'react';
import { StatusBar, View, TouchableOpacity, ScrollView, Alert, Image, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from '../Components/PostsInput';
import useImagePicker from '../hooks/useImagePicker';

function PostsForm() {
    const { imageUri, pickImage, setImageUri } = useImagePicker();

    const [form, setForm] = useState({
        title: '',
        description: '',
        category: '',
        investmentGoal: '',
        currentInvestment: '',
        location: '',
        tags: '',
        status: 'Publié',
    });

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient colors={['#77a6f7', '#f6f7ff']} style={styles.gradient}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView contentContainerStyle={styles.content}>
                        <Text style={styles.title}>Ajouter un Projet</Text>

                        <CustomInput value={form.title} onChangeText={(text) => handleChange('title', text)} placeholder="Title of the project" />
                        <CustomInput value={form.description} onChangeText={(text) => handleChange('description', text)} placeholder="Description" multiline />
                        <CustomInput value={form.category} onChangeText={(text) => handleChange('category', text)} placeholder="Category" />
                        <CustomInput value={form.investmentGoal} onChangeText={(text) => handleChange('investmentGoal', text)} placeholder="Investment goal ($)" keyboardType="numeric" />
                        <CustomInput value={form.currentInvestment} onChangeText={(text) => handleChange('currentInvestment', text)} placeholder="Current investment ($)" keyboardType="numeric" />
                        <CustomInput value={form.location} onChangeText={(text) => handleChange('location', text)} placeholder="Location" />
                        <CustomInput value={form.tags} onChangeText={(text) => handleChange('tags', text)} placeholder="Tags (separated by commas, e.g., Finance, Startup)" />


                        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                            <Text style={styles.imagePickerText}>{imageUri ? "Image sélectionnée" : "Sélectionner une image"}</Text>
                        </TouchableOpacity>

                        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

                        <View style={styles.statusContainer}>
                            <TouchableOpacity
                                style={[styles.statusButton, form.status === "Publié" && styles.activeStatus]}
                                onPress={() => handleChange("status", "Publié")}
                            >
                                <Text style={styles.statusText}>Publié</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.statusButton, form.status === "Brouillon" && styles.activeStatus]}
                                onPress={() => handleChange("status", "Brouillon")}
                            >
                                <Text style={styles.statusText}>Brouillon</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.statusButton, form.status === "Fermé" && styles.activeStatus]}
                                onPress={() => handleChange("status", "Fermé")}
                            >
                                <Text style={styles.statusText}>Fermé</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Publier</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </View>
    );
}

export default PostsForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 50,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 25,
    },
    imagePicker: {
        backgroundColor: '#77a6f7',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    imagePickerText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 15,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },
    statusButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginHorizontal: 5,
    },
    activeStatus: {
        backgroundColor: '#77a6f7',
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    button: {
        backgroundColor: '#77a6f7',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
