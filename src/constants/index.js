const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const hotItWorksSteps = [
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

export {
    fadeIn,hotItWorksSteps
}