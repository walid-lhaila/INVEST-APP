import React from 'react';
import {Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import LoggedInUser from "@/app/Components/LoggedInUser";
import SearchBar from "@/app/Components/SearchBar";
import PostCard from "@/app/Components/PostCard";


function Index() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient colors={['#77a6f7', '#f6f7ff']} style={styles.gradient}>
                <View style={styles.content}>
                    <LoggedInUser />
                    <SearchBar />
                    <ScrollView style={{paddingVertical: 10}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                    </ScrollView>
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
        paddingVertical: 35,
        flex: 1,
        top: 30,
        width: '100%'
    },
});
