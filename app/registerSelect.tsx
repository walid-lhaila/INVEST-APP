import {Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import bg from "@/assets/images/bg3.jpeg";
import {useRouter} from "expo-router";

const { width } = Dimensions.get("window")
const { height } = Dimensions.get("screen")

const registerSelect = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground source={bg} style={styles.backgroundImage} resizeMode="cover" />

            <View style={{justifyContent: 'center', width: '100%', height: '100%', margin: 'auto'}}>
                <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', fontSize: 28, fontFamily: 'serif', paddingVertical: 46}}>Select your account type</Text>
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
        backgroundColor: "#17df44",
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