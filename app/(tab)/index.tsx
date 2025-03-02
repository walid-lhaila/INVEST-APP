import React, {useRef, useState} from 'react';
import {ActivityIndicator, Animated, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LoggedInUser from "@/app/Components/LoggedInUser";
import SearchBar from "@/app/Components/SearchBar";
import PostCard from "@/app/Components/PostCard";
import PostDetails from "@/app/Components/PostDetails";
import useGetAllPosts from "@/app/hooks/useGetAllPosts";
import {useRouter} from "expo-router";
import FilterBar from "@/app/Components/FilterBar";

function Index() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [filter, setFilter] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const {posts, isLoading} = useGetAllPosts();
    const Router = useRouter();

    const filterBarHeight = useRef(new Animated.Value(0)).current;
    const toggleFilterBar = () => {
        Animated.timing(filterBarHeight, {
            toValue: showFilter ? 0 : 50,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setShowFilter(!showFilter);
    }

    const openPostDetails = (post) => {
        setSelectedPost(post);
        setModalVisible(true);
    };

    const filterPost = (posts, filter) => {
        switch (filter) {
            case 'all':
                return posts;
            case 'investmentGoal-desc':
                return [...posts].sort((x, y) => y.investmentGoal - x.investmentGoal);
            case 'title':
                return [...posts].sort((x, y) => x.title.localeCompare(y.title));
            case 'date':
                return [...posts].sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt));
            default:
                return posts;
        }
    };

    const filteredPosts = filterPost(posts, filter);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
            {isLoading ? (
                <ActivityIndicator size="large" color="#77a6f7" style={styles.loadingIndicator} />
            ) : (
                <LinearGradient colors={['#77a6f7', '#f6f7ff']} style={styles.gradient}>
                    <View style={styles.content}>
                        <LoggedInUser />
                        <SearchBar onFilterToggle={toggleFilterBar} />
                        <Animated.View style={{ height: filterBarHeight, overflow: 'hidden' }}>
                            <FilterBar setFilter={setFilter} />
                        </Animated.View>
                        <ScrollView style={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
                            {filteredPosts.map((post) => (
                                <PostCard
                                    key={post._id}
                                    onPress={() => openPostDetails(post)}
                                    title={post.title}
                                    description={post.description}
                                    location={post.location}
                                    currentInvestment={post.currentInvestment}
                                    investmentGoal={post.investmentGoal}
                                    entrepreneur={post.entrepreneur}
                                    category={post.category} createdAt={post.createdAt}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </LinearGradient>
            )}
            {selectedPost && (
                <PostDetails
                    onUserDetails={() => Router.push({ pathname: "/usersProfile", params: {username: selectedPost.entrepreneur}})}
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
