import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Ban } from "lucide-react";

const NoResourceFound = ({ resource }) => {
    return (
        <div className="flex items-center justify-center h-full w-full p-4">
            <div className="flex flex-col items-center justify-center text-center">
                <Alert variant="destructive" className="max-w-md">
                    <Ban className="h-6 w-6 text-red-500 mx-auto" />
                    <AlertTitle className="mt-2">No {resource} Found</AlertTitle>
                    <AlertDescription>
                        It looks like there are no {resource.toLowerCase()} available at the moment.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
};

export default NoResourceFound;