import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signUp, session } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            navigate("/");
        }
    }, [session, navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        const { error } = await signUp({ name, email, password });
        if (error) {
            alert(error.message);
        } else {
            alert("Check your email for confirmation!");
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 transition-colors duration-500">
            <div className="w-full max-w-md rounded-2xl border border-border/50 bg-muted/40 backdrop-blur p-8 shadow-xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">
                        Create your account
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Analyze your pitch deck & find the right investors.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSignup} className="space-y-5">
                    <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-2 w-full rounded-lg bg-muted border border-border/50
                         px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50
                         focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@startup.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-2 w-full rounded-lg bg-muted border border-border/50
                         px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50
                         focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-2 w-full rounded-lg bg-muted border border-border/50
                         px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50
                         focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    {/* Primary CTA */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white
                       hover:bg-primary/90 transition"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-primary hover:text-primary/80 font-medium"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
