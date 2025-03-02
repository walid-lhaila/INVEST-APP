import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

function FilterBar({ setFilter }) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setFilter('all')} style={styles.button}>
                    <MaterialCommunityIcons name="filter-remove" size={20} color="white" />
                    <Text style={styles.text}>All</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFilter('investmentGoal-desc')} style={styles.button}>
                    <FontAwesome5 name="dollar-sign" size={18} color="white" />
                    <Ionicons name="arrow-down" size={18} color="white" />
                    <Text style={styles.text}>Goal</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFilter('title')} style={styles.button}>
                    <Ionicons name="text" size={18} color="white" />
                    <Text style={styles.text}>A-Z</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFilter('date')} style={styles.button}>
                    <Ionicons name="time-outline" size={18} color="white" />
                    <Text style={styles.text}>Newest</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = {
    container: {
        marginTop: 10,
        alignItems: 'center',
        width: '95%',
        borderRadius: 15,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        alignSelf: 'center'
    },
    buttonContainer: {
        marginHorizontal: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginRight: 10
    },
    button: {
        backgroundColor: 'rgba(72, 87, 112, 0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5,
    }
};

export default FilterBar;
