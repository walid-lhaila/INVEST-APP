import { useMemo } from "react";

const useFilteredPosts = (posts, filter, searchQuery) => {
    return useMemo(() => {
        let filtered = posts;

        if (filter) {
            switch (filter) {
                case 'investmentGoal-desc':
                    filtered = [...posts].sort((x, y) => y.investmentGoal - x.investmentGoal);
                    break;
                case 'title':
                    filtered = [...posts].sort((x, y) => x.title.localeCompare(y.title));
                    break;
                case 'date':
                    filtered = [...posts].sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt));
                    break;
                default:
                    break;
            }
        }

        if (searchQuery) {
            filtered = filtered.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    }, [posts, filter, searchQuery]);
};

export default useFilteredPosts;
