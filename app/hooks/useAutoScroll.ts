import { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';

const useAutoScroll = (dependencies: any[]) => {
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (scrollViewRef.current) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, dependencies);

    return scrollViewRef;
};

export default useAutoScroll;
