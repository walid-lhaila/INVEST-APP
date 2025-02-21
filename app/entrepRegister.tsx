import React from 'react';
import {
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView, Platform,
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


const { width } = Dimensions.get("window")
const { height } = Dimensions.get("screen")
function EntrepRegister() {
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground source={bg} style={styles.backgroundImage} resizeMode="cover" />
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView style={{ flex: 1, width: '80%', marginHorizontal: 'auto', justifyContent: 'center', marginTop: 15 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Text style={styles.text}>Create Account as Entrepreneur</Text>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <View style={{ width: '100%'}}>
                            <Input placeHolder="First Name" iconName="person-outline" />
                            <Input placeHolder="Last Name" iconName="person-outline" />
                            <Input placeHolder="Username" iconName="person-circle-outline" />
                            <Input placeHolder="Phone Number" iconName="call-outline" />
                            <Input placeHolder="Interest" iconName="bulb-outline" />
                            <Input placeHolder="Company Name" iconName="business-outline" />
                            <Input placeHolder="Description" iconName="document-text-outline" />
                            <Input placeHolder="Email Address" iconName="mail-outline" />
                            <Input placeHolder="Password" iconName="key-outline" />
                            <View style={{ flexDirection: 'row', gap: 10, paddingTop: 50, justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}>Sign Up</Text>
                                <LinearGradient colors={['#77a6f7', '#D3E3FC']} style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: 15}} >
                                    <Ionicons name="arrow-forward" size={20} color='white' />
                                </LinearGradient>
                            </View>
                        </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

export default EntrepRegister;


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
        marginTop: 35,
    },
    safeArea: {
        flex: 1,
    },
    scrollViewContent: {
        paddingTop: 20,
        justifyContent: "center",
    },
})