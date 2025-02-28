import React, {useEffect} from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity, ActivityIndicator
} from "react-native";
import ChatHeader from "@/app/Components/ChatHeader";
import {useLocalSearchParams, useRouter} from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useDispatch, useSelector} from "react-redux";
import {fetchConversationMessages} from "@/app/redux/slices/ConversationSlice";
import useUser from "@/app/hooks/useUser";

function ChatComponent() {
    const { conversationId } = useLocalSearchParams();
    const dispatch = useDispatch();
    const { messages, isLoading } = useSelector((state) => state.conversation);
    const {user, loading} = useUser();
    const Router = useRouter();

    useEffect(() => {
        if(conversationId) {
            dispatch(fetchConversationMessages(conversationId));
        }
    }, [dispatch, conversationId]);

    if(isLoading || loading) {
        return <ActivityIndicator size="large" color="#77a6f7" />;
    }
    const otherUser = messages.find(msg => msg.senderUsername !== user.username)?.senderUsername || "Unknown";


    return (
        <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <ChatHeader onPress={() => Router.push("/(tab)/chat")} name={otherUser} status='Online' />

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" nestedScrollEnabled={true} style={{ paddingHorizontal: 15 }}>
                    {messages.map((message, index) => (
                        <View key={index} style={message.senderUsername === user.username ? styles.sender : styles.receiver}>
                            <Text style={message.senderUsername === user.username ? styles.messageSender : styles.message}>
                                {message.content}
                            </Text>
                            <Text style={message.senderUsername === user.username ? styles.timeSender : styles.time}>
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Écrire un message..." placeholderTextColor="#999" />
                    <TouchableOpacity style={styles.sendButton}>
                        <Ionicons name="send" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

export default ChatComponent;

const styles = StyleSheet.create({
    receiver: {
        backgroundColor: 'white',
        marginTop: 15,
        width: '60%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomEndRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopEndRadius: 20,
        alignSelf: 'flex-start'
    },
    sender: {
        backgroundColor: '#77a6f7',
        marginTop: 15,
        width: '60%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopLeftRadius: 20,
        borderTopEndRadius: 20,
        borderBottomLeftRadius: 20,
        alignSelf: 'flex-end'
    },
    message: {
        color: "black",
        fontSize: 16
    },
    messageSender: {
        color: "white",
        fontSize: 16
    },
    time: {
        color: "#777",
        fontSize: 12,
        marginTop: 5,
        alignSelf: "flex-end"
    },
    timeSender: {
        color: "#ddd",
        fontSize: 12,
        marginTop: 5,
        alignSelf: "flex-end"
    },
    inputContainer: {
        bottom: 7,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: "#f9f9f9",
        color: "black",
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: "#77a6f7",
        padding: 9,
        borderRadius: 50,
    },
});
