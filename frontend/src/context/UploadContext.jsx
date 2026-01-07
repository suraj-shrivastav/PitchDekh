import { useState, createContext, useContext, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../libs/supabaseClient";
import { v4 as uuid } from "uuid";
import { api } from "../libs/api";

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
    const { session } = useAuth();

    const [pitches, setPitches] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPitches = useCallback(async () => {
        if (!session?.access_token) return;

        try {
            setLoading(true);
            setError(null);

            const data = await api.get("/pitches/all");

            if (data.success) {
                setPitches(data.data);
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }, [session?.access_token]);

    const fetchPitchData = useCallback(async (id) => {
        if (!session?.access_token) return;

        try {
            const data = await api.get(`/pitches/${id}`);

            if (data.success) {
                return data.data;
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message);
        }
    }, [session?.access_token]);

    const uploadFile = async (file) => {
        if (!file) return;

        const filePath =
            file.name.slice(0, 20) + "_" + uuid().slice(0, 8);

        const { data, error } = await supabase.storage
            .from("user_pitch_decks")
            .upload(filePath, file);

        if (error) {
            setError(error.message);
            return;
        }

        const { data: publicData } = supabase.storage
            .from("user_pitch_decks")
            .getPublicUrl(data.path);

        return publicData.publicUrl;
    };

    const uploadPitch = async (file) => {
        if (!session?.access_token) return;

        try {
            setLoading(true);
            setError(null);

            const fileUrl = await uploadFile(file);

            const data = await api.post("/pitches", {
                fileUrl,
            });

            if (data.success) {
                await fetchPitches();
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const uploadVCLink = async (vcLink) => {
        try {
            setLoading(true);
            setError(null);

            return await api.post("/vcs/extract", {
                url: vcLink,
            });
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <UploadContext.Provider
            value={{
                pitches,
                loading,
                error,
                fetchPitches,
                fetchPitchData,
                uploadPitch,
                uploadVCLink,
                file,
                setFile,
                uploadFile,
            }}
        >
            {children}
        </UploadContext.Provider>
    );
};

export const useUpload = () => useContext(UploadContext);
