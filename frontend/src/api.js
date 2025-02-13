import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/doubts";

export const submitDoubt = async (question) => {
    try {
        const response = await axios.post(`${API_URL}/submit-doubt`, { userId: "123", question });
        return response.data;
    } catch (error) {
        console.error("Error submitting doubt:", error);
        return { error: "Failed to submit doubt" };
    }
};

export const fetchDoubts = async () => {
    try {
        const response = await axios.get(`${API_URL}/all-doubts`);
        return response.data;
    } catch (error) {
        console.error("Error fetching doubts:", error);
        return [];
    }
};
