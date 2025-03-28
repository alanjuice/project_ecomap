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
    return config;
});

const loginExpert = async (loginData) => {
    return await instance.post("expert/login", loginData);
};

const loginAdmin = async (loginData) => {
    return await instance.post("admin/login", loginData);
};

const registerExpert = async (registerData) => {
    return await instance.post("expert/register", registerData);
};

const getSpottings = async (filter) => {
    return await instance.get("expert/get-list-upload", {
        params: { sortBy: "recent", ...filter },
    });
};

const registerUser = async (registerData) => {
    return await instance.post("user/register", registerData);
};

const getSpeciesDatabyID = async (id) => {
    return await instance.get(`expert/species/${id}`);
};

const getSpecies = async (filter) => {
    if (filter)
        return await instance.get(`expert/get-species`, {
            params: { sortBy: "asc", ...filter },
        });
    else
        return await instance.get(`expert/get-species`, {
            params: { sortBy: "asc" },
        });
};

const getSpeciesbyId = async (id) => {
    return await instance.get(`expert/get-species/${id}`);
};

const getOccurencebyId = async (id) => {
    return await instance.get(`expert/get-occurance/${id}`);
};

const getOccurence = async (filter) => {
    return await instance.get("expert/get-occurance", {
        params: { sortBy: "recent", ...filter },
    });
};

const getExperts = async () => {
    const response = await instance.get("admin/experts");
    return response.data;
};

const getUsers = async () => {
    const response = await instance.get("admin/users");
    return response.data;
};

const addSpecies = async (speciesData) => {
    console.log(speciesData);
    const response = await instance.post("expert/add-species", speciesData);
    return response;
};

const getSpottingById = async (id) => {
    return await instance.get("expert/get-upload/" + id);
};

const getMapData = async (id) => {
    return await instance.get("expert/species-map/" + id);
};

const getCount = async (id) => {
    return await instance.get("expert/count");
};

const identifySpecies = async (data) => {
    return await instance.post("expert/save-upload", data);
};

const rejectSpotting = async (data) => {
    return await instance.post("expert/reject-upload", data);
};

const getSpeciesAdmin = async () => {
    return await instance.get("admin/species");
};

const addSpeciesAdmin = async (speciesData) => {
    console.log(speciesData);
    const response = await instance.post("admin/add-species", speciesData);
    return response;
};

const getExpertDetails = async () => {
    return await instance.get("expert/get-expert");
};

const getExpertOccurences = async () => {
    return await instance.get("expert/get-expert-occurrences");
};

const getPendingUsers = async () => {
    const s = await instance.get("admin/pending-users");
    return s.data;
};

const approveUser = async (id) => {
    return await instance.put("admin/user/" + id + "/approve");
};

const updateOccurence = async (id, data) => {
    const d = { speciesId: data };
    return await instance.put("expert/occurrence/" + id, d);
};

const rejectUser = async (id) => {
    return await instance.put("admin/user/" + id + "/reject");
};

const updateExpertDetails = async (data) => {
    return await instance.put("expert/update-expert", data);
};

const deleteSpecies = async (id, data) => {
    return await instance.delete("admin/species/" + id, data);
};

const deleteOccurrence = async (id) => {
    return await instance.delete("expert/occurrence/" + id);
};

const deleteUser = async (id, data) => {
    return await instance.delete("admin/user/" + id, data);
};

const deleteExpert = async (id, data) => {
    return await instance.delete("admin/expert/" + id, data);
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
    updateOccurence,
    getExperts,
    getUsers,
    getCount,
    deleteSpecies,
    getMapData,
    getSpeciesAdmin,
    rejectSpotting,
    getExpertDetails,
    deleteExpert,
    deleteUser,
    addSpeciesAdmin,
    getExpertOccurences,
    updateExpertDetails,
    getPendingUsers,
    approveUser,
    deleteOccurrence,
    rejectUser,
};
