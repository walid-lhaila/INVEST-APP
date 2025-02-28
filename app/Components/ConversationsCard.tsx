import React from 'react';
import {ActivityIndicator, ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import profile from '@/assets/images/profile.png';
import useUser from "@/app/hooks/useUser";

interface ConversationsCardProps {
    conversation: any;
    onPress: () => void;
}

function ConversationsCard({ conversation, onPress }: ConversationsCardProps) {
    const {user, loading} = useUser();
    if(loading) {
        return <ActivityIndicator size="large" color="#77a6f7" />;
    }
    const loggedInUser = user.username;
    const otherUser = conversation.user1 === loggedInUser ? conversation.user2 : conversation.user1;
    const unreadMessagesFromOtherUser = conversation.messages.filter(
        (msg) => msg.senderUsername === otherUser && !msg.isRead
    );
    const lastMessage = conversation.messages.length > 0
        ? conversation.messages[conversation.messages.length - 1].content
        : '';

    return (
        <Pressable onPress={onPress} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: '#9c9c9c', borderWidth: 1, borderBottomWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0,}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 }}>
                <View style={styles.profileContainer}>
                    <ImageBackground style={styles.profileImage} source={profile} resizeMode="cover"/>
                </View>
                <View>
                    <Text style={{ color: 'black', fontSize: 19, fontWeight: '700', fontFamily: 'Roboto' }}>
                        {otherUser}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10,}}>
                        <Text style={{ color: '#717171', fontSize: 14, fontWeight: '300', fontFamily: 'serif' }}>
                            {lastMessage}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ alignItems: 'center', gap: 5 }}>
                <Text style={{ color: '#77a6f7' }}>08:25</Text>
                {unreadMessagesFromOtherUser.length > 0 && (
                    <View style={{ backgroundColor: '#77a6f7', paddingVertical: 1, paddingHorizontal: 5, borderRadius: 50 }}>
                        <Text>{unreadMessagesFromOtherUser.length}</Text>
                    </View>
                )}
            </View>
        </Pressable>
    );
}

export default ConversationsCard;

const styles = StyleSheet.create({
    profileContainer: {
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
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
    },
});
