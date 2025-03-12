import React, {useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import useGetFavorites from "@/app/hooks/useGetFavorites";
import {LinearGradient} from "expo-linear-gradient";
import useRemoveFavorites from "@/app/hooks/useRemoveFavorites";
import FavoriteCard from "@/app/Components/FavoriteCard";
import {Ionicons} from "@expo/vector-icons";
import PostDetails from "@/app/Components/PostDetails";
import {useRouter} from "expo-router";

function Favorites() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const {favorites} = useGetFavorites();
    const {handleDelete} = useRemoveFavorites();
    const Router = useRouter();

    const openPostDetails = (post) => {
        setSelectedPost(post);
        setModalVisible(true);
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient colors={['#77a6f7', '#f6f7ff']} style={styles.gradient}>
                <View style={styles.content}>
                    <Text style={styles.header}>My Favorites</Text>
                    {favorites.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="bookmark" size={100} color="white" />
                            <Text style={styles.emptyText}>No Favorites Yet</Text>
                            <Text style={styles.emptySubText}>
                                Start adding your favorite posts to see them here!
                            </Text>
                        </View>
                    ) : (
                        <ScrollView>
                            {favorites.map((favorite) => (
                            <FavoriteCard
                                onPress={() => openPostDetails(favorite)}
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
                        ))}
                        </ScrollView>
                    )}
                    {selectedPost && (
                        <PostDetails title={selectedPost.post.title} description={selectedPost.post.description} category={selectedPost.post.category} tags={selectedPost.post.tags} location={selectedPost.post.location} currentInvestment={selectedPost.post.currentInvestment} investmentGoal={selectedPost.post.investmentGoal} src={selectedPost.post.imageUrl} status={selectedPost.post.status} entrepreneur={selectedPost.post.entrepreneur} onClose={() => setModalVisible(false)} onUserDetails={() => Router.push({pathname: "/usersProfile", params: {username: selectedPost.post.entrepreneur}})} visible={modalVisible} id={selectedPost._id} key={selectedPost._id} />
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
