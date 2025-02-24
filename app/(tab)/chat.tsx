import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import ChatSearch from "@/app/Components/ChatSearch";
import ConversationsCard from "@/app/Components/ConversationsCard";

function Chat() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient colors={['#77a6f7', '#f6f7ff']} style={styles.gradient}>
                <View style={styles.content}>
                    <Text style={{ fontSize: 35, fontWeight: 700, color: 'white'}}>Chat</Text>
                    <ChatSearch />
                    <Text style={{ marginTop: 20, color: 'white', fontWeight: 700,}}>ALL MESSAGES</Text>
                    <ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" nestedScrollEnabled={true} style={{ marginTop: 10}}>
                        <ConversationsCard name="Walid Lhaila" count="2" message="Hello, How Are You" time='08:25' />
                        <ConversationsCard name="Ahmed Hounati" count="3" message="Hello, How Are You" time='08:25' />
                        <ConversationsCard name="Brahim Ouborrih" count="1" message="Hello, How Are You" time='08:25' />
                        <ConversationsCard name="Imad Esaghir" count="4" message="Hello, How Are You" time='08:25' />
                        <ConversationsCard name="Mohamed Joual" count="4" message="Hello, How Are You" time='08:25' />
                    </ScrollView>
                </View>
            </LinearGradient>
        </View>
    );
}

export default Chat;

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    content: {
        paddingHorizontal: 15,
        paddingVertical: 35,
        flex: 1,
        top: 30,
        width: '100%'
    },
    profileContainer: {
        width: 50,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        overflow: 'hidden',
    },
});
