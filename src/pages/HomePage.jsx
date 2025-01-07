import ColouredCard from "../components/ColouredCard";

const HomePage = () => {
    return (
        <>
            {/* Introduction Section */}
            <div className="bg-green-100 p-8 text-center">
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
            </div>

            {/* Statistics Section */}
            <div className="bg-white py-8">
                <div className="container flex justify-evenly sm:flex-row flex-col">
                    <ColouredCard title={"Species"} value={20000} color="green-500" extraStyle={"sm:w-1/4 m-3"} />
                    <ColouredCard title={"Observations"} value={20000} color="green-500" extraStyle={"sm:w-1/4 m-3"} />
                    <ColouredCard title={"Users"} value={1200} color="green-500" extraStyle={"sm:w-1/4 m-3"}/>
                </div>
            </div>

            {/* Recent Observations Section */}
            <div className="bg-gray-100 p-8">
                <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
                    Recent Observations
                </h2>
            </div>

            {/* How it Works Section */}
            <div className="bg-green-50 p-8">
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
            </div>
        </>
    );
};

export default HomePage;
