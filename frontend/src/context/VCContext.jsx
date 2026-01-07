import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../libs/api.js";

const VCContext = createContext(null);

export const VCContextProvider = ({ children }) => {
    const { session } = useAuth();

    const [vcs, setVcs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getVCs = async () => {
        if (!session?.access_token) return;

        setLoading(true);
        setError(null);

        try {
            const data = await api.get("/vcs");
            setVcs(data?.data.data || []);
        } catch (err) {
            console.error("Error fetching VCs:", err);
            setError("Failed to load VCs");
        } finally {
            setLoading(false);
        }
    };

    const getVCById = useCallback(async (id) => {
        if (!session?.access_token) return null;

        try {
            const data = await api.get(`/vcs/${id}`);
            return data?.data.data || null;
        } catch (err) {
            console.error("Error fetching VC:", err);
            return null;
        }
    }, [session?.access_token]);

    // Auto-fetch when session is ready
    useEffect(() => {
        getVCs();
    }, [session?.access_token]);

    return (
        <VCContext.Provider
            value={{
                vcs,
                loading,
                error,
                getVCs,
                getVCById,
            }}
        >
            {children}
        </VCContext.Provider>
    );
};

export const useVCContext = () => {
    return useContext(VCContext);
};
