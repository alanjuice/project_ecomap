import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 1000,
});

console.log(import.meta.env.VITE_SERVER_URL);

instance.interceptors.response.use(
    function (response) {
        return { success: true, data: response.data };
    },
    function (error) {
        return { success: false, data: error.response.data };
    }
);

const loginExpert = async (loginData) => {
    const response = await instance.post("expert/login", loginData);
    console.log(response);
    return response;
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
    const response = await instance.get(`expert/get-species`);
    console.log(response);
    return response;
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
