import React from 'react';
import {ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import ChatSearch from "@/app/Components/ChatSearch";
import ConversationsCard from "@/app/Components/ConversationsCard";
import {useRouter} from "expo-router";
import useGetAllConversations from "@/app/hooks/useGetAllConversations";
import {useDispatch} from "react-redux";
import {markMessagesAsRead} from "@/app/redux/slices/ConversationSlice";

function Chat() {
    const dispatch = useDispatch();
    const {conversations} = useGetAllConversations();
    const Router = useRouter()


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
                <View style={{backgroundColor: "#77a6f7", width: '100%', height: 165, borderRadius: 40,}}>
                    <View style={{ marginTop: 45, width: '90%', marginHorizontal: 'auto'}}>
                        <Text style={{ fontSize: 35, fontWeight: 700, color: 'white'}}>Chat</Text>
                        <ChatSearch />
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={{ marginTop: 20, color: 'black', fontWeight: 700,}}>ALL MESSAGES</Text>
                    <ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" nestedScrollEnabled={true} style={{ marginTop: 10}}>
                        {conversations.map((conversation) => (
                                <ConversationsCard key={conversation._id} onPress={() => {dispatch(markMessagesAsRead(conversation._id)); Router.push({ pathname: "/chatComponent", params: { conversationId: conversation._id } })}} conversation={conversation}/>
                        ))}
                    </ScrollView>
                </View>
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
        flex: 1,
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


