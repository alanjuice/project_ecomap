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

const loginAdmin = async (loginData) => {
    return instance.post("admin/login", loginData);
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

const deleteSpecies = async (id) => {
    const response = await instance.post(`expert/delete-species/${id}`);
    return response;
};

const getSpecies = async (filter) => {
    return await instance.get(`expert/get-species`, { params: filter });
};

const getSpeciesbyId = async (id) => {
    return await instance.get(`expert/get-species-byid/${id}`);
};

const getOccurencebyId = async (id) => {
    const data = await instance.get(`expert/get-occurance/${id}`);
    console.log(data);
    return data;
};

const getOccurence = async (filter) => {
    console.log(filter);
    const response = await instance.get("expert/get-occurance", {
        params: filter,
    });
    return response;
};

const getExperts = async () => {
    const response = await instance.get("admin/experts");
    console.log(response);
    return response.data;
};

const getUsers = async () => {
    const response = await instance.get("admin/users");
    console.log(response);
    return response.data;
};

const addSpecies = async (speciesData) => {
    const response = await instance.post("expert/add-species", speciesData, {});
    console.log(response);
    return response;
};

const getSpottingById = async (id) => {
    return await instance.get("expert/get-upload-byid/" + id);
};

const getMapData = async (id) => {
    return await instance.get("expert/species-map/" + id);
};

const getCount = async (id) => {
    return await instance.get("expert/count");
};

const identifySpecies = async (data) => {
    return await instance.post("expert/save-occurance", data);
};
const filterOccurence = async (filter) => {
    return await instance.get("expert/filter-occurrences");
};

const filterSpecies = async (filter) => {
    return await instance.get("expert/filter-species");
};

export {
    loginAdmin,
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
    getOccurencebyId,
    getExperts,
    getUsers,
    getCount,
    deleteSpecies,
    getMapData,
};
