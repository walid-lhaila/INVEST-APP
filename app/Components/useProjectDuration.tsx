const useProjectDuration = () => {
    const duration = (start: string | Date, end: string | Date) => {
        const startDate = new Date(start);
        const endDate = new Date(end);

        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        if (years > 0 && months > 0) {
            return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
        } else if (years > 0) {
            return `${years} year${years !== 1 ? 's' : ''}`;
        } else {
            return `${months} month${months !== 1 ? 's' : ''}`;
        }
    };

    return {duration};
};

export default useProjectDuration;
