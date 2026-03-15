import {useEffect, useState} from "react";

const useYearsSince = (startDate: Date) => {
    const [years, setYears] = useState(0);

    useEffect(() => {
        const calculateYears = () => {
            const today = new Date();
            const dateUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
            const diffInMilliseconds = todayUTC - dateUTC;
            return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.2425));
        };

        setYears(calculateYears());
    }, [startDate]);

    return [years];
};

export default useYearsSince;