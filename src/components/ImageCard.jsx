import { Card, CardContent } from "./ui/card";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { X } from "lucide-react"; 

const ImageCard = ({ imageUrl, altText = "Alt" }) => {

  return (
    <div className="flex justify-center mb-8">
      <Card className="w-full max-w-md rounded-xl shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <Zoom IconUnzoom={X} classDialog="custom-zoom" className="custom-zoom">
            <img
              src={ imageUrl || "https://placehold.co/400"}
              alt={altText}
              className="w-full h-80 object-cover cursor-pointer"
              loading="lazy"
            />
          </Zoom>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageCard;

