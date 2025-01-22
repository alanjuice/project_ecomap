import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 10000,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") || null;
    if (token) {
        config.headers["x-authtoken"] = token;
    }
    console.log(config);
    return config;
});

const loginExpert = async (loginData) => {
    return instance.post("expert/login", loginData);
};

const registerExpert = async (registerData) => {
    const response = await instance.post("expert/register", registerData);
    return response;
};

const getSpottings = async () => {
    return await instance.get("expert/get-list-upload");
};

const registerUser = async (registerData) => {
    return await instance.post("user/register", registerData);
};

const getSpeciesDatabyID = async (id) => {
    const response = await instance.get(`expert/species/${id}`);
    return response;
};

const getSpecies = async () => {
    return await instance.get(`expert/get-species`);
};


const getSpeciesbyId = async (id) => {
    return await instance.get(`expert/get-species-byid/${id}`);
};

const getOccurencebyId = async (id) => {
    return await instance.get(`expert/get-occurance/${id}`);
};

const getOccurence = async () => {
    return await instance.get("expert/get-occurance");
};

const addSpecies = async (speciesData) => {
    const response = await instance.post("expert/add-species", speciesData);
    console.log(response);
    return response;
};

const getSpottingById = async (id) => {
    return await instance.get("expert/get-upload-byid/" + id);
};

const identifySpecies = async (data) => {
    return await instance.post("expert/save-occurance",data);
};

export {
    loginExpert,
    registerExpert,
    getSpeciesDatabyID,
    addSpecies,
    getSpecies,
    getSpottings,
    registerUser,
    getSpottingById,
    identifySpecies,
    getOccurence,
    getSpeciesbyId,
    getOccurencebyId
};
