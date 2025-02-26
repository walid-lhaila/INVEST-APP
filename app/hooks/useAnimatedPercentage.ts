import { useState, useEffect } from 'react';

const useAnimatedPercentage = (targetPercentage: number, duration: number = 30) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimatedPercentage((prev) => {
                if (prev >= targetPercentage) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, duration);

        return () => clearInterval(interval);
    }, [targetPercentage, duration]);

    return animatedPercentage;
};

export default useAnimatedPercentage;
