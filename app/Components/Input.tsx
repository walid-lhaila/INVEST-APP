import {StyleSheet, TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";


interface InputProps {
    placeHolder: string,
    iconName: string,
}

const Input = ({placeHolder, iconName}: InputProps) => {
    return (
        <View style={styles.input}>
            <Ionicons name={iconName} color="#bdbdbd" size={22} />
            <TextInput placeholder={placeHolder} />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        gap: 5,
        width: '100%',
        paddingVertical: 8,
        borderRadius: 40,
        paddingHorizontal: 20,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        marginTop: 20
    }
})