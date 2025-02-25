import React, {useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import LoggedInUser from "@/app/Components/LoggedInUser";
import SearchBar from "@/app/Components/SearchBar";
import PostCard from "@/app/Components/PostCard";
import PostDetails from "@/app/Components/PostDetails";
import image from "../../assets/images/AI.jpeg"


function Index() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient colors={['#77a6f7', '#f6f7ff']} style={styles.gradient}>
                <View style={styles.content}>
                    <LoggedInUser />
                    <SearchBar />
                    <ScrollView style={{paddingVertical: 10}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
                        <PostCard onPress={() => setModalVisible(true)} title="New Investment in IA" description="An exciting new investment opportunity in IA." location="Casablanca" currentInvestment='2000' investmentGoal='5000' entrepreneur="Walid Lhaila" category="Technologies" />
                    </ScrollView>
                </View>
            </LinearGradient>

            <PostDetails visible={modalVisible} onClose={() => setModalVisible(false)} title="New Investment in IA" description="An exciting new investment opportunity in IA." location="Casablanca" currentInvestment='2000' investmentGoal='5000' src={image} category="Technologies" />

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
