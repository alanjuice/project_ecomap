import { Link } from "react-router-dom";

const Error = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">Error</h1>
            <p className="text-xl text-gray-600 mb-6">{message}</p>
        </div>
    );
};

export default Error;
