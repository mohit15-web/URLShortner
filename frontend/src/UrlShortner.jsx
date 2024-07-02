import { useState } from "react";
import BorderBeam from "./components/magicui/border-beam.jsx";

export function BorderBeamDemo() {
    const [text, setText] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");

    const callApi = async () => {
        setError("");
        setShortUrl("");
        try {
            const res = await fetch(`http://localhost:8000/shorten`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: text }), // Include the URL in the request body
            });
            if (!res.ok) {
                throw new Error("Invalid URL");
            }
            const data = await res.json();
            setShortUrl(data.message);
            
        } catch (error) {
            console.error("Error:", error);
            setError("Invalid URL");
            return null;
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl).then(() => {
            alert("Copied to clipboard!");
        });
    };

    return (
        <div className="relative rounded-xl">
            <div className="flex flex-col p-10">
                <h1 className="text-4xl font-bold mb-6 text-center text-white tracking-wider">
                    URL Shortener
                </h1>
                <div className="flex gap-4 justify-center items-center p-6 rounded-lg shadow-md">
                    <input
                        type="text"
                        placeholder="Enter URL"
                        className="p-3 bg-transparent rounded-xl border text-white"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <h3
                        className="p-3 border text-white px-6 rounded-lg cursor-pointer"
                        onClick={callApi}
                    >
                        Shorten
                    </h3>
                </div>
                {error && <p className="text-center text-red-500 mt-4">{error}</p>}
                {shortUrl && (
                    <div className="text-center text-white mt-4">
                        <p className="text-2xl text-blue-400">{shortUrl}</p>
                        <button
                            className="px-8 py-2 mt-5 border text-white"
                            onClick={handleCopy}
                        >
                            Copy
                        </button>
                    </div>
                )}
            </div>

            <BorderBeam size={250} duration={12} delay={9} />
        </div>
    );
}
