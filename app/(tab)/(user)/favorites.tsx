import React from 'react';
import {StatusBar, StyleSheet, Text, View} from "react-native";
import useGetFavorites from "@/app/hooks/useGetFavorites";
import {LinearGradient} from "expo-linear-gradient";
import useRemoveFavorites from "@/app/hooks/useRemoveFavorites";
import FavoriteCard from "@/app/Components/FavoriteCard";
import {Ionicons} from "@expo/vector-icons";

function Favorites() {
    const {favorites} = useGetFavorites();
    const {handleDelete} = useRemoveFavorites();

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient colors={['#77a6f7', '#f6f7ff']} style={styles.gradient}>
                <View style={styles.content}>
                    <Text style={styles.header}>My Favorites</Text>
                    {favorites.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="bookmark" size={100} color="gray" />
                            <Text style={styles.emptyText}>No Favorites Yet</Text>
                            <Text style={styles.emptySubText}>
                                Start adding your favorite posts to see them here!
                            </Text>
                        </View>
                    ) : (
                        favorites.map((favorite) => (
                            <FavoriteCard
                                onDelete={() => handleDelete(favorite._id)}
                                key={favorite._id}
                                title={favorite.post.title}
                                description={favorite.post.description}
                                category={favorite.post.category}
                                location={favorite.post.location}
                                currentInvestment={favorite.post.currentInvestment}
                                investmentGoal={favorite.post.investmentGoal}
                                entrepreneur={favorite.post.entrepreneur}
                                createdAt={favorite.post.createdAt}
                            />
                        ))
                    )}
                </View>
            </LinearGradient>
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    emptySubText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        opacity: 0.8,
    },
});
