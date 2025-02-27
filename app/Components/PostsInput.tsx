import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const PostsInput = ({ value, onChangeText, placeholder, keyboardType = "default", multiline = false }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, multiline && styles.textArea]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                multiline={multiline}
            />
        </View>
    );
};

export default PostsInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
});
