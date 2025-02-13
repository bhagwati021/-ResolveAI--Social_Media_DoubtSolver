import { useState, useEffect } from "react";
import { submitDoubt, fetchDoubts } from "./api";

function Home() {
    const [question, setQuestion] = useState("");
    const [doubts, setDoubts] = useState([]);

    useEffect(() => {
        async function loadDoubts() {
            const data = await fetchDoubts();
            setDoubts(data);
        }
        loadDoubts();
    }, []);

    const handleSubmit = async () => {
        if (!question.trim()) return;
        const response = await submitDoubt(question);
        if (!response.error) {
            setDoubts([{ question, answer: "Processing..." }, ...doubts]);
            setQuestion("");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
                    🤔 Doubt Classifier
                </h1>
                
                {/* Input Box */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your doubt..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Submit
                    </button>
                </div>

                {/* Recent Doubts Section */}
                <h2 className="text-lg font-semibold mt-6 text-gray-700">📌 Recent Doubts</h2>
                <ul className="mt-3 space-y-3">
                    {doubts.length === 0 ? (
                        <p className="text-gray-500">No doubts yet. Ask one!</p>
                    ) : (
                        doubts.map((doubt, index) => (
                            <li
                                key={index}
                                className="bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200"
                            >
                                <strong className="text-gray-800">Q:</strong> {doubt.question} <br />
                                <strong className="text-blue-500">A:</strong> {doubt.answer || "Processing..."}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Home;