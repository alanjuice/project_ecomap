import React, { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    
    return (
        <ToastContext.Provider value={{toast}}>
            {children}
            <ToastContainer limit={1} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};
