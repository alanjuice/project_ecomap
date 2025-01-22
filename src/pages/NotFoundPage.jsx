import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">Oops! Page Not Found</p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
