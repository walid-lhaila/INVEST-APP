import React from 'react';
import {Image, ImageBackground, StatusBar, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import LoggedInUser from "@/app/Components/LoggedInUser";
import SearchBar from "@/app/Components/SearchBar";


function Index() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient colors={['#77a6f7', '#f6f7ff']} style={styles.gradient}>
                <View style={styles.content}>
                    <LoggedInUser />
                    <SearchBar />
                </View>
            </LinearGradient>
        </View>
    );
}

export default Index;

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        top: 70,
        width: '100%'
    },
});