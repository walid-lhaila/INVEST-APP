import React from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, Text, View} from "react-native";
import useGetFavorites from "@/app/hooks/useGetFavorites";
import {LinearGradient} from "expo-linear-gradient";
import UserPostCard from "@/app/Components/UserPostCard";
import useRemoveFavorites from "@/app/hooks/useRemoveFavorites";
import {Toast} from "@/app/CustomToast";

function Favorites() {
    const {favorites, isLoading} = useGetFavorites();
    const {handleDelete} = useRemoveFavorites();
    if (isLoading) {
        return <ActivityIndicator size="large" color="#77a6f7" style={styles.loader} />;
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient colors={['#77a6f7', '#f6f7ff']} style={styles.gradient}>
                <View style={styles.content}>
                    <Text style={styles.header}>My Favorites</Text>
                    {favorites.map((favorite) => (
                        <UserPostCard onDelete={() => handleDelete(favorite._id)} key={favorite._id} title={favorite.post.title} description={favorite.post.description} category={favorite.post.category} location={favorite.post.location} currentInvestment={favorite.post.currentInvestment} investmentGoal={favorite.post.investmentGoal} entrepreneur={favorite.post.entrepreneur} createdAt={favorite.post.createdAt} />
                    ))}
                </View>
            </LinearGradient>
            <Toast />
        </View>
    );
}

export default Favorites;

const styles = StyleSheet.create({
    content: {
        paddingVertical: 35,
        flex: 1,
        top: 30,
        width: '100%'
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    header: {
        fontSize: 28,
        paddingHorizontal: 15,
        fontWeight: "800",
        color: "white",
        marginBottom: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
