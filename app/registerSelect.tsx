import {
    Dimensions,
    ImageBackground,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import bg from "@/assets/images/bg.jpeg";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

const { width } = Dimensions.get("window")
const { height } = Dimensions.get("screen")

const registerSelect = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground source={bg} style={styles.backgroundImage} resizeMode="cover" />

            <Pressable onPress={() => router.push('/login')} style={{ backgroundColor: 'white', position: 'absolute', marginTop: 50, marginLeft: 20 , paddingHorizontal: 7, paddingVertical: 7, borderRadius: 50,shadowColor: 'gray', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3,}}>
                <Ionicons name="arrow-back" color="black" size={30} />
            </Pressable>

            <View style={{justifyContent: 'center', width: '100%', height: '100%', margin: 'auto'}}>
                <View style={{ gap: 15, width: '85%', marginHorizontal: 'auto'}}>
                    <TouchableOpacity onPress={() => router.push('/investorRegister')}  style={styles.button}>
                        <Text style={styles.buttonText}>Investor</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/entrepRegister')}  style={styles.button}>
                        <Text style={styles.buttonText}>Entrepreneur</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default registerSelect;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: "absolute",
        width: width,
        height: height,
        top: 0,
        left: 0,
    },
    button: {
        backgroundColor: "#77a6f7",
        paddingVertical: 25,
        paddingHorizontal: 5,
        borderRadius: 15,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'serif',
        fontSize: 20,
    },
})
