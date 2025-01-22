import { motion } from "framer-motion";
import ColouredCard from "../components/ColouredCard";
import IntroVideo from "../assets/videoplayback.webm";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const HomePage = () => {
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
                        { title: "Species", value: 20000, color: "lightblue" },
                        {
                            title: "Observations",
                            value: 20000,
                            color: "lightgreen",
                        },
                        { title: "Users", value: 1200, color: "red" },
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

            {/* How it Works Section */}
            <motion.div
                className="bg-green-50 p-8"
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
                    How it works
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-4">
                    Users can log their sightings of animals and plants through
                    the platform. These observations are then validated and
                    added to a central database.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    The collected data is visualized on an interactive map,
                    showcasing real-time insights into biodiversity hotspots and
                    patterns.
                </p>
            </motion.div>
        </>
    );
};

export default HomePage;
