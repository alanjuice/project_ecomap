import { Card, CardContent } from "./ui/card";

const ImageCard = ({ imageUrl }) => {
  return (
    <div className="flex justify-center mb-8">
      <Card className="w-full max-w-md rounded-xl shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <img
            src={imageUrl || "https://placehold.co/400"}
            alt="Spotted Animal"
            className="w-full h-80 object-cover"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageCard;
