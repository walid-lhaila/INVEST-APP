import React from 'react';
import {Dimensions, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import bg from "@/assets/images/bg3.jpeg";
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
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.content}>
                        <Text style={styles.text}>Create Account as Entrepreneur</Text>
                        <View style={{ width: '100%', paddingVertical: 20}}>
                            <Input placeHolder="First Name" iconName="person" />
                            <Input placeHolder="Last Name" iconName="person" />
                            <Input placeHolder="Username" iconName="person" />
                            <Input placeHolder="Phone Number" iconName="phone-portrait" />
                            <Input placeHolder="Interest" iconName="menu" />
                            <Input placeHolder="Email Address" iconName="mail" />
                            <Input placeHolder="Password" iconName="lock-closed" />
                            <View style={{ flexDirection: 'row', gap: 10, paddingTop: 50, justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}>Sign Up</Text>
                                <LinearGradient colors={['#1d976c', '#93F9B9']} style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: 15}} >
                                    <Ionicons name="arrow-forward" size={20} color='white' />
                                </LinearGradient>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
    },
    safeArea: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
})