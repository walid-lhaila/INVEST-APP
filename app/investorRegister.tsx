import React, {useCallback, useEffect} from 'react';
import {
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView, Platform, Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import bg from "@/assets/images/bg.jpeg";
import Input from "@/app/Components/Input";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import useRegister from "@/app/hooks/useRegister";
import Toast from "react-native-toast-message";
import FocusedInput from "@/app/Components/FocusedInput";
import {useRegisterSuggestions} from "@/app/hooks/useRegisterSuggestions";
import {useRouter} from "expo-router";

const { width } = Dimensions.get("window")
const { height } = Dimensions.get("screen")

function InvestorRegister({ role = "Investor" }: { role: "Investor" | "Entrepreneur" }) {
    const Router = useRouter();
    const {formData, handleChange, handleRegister, setFormData} = useRegister(role);
    const debouncedSearch = useRegisterSuggestions(setFormData);

    const handleSearch = useCallback((text: string) => {
        handleChange('search', text);
        debouncedSearch(text);
    }, [handleChange, debouncedSearch]);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground source={bg} style={styles.backgroundImage} resizeMode="cover" />
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView style={{ flex: 1, width: '80%', marginHorizontal: 'auto', justifyContent: 'center', marginTop: 25}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Text style={styles.text}>Create Account as Investor</Text>
                    <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                        <View style={{ width: '100%'}}>
                            <FocusedInput >
                                <Input placeHolder="First Name" iconName="person-outline" onChangeText={(text) => handleChange('firstName', text)}  />
                                <Input placeHolder="Last Name" iconName="person-outline" onChangeText={(text) => handleChange('lastName', text)} />
                                <Input placeHolder="Username" iconName="person-circle-outline" onChangeText={(text) => handleChange('username', text)} />
                                <Input placeHolder="Phone Number" iconName="call-outline" onChangeText={(text) => handleChange('phone', text)} />
                                <Input placeHolder="What are you looking for?" iconName="search-outline" onChangeText={handleSearch} />
                                <Input placeHolder="Interest" iconName="bulb-outline" value={formData.fieldOfInterest || ''} onChangeText={(text) => handleChange('fieldOfInterest', text)} />
                                <Input placeHolder="Services" iconName="construct-outline" value={formData.services || ''} onChangeText={(text) => handleChange('services', text)} />
                                <Input placeHolder="Email Address" iconName="mail-outline" onChangeText={(text) => handleChange('email', text)} />
                                <Input placeHolder="Password" iconName="key-outline" onChangeText={(text) => handleChange('password', text)} />
                            </FocusedInput>
                            <View style={{ display: 'none' }}>
                                <Input value={formData.role} editable={false} />
                            </View>

                            <Pressable onPress={handleRegister} style={{ flexDirection: 'row', gap: 10, paddingTop: 50, justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}>Sign Up</Text>
                                <LinearGradient colors={['#77a6f7', '#D3E3FC']} style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: 15}} >
                                    <Ionicons name="arrow-forward" size={20} color='white' />
                                </LinearGradient>
                            </Pressable>
                            <Pressable onPress={() => Router.push("/login")}>
                                <Text style={styles.loginText}>Do you have an account ? login</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
            <Toast />
        </View>
    );
}

export default InvestorRegister;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: "absolute",
        width: width,
        height: height,
        top: 0,
        left: 0,
    },
    content: {
        width: '75%',
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: 'black',
        fontSize: 26,
        fontWeight: 'bold',
    },
    safeArea: {
        flex: 1,
    },
    scrollViewContent: {
        paddingTop: 10,
        justifyContent: "center",
    },
    loginText: {
        fontWeight: "400",
        textAlign: "center",
        paddingTop: 25,
    },
})
