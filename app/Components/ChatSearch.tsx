import React from 'react';
import {Ionicons} from "@expo/vector-icons";
import {StyleSheet, TextInput, View} from "react-native";

function ChatSearch() {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="white" style={styles.icon} />
            <TextInput
                placeholder="Search Chat..."
                placeholderTextColor="white"
                style={styles.input}
            />
        </View>
    );
}

export default ChatSearch;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(72, 87, 112, 0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 50,
        margin: 10,
        width: '100%',
        marginHorizontal: 'auto'
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    },
    iconRight: {
        marginLeft: 10,
    },
});
