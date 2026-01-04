import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, LogOut, TrendingUp, Building2, Presentation, ArrowRight } from "lucide-react";

const ProfilePage = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-background text-foreground transition-colors duration-500 overflow-hidden flex flex-col font-sans">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
                <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] opacity-30 animate-pulse delay-1000" />
            </div>
        
            <main className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* PROFILE HEADER */}
                    <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl border border-border/50 bg-muted/40 backdrop-blur-xl transition-all hover:bg-muted/60">
                        <div className="relative group">
                            <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105">
                                {user?.user_metadata?.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-primary" />
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-2xl bg-background border border-border flex items-center justify-center text-success shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="text-center md:text-left space-y-3 flex-grow">
                            <div className="space-y-1">
                                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                                    {user?.user_metadata?.name || "Founder"}
                                </h1>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm font-medium">{user?.email}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <span className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">PRO Member</span>
                            </div>
                        </div>

                        <button
                            onClick={signOut}
                            className="px-6 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-bold text-sm hover:bg-rose-500 hover:text-white transition-all flex items-center gap-2 group"
                        >
                            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Sign Out
                        </button>
                    </div>

                    {/* NAVIGATION CARDS */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* My Pitches */}
                        <div
                            onClick={() => navigate("/pitches")}
                            className="group relative p-8 rounded-3xl border border-border/50 bg-muted/40 hover:bg-muted/60 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Presentation size={120} />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                                    <Presentation size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">My Pitches</h3>
                                <p className="text-muted-foreground font-medium">
                                    Manage your pitch decks, view AI analysis, and track match results.
                                </p>
                                <div className="pt-4 flex items-center gap-2 text-primary font-bold text-sm">
                                    Go to Pitches <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>

                        {/* Browse Investors */}
                        <div
                            onClick={() => navigate("/vcs")}
                            className="group relative p-8 rounded-3xl border border-border/50 bg-muted/40 hover:bg-muted/60 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/30"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Building2 size={120} />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <div className="h-14 w-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 mb-4">
                                    <Building2 size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">Browse Investors</h3>
                                <p className="text-muted-foreground font-medium">
                                    Explore VC profiles, investment thesis, and find potential partners.
                                </p>
                                <div className="pt-4 flex items-center gap-2 text-sky-500 font-bold text-sm">
                                    Find Investors <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
