import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getCount } from "../../api";
import LoadingIcon from "../../components/LoadingIcon";
import Error from "../../components/Error";

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
            {/* Hero Section */}

            <section
                id="hero"
                className="min-h-[70vh] bg-neutral-900 flex items-center justify-center relative overflow-hidden"
            >
                <div className="absolute inset-0 z-0">
                    <div className="bg-gradient-to-br from-neutral-900/95 to-neutral-800/90 absolute inset-0 z-10"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')] bg-cover bg-center"></div>
                </div>

                <div className="container mx-auto px-4 py-20 pt-32 lg:py-32 relative z-10 flex items-center justify-center">
                    <motion.div
                        className="flex flex-col md:flex-row items-center justify-center text-center md:text-left"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div
                            className="md:w-2/3 lg:w-1/2 mx-auto mb-10 md:mb-0"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Map Your{" "}
                                <span className="text-[#2E7D32]">Eco</span>
                                system Through{" "}
                                <span className="text-[#1565C0]">
                                    Citizen Science
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-300 mb-8">
                                Join thousands of nature enthusiasts in
                                documenting biodiversity around you. Spot
                                species, contribute data, and help create
                                detailed ecological hotspot maps.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}

            <section id="about" className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <motion.div
                            className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { x: -50, opacity: 0 },
                                visible: {
                                    x: 0,
                                    opacity: 1,
                                    transition: { duration: 0.8 },
                                },
                            }}
                        >
                            <div className="relative m-2">
                                <div className="relative z-10 bg-neutral-100 p-6 rounded-lg shadow-lg">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <div className="text-[#2E7D32] mb-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-10 w-10"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="font-bold text-xl">
                                                {countData.data.User || "-"}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                Active Citizens
                                            </p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <div className="text-[#1565C0] mb-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-10 w-10"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="font-bold text-xl">
                                                {countData.data.species || "-"}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                Species Tracked
                                            </p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <div className="text-[#FF8F00] mb-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-10 w-10"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="font-bold text-xl">
                                                {countData.data.occurrence ||
                                                    "-"}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                Animals Spotted
                                            </p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <div className="text-[#2E7D32] mb-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-10 w-10"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="font-bold text-xl">
                                                {countData.data.expert || "-"}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                Active Experts
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="md:w-1/2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { x: 50, opacity: 0 },
                                visible: {
                                    x: 0,
                                    opacity: 1,
                                    transition: { duration: 0.8 },
                                },
                            }}
                        >
                            <div className="inline-block mb-4 px-4 py-1 bg-[#2E7D32]/10 text-[#2E7D32] font-semibold rounded-full">
                                About EcoMap
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-800">
                                Citizen Science for
                                <br />
                                Biodiversity Mapping
                            </h2>

                            <div className="space-y-6 text-neutral-600">
                                <p className="text-lg">
                                    EcoMap is a crowd-sourced platform that
                                    harnesses the power of community
                                    observations to track and monitor
                                    biodiversity across the globe.
                                </p>

                                <div className="flex items-start space-x-3">
                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-bold">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-800">
                                            Community-Powered Data
                                        </h3>
                                        <p>
                                            Anyone can contribute valuable
                                            ecological data through simple
                                            species sightings - from casual
                                            nature enthusiasts to professional
                                            biologists.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#1565C0] flex items-center justify-center text-white font-bold">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-800">
                                            Expert Based Identification
                                        </h3>
                                        <p>
                                            Specialized experts help identify
                                            species from photos, making
                                            scientific contribution accessible
                                            to everyone regardless of expertise.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#FF8F00] flex items-center justify-center text-white font-bold">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-800">
                                            Hotspot Visualization
                                        </h3>
                                        <p>
                                            Collected data creates detailed
                                            density maps showing biodiversity
                                            hotspots, migration patterns, and
                                            species distribution changes over
                                            time.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section
                id="how-it-works"
                className="py-16 md:py-24 bg-neutral-100"
            >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-block mb-4 px-4 py-1 bg-[#1565C0]/10 text-[#1565C0] font-semibold rounded-full">
                            Simple Process
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-800">
                            How EcoMap Works
                        </h2>
                        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                            Our platform makes it easy for anyone to contribute
                            to environmental science and conservation. Follow
                            these simple steps to become a citizen scientist.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { y: 50, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: 0.6 },
                                },
                            }}
                        >
                            <div className="bg-[#2E7D32]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-[#2E7D32]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-neutral-800">
                                1. Spot & Photograph
                            </h3>
                            <p className="text-neutral-600 mb-4">
                                When you encounter wildlife or interesting plant
                                species, use the EcoMap app to take a photo. Our
                                system works with any quality of photo, from
                                smartphone snapshots to professional cameras.
                            </p>
                            <ul className="text-sm text-neutral-500 space-y-2">
                                <li className="flex items-start">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-[#2E7D32] mr-2 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Record location automatically via GPS
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-[#2E7D32] mr-2 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Add notes about behavior or conditions
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-[#2E7D32] mr-2 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Works offline in remote areas
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { y: 50, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: 0.6, delay: 0.2 },
                                },
                            }}
                        >
                            <div className="bg-[#1565C0]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-[#1565C0]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-neutral-800">
                                2. Expert Identification
                            </h3>
                            <p className="text-neutral-600 mb-4">
                                Experts analyze your photo and correctly
                                identify the species for you.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { y: 50, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: 0.6, delay: 0.4 },
                                },
                            }}
                        >
                            <div className="bg-[#FF8F00]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-[#FF8F00]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-neutral-800">
                                3. Map & Analyze
                            </h3>
                            <p className="text-neutral-600 mb-4">
                                Your contributions are immediately added to our
                                global database, creating real-time density maps
                                that track biodiversity hotspots and help
                                identify trends in species distribution.
                            </p>
                            <ul className="text-sm text-neutral-500 space-y-2">
                                <li className="flex items-start">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-[#FF8F00] mr-2 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Visualize population densities
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-[#FF8F00] mr-2 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Track seasonal movements
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-[#FF8F00] mr-2 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Aid conservation planning
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
