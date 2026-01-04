import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../libs/supabaseClient";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setData = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();
            if (error) throw error;
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        };

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        setData();

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const signUp = async (data) => {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });

        if (authError) return { data: authData, error: authError };

        // const { data: userData, error: userError } = await supabase
        //     .from("users")
        //     .insert(
        //         {
        //             id: authData.user.id,
        //             name: data.name,
        //             email: data.email,
        //             password: data.password,
        //         },
        //     )
        //     .select()
        //     .single();

        return { data: { ...authData, profile: null }, error: authError };
    };

    const signIn = async (data) => {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword(data);
        console.log(authData);
        return { data: { ...authData, profile: null }, error: authError };
    };

    const logout = async () => {
        return await supabase.auth.signOut();
    };

    const value = {
        signIn,
        logout,
        signUp,
        user,
        session,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
