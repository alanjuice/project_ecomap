import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Card className="w-full max-w-md text-center shadow-md">
                <CardHeader>
                    <CardTitle className="text-6xl font-bold text-gray-800">404</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-gray-600 mb-6">Oops! Page Not Found</p>
                    <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                        <Link to="/">Go Home</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotFound;
