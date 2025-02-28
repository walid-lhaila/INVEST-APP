import {TextInput} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";


interface InputProps {
    placeHolder: string,
    iconName: string,
    onChangeText: any;
    handler ?: any
}

const Input = ({placeHolder, iconName, onChangeText, handler = () => {}}: InputProps) => {

    return (
        <>
            <Ionicons name={iconName} color="#77a6f7" size={22} />
            <TextInput onPress={handler} style={{ width: '100%' }} placeholder={placeHolder} onChangeText={onChangeText} />
        </>
    )
}

export default Input;
