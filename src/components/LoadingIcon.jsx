import { LoaderCircle } from "lucide-react";

const LoadingIcon = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full bg-gray-50">
            <LoaderCircle className="h-12 w-12 text-blue-500 animate-spin" />
        </div>
    );
};

export default LoadingIcon;
