import React, { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    
    return (
        <ToastContext.Provider value={{toast}}>
            {children}
            <ToastContainer/>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};
