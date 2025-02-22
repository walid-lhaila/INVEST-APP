import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SearchBar = () => {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="white" style={styles.icon} />
            <TextInput
                placeholder="Search"
                placeholderTextColor="white"
                style={styles.input}
            />
            <Ionicons name="filter" size={20} color="white" style={styles.iconRight} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(72, 87, 112, 0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 50,
        margin: 10,
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

export default SearchBar;
