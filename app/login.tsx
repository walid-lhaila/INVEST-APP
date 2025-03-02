import {
    ImageBackground,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    SafeAreaView, ActivityIndicator,
} from "react-native"
import bg from "../assets/images/bg.jpeg"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import Input from "@/app/Components/Input"
import useLogin from "@/app/hooks/useLogin";
import {useRouter} from "expo-router";
import {Toast} from "@/app/CustomToast";
import FocusedInput from "@/app/Components/FocusedInput";
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {initializeSocket} from "@/app/services/socket";

const { width } = Dimensions.get("window")
const { height } = Dimensions.get("screen")

function Login() {
    const Router = useRouter();
    const { handleLogin, setUsername, setPassword, isLoading } = useLogin();

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground source={bg} style={styles.backgroundImage} resizeMode="cover" />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.content}>
                        <Text style={styles.text}>Hello</Text>
                        <Text style={styles.subText}>Sign in to your account</Text>
                        <View style={styles.inputContainer}>
                            <FocusedInput >
                                <Input placeHolder="Username" iconName="person" onChangeText={setUsername}   />
                                <Input placeHolder="Password" iconName="lock-closed" onChangeText={setPassword} />

                            </FocusedInput>


                            <Text style={styles.forgotPassword}>Forgot your password ?</Text>
                            <Pressable onPress={handleLogin} style={styles.signInContainer} disabled={isLoading}>
                                <Text style={styles.signInText}>Sign In</Text>
                                <LinearGradient colors={["#77a6f7", "#D3E3FC"]} style={styles.gradientButton}>
                                    {isLoading ? (
                                        <ActivityIndicator size="small" color="white" />
                                    ) : (
                                        <Ionicons name="arrow-forward" size={20} color="white" />
                                    )}
                                </LinearGradient>
                            </Pressable>
                            <Pressable onPress={() => Router.push("/registerSelect")}>
                                <Text style={styles.createAccountText}>Don't have an account ? Create</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <Toast />
        </View>
    )
}

export default Login

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
    safeArea: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    content: {
        width: "75%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "black",
        fontSize: 45,
        fontWeight: "bold",
    },
    subText: {
        paddingVertical: 20,
        fontSize: 15,
        fontWeight: "400",
    },
    inputContainer: {
        width: "100%",
        paddingVertical: 20,
    },
    forgotPassword: {
        color: "#b3b3b3",
        paddingTop: 20,
        textAlign: "right",
    },
    signInContainer: {
        flexDirection: "row",
        gap: 10,
        paddingTop: 100,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    signInText: {
        fontWeight: "bold",
        fontSize: 20,
    },
    gradientButton: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 15,
    },
    createAccountText: {
        fontWeight: "400",
        textAlign: "center",
        paddingTop: 80,
    },
})

