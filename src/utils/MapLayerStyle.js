const heatmapLayerStyle = {
    id: "species_heat",
    type: "heatmap",
    source: "species_locations",
    maxzoom: 12,
    paint: {
        "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],

        "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33,102,172,0)",
            0.2,
            "rgb(103,169,207)",
            0.4,
            "rgb(209,229,240)",
            0.6,
            "rgb(253,219,199)",
            0.8,
            "rgb(239,138,98)",
            1,
            "rgb(178,24,43)",
        ],

        "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],

        "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
    },
};

const pointLayerStyle = {
    id: "species-point",
    type: "circle",
    source: "species_locations",
    minzoom: 12,
    paint: {
        "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "mag"],
            1,
            "rgba(33,102,172,0)",
            2,
            "rgb(103,169,207)",
            3,
            "rgb(209,229,240)",
            4,
            "rgb(253,219,199)",
            5,
            "rgb(239,138,98)",
            6,
            "rgb(178,24,43)",
        ],
        "circle-stroke-color": "white",
        "circle-stroke-width": 1,
        // Transition from heatmap to circle layer by zoom level
        "circle-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 8, 1],
    },
};

export { pointLayerStyle, heatmapLayerStyle };
