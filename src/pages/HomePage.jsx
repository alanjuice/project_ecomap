import { motion } from "framer-motion";
import ColouredCard from "../components/ColouredCard";
import IntroVideo from "../assets/videoplayback.webm";
import { useQuery } from "@tanstack/react-query";
import { getCount } from "../api";
import LoadingIcon from "../components/LoadingIcon";
import Error from "../components/Error";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const steps = [
    {
        title: "Log Your Sighting",
        description:
            "Users can log their sightings of animals through the platform by uploading images and details.",
        image: "https://placehold.co/150?text=1",
    },
    {
        title: "Validation",
        description:
            "Experts validate the sightings, ensuring accurate identification and reliable biodiversity data.",
        image: "https://placehold.co/150?text=2",
    },
    {
        title: "Data Storage",
        description:
            "The validated observations are stored in a central database, ready for further analysis.",
        image: "https://placehold.co/150?text=3",
    },
    {
        title: "Interactive Density Map",
        description:
            "The collected data is visualized on an interactive map, showcasing insights into biodiversity hotspots and patterns.",
        image: "https://placehold.co/150?text=4",
    },
];

const HomePage = () => {
    const {
        data: countData,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["getcount"],
        queryFn: getCount,
    });

    if (isError) {
        return <Error message={error.message} />;
    }

    if (isLoading) {
        return <LoadingIcon />;
    }
    return (
        <>
            {/* Video Section with Fade-in Animation */}
            <motion.div
                className="bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                <video
                    src={IntroVideo}
                    autoPlay
                    muted
                    loop
                    className="md:w-3/4 w-full h-auto max-h-[500px] sm:max-h-[700px] mx-auto"
                >
                    Your browser does not support the video tag.
                </video>
            </motion.div>

            {/* Introduction Section with Animation */}
            <motion.div
                className="bg-green-100 p-8 text-center"
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
            >
                <h1 className="text-4xl font-bold text-green-700 mb-4">
                    What is Ecomap?
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                    Ecomap is an innovative platform that empowers citizens to
                    track and contribute to the mapping of biodiversity across
                    India. By leveraging community data, it brings together
                    individuals to create a comprehensive ecological map of
                    species and their habitats.
                </p>
            </motion.div>

            {/* Statistics Section with Animated Cards */}
            <motion.div
                className="bg-white py-8"
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
            >
                <div className="container flex justify-evenly sm:flex-row flex-col">
                    {[
                        {
                            title: "Species",
                            value: countData.data.species,
                            color: "lightblue",
                        },
                        {
                            title: "Occurences",
                            value: countData.data.occurrence,
                            color: "lightgreen",
                        },
                        {
                            title: "Users",
                            value: countData.data.User,
                            color: "red",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="sm:w-1/4 m-3"
                        >
                            <ColouredCard
                                title={item.title}
                                value={item.value}
                                color={item.color}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="bg-green-50 p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
                    How It Works
                </h2>

                <div className="flex flex-col items-center space-y-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col md:flex-row items-center md:space-x-6 text-center md:text-left w-full max-w-4xl p-4 bg-white shadow-md rounded-lg"
                            variants={fadeIn}
                        >
                            <img
                                src={step.image}
                                alt={step.title}
                                className="w-32 h-32 object-cover rounded-lg shadow-md m-6 md:m-0"
                            />
                            <div className="md:w-2/3">
                                <h3 className="text-xl font-semibold text-green-800 m-6 md:m-0">
                                    {step.title}
                                </h3>
                                <p className="text-gray-700 mt-2 m-6 md:m-0">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default HomePage;
