import {ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import bg from "../assets/images/bg2.jpeg"

export default function Index() {
    const router = useRouter()
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground source={bg} style={styles.backgroundImage} resizeMode="cover">
                <LinearGradient colors={['transparent', 'black']} style={styles.gradient}>
                    <View style={styles.content}>
                        <View style={{ justifyContent: 'center', }}>
                            <Text style={styles.title}>InvestLink</Text>
                            <Text style={styles.description}>Empowering entrepreneurs and investors to collaborate, fund, and grow innovative projects.</Text>
                            <TouchableOpacity onPress={() => router.push('/login')} style={styles.startedButton}>
                                <Text style={styles.buttonText}>Get Started</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
}



const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '90%',
    },
    title: {
        color: 'white',
        fontFamily: 'sans',
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
    },
    description: {
        paddingTop: 10,
        color: 'white',
        fontFamily: 'serif',
        fontSize: 13,
        textAlign: 'center',
    },
    content: {
        flex: 1,
        bottom: 80,
        position: "absolute",
        width: '100%'
    },
    startedButton: {
        marginTop: 20,
        backgroundColor: "#77a6f7",
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderRadius: 20,
        width: '90%',
        margin: 'auto'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
});