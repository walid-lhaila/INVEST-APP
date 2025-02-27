import React, {useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LoggedInUser from "@/app/Components/LoggedInUser";
import SearchBar from "@/app/Components/SearchBar";
import PostCard from "@/app/Components/PostCard";
import PostDetails from "@/app/Components/PostDetails";
import useGetAllPosts from "@/app/hooks/useGetAllPosts";

function Index() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const {posts, isLoading} = useGetAllPosts();

    const openPostDetails = (post) => {
        setSelectedPost(post);
        setModalVisible(true);
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
            {isLoading ? (
                <ActivityIndicator size="large" color="#77a6f7" style={styles.loadingIndicator} />
            ) : (
                <LinearGradient colors={['#77a6f7', '#f6f7ff']} style={styles.gradient}>
                    <View style={styles.content}>
                        <LoggedInUser />
                        <SearchBar />
                        <ScrollView
                            style={{ paddingVertical: 10 }}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                            nestedScrollEnabled={true}
                        >
                            {posts.map((post) => (
                                <PostCard
                                    key={post._id}
                                    onPress={() => openPostDetails(post)}
                                    title={post.title}
                                    description={post.description}
                                    location={post.location}
                                    currentInvestment={post.currentInvestment}
                                    investmentGoal={post.investmentGoal}
                                    entrepreneur={post.entrepreneur}
                                    category={post.category}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </LinearGradient>
            )}
            {selectedPost && (
                <PostDetails
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title={selectedPost.title}
                    description={selectedPost.description}
                    location={selectedPost.location}
                    currentInvestment={selectedPost.currentInvestment}
                    investmentGoal={selectedPost.investmentGoal}
                    entrepreneur={selectedPost.entrepreneur}
                    category={selectedPost.category}
                    src={selectedPost.imageUrl}
                    status={selectedPost.status}
                    tags={selectedPost.tags}
                />
            )}
        </View>
    );
}

export default Index;

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    content: {
        paddingVertical: 35,
        flex: 1,
        top: 30,
        width: '100%',
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
