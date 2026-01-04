import { useState, createContext, useContext, useCallback } from "react";
import { useAuth } from "./AuthContext";

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

            const response = await fetch("http://localhost:8000/pitches/all", {
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch pitches");
            }

            const result = await response.json();
            console.log(result.data);
            if (result.success) {
                setPitches(result.data);
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [session?.access_token]);

    const fetchPitchData = useCallback(async (id) => {
        try {
            // const pitchUrl = `http://localhost:8000/pitches/${id}`;
            // console.log(pitchUrl);

            const response = await fetch(`http://localhost:8000/pitches/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch pitch data");
            }

            const result = await response.json();
            console.log(result.data);
            if (result.success) {
                return result.data;
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    }, [session?.access_token]);

    const uploadPitch = async (formData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("http://localhost:8000/pitches", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            if (data.success) {
                await fetchPitches(); // refresh list
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const uploadVCLink = async (vcLink) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("http://localhost:8000/vcs/extract", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.access_token}`,
                },
                body: JSON.stringify({ url: vcLink }),
            });

            if (!response.ok) {
                throw new Error("VC extraction failed");
            }

            return await response.json();
        } catch (err) {
            setError(err.message);
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
            }}
        >
            {children}
        </UploadContext.Provider>
    );
};

export const useUpload = () => useContext(UploadContext);
