import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 1000,
});

const loginExpert = async (loginData) => {
    return instance.post("expert/login", loginData);
};

const registerExpert = async (registerData) => {
    const response = await instance.post("expert/register", registerData);
    console.log(response);
    return response;
};

const getSpeciesDatabyID = async (id) => {
    console.log(id);
    const response = await instance.get(`expert/species/${id}`);
    console.log(response);
    return response;
};

const getSpecies = async () => {
    return await instance.get(`expert/get-species`);
};

const addSpecies = async (speciesData) => {
    const response = await instance.post("expert/add-species", speciesData);
    console.log(response);
    return response;
};

export {
    loginExpert,
    registerExpert,
    getSpeciesDatabyID,
    addSpecies,
    getSpecies,
};
