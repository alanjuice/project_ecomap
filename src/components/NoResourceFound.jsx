import { Alert, AlertTitle } from "@/components/ui/alert";

const NoResourceFound = ({ resource }) => {
    return (
        <div className="flex items-center justify-center h-full w-full p-4">
            <div className="flex flex-col items-center justify-center text-center">
                <Alert variant="destructive" className="max-w-md">
                    <AlertTitle className="mt-2">No {resource} Found</AlertTitle>
                </Alert>
            </div>
        </div>
    );
};

export default NoResourceFound;