import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { LogOut, User, Menu, X, LayoutDashboard, Database, Zap, Activity, Sun, Moon, Download, FileText, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [samplesDropdownOpen, setSamplesDropdownOpen] = useState(false);

    // Sample pitches data
    const samplePitches = [
        { name: "AirBnB Sample", file: "AirBnBSample.pdf", description: "Vacation rental platform" },
        { name: "GPT Sample Pitch", file: "GPTSamplePitch.pdf", description: "AI language model" },
        { name: "NeuralBridge Sample", file: "NeuralBridgeSample.pdf", description: "Neural interface technology" },
        { name: "Uber Sample", file: "UberSample.pdf", description: "Ride-sharing platform" },
        { name: "UrbanBite Sample", file: "UrbanBiteSample.pdf", description: "Food delivery service" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        setOpen(false);
        await logout();
        navigate("/login");
    };

    const handleDownload = (fileName) => {
        const link = document.createElement('a');
        link.href = `/sample-pitches/${fileName}`;
        link.download = fileName;
        link.click();
        setSamplesDropdownOpen(false);
    };

    const navLinkClass = ({ isActive }) =>
        `relative px-1 py-2 text-sm font-semibold tracking-tight transition-all duration-300 flex items-center gap-2 ${isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        } group`;

    const activeIndicator = "absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)] scale-x-100 transition-transform duration-300";
    const inactiveIndicator = "absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300";

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
             "bg-background backdrop-blur-xl border-b border-foreground/5 py-3 shadow-2xl shadow-primary/5"
            `}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* BRAND */}
                <Link
                    to="/"
                    className="flex items-center gap-2.5 group transition-transform hover:scale-[1.02]"
                >
                    <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/40 transition-all">
                        <Activity className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-foreground">
                        PITCH<span className="text-primary">DEKH</span>
                    </span>
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-8">
                    {/* Sample Pitches Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setSamplesDropdownOpen(true)}
                        onMouseLeave={() => setSamplesDropdownOpen(false)}
                    >
                        <button className="relative px-3 py-2 text-sm font-semibold tracking-tight transition-all duration-300 flex items-center gap-2 text-muted-foreground hover:text-foreground group">
                            <Download size={18} className="text-slate-500" />
                            <span>Sample Pitches</span>
                            <ChevronDown size={16} className={`transition-transform duration-300 ${samplesDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        <div className={`absolute top-full left-0 mt-2 w-72 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden transition-all duration-300 ${samplesDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                            }`}>
                            <div className="p-3 border-b border-border/50 bg-muted/30">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Download Sample Pitches</p>
                            </div>
                            <div className="p-2 max-h-80 overflow-y-auto">
                                {samplePitches.map((pitch, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleDownload(pitch.file)}
                                        className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all text-left group/item"
                                    >
                                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover/item:bg-blue-500/20 transition-all">
                                            <FileText size={20} className="text-blue-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-foreground truncate">{pitch.name}</p>
                                            <p className="text-xs text-muted-foreground">{pitch.description}</p>
                                        </div>
                                        <Download size={16} className="text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0 mt-2" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {user ? (
                        <>
                            <div className="flex items-center gap-7">
                                <NavLink to="/pitches" className={navLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <LayoutDashboard size={18} className={isActive ? "text-blue-400" : "text-slate-500"} />
                                            <span>Pitches</span>
                                            <span className={isActive ? activeIndicator : inactiveIndicator} />
                                        </>
                                    )}
                                </NavLink>
                                <NavLink to="/vcs" className={navLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <Database size={18} className={isActive ? "text-blue-400" : "text-slate-500"} />
                                            <span>Investors</span>
                                            <span className={isActive ? activeIndicator : inactiveIndicator} />
                                        </>
                                    )}
                                </NavLink>
                                {/* <NavLink to="/matches" className={navLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <Zap size={18} className={isActive ? "text-blue-400" : "text-slate-500"} />
                                            <span>Matches</span>
                                            <span className={isActive ? activeIndicator : inactiveIndicator} />
                                        </>
                                    )}
                                </NavLink> */}
                            </div>

                            <div className="h-4 w-px bg-slate-800/50 mx-2" />

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={toggleTheme}
                                    className="p-2.5 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all"
                                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                                >
                                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                </button>
                                <button
                                    onClick={() => navigate("/profile")}
                                    className="px-4 py-2 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all flex items-center gap-2.5 text-sm font-semibold backdrop-blur-sm"
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User size={14} className="text-primary" />
                                    </div>
                                    Account
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="p-2.5 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-5">
                            <Link
                                to="/login"
                                className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground hover:text-foreground transition-all"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <div className={`fixed inset-0 top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-xl z-40 transition-all duration-500 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}>
                <div className="pt-24 px-6 space-y-8 max-w-sm mx-auto overflow-y-auto max-h-[calc(100vh-6rem)]">
                    {/* Sample Pitches Section - Always Visible */}
                    <div className="space-y-3">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-4">Sample Pitches</p>
                        <div className="grid gap-2">
                            {samplePitches.map((pitch, index) => (
                                <button
                                    key={index}
                                    onClick={() => { handleDownload(pitch.file); setOpen(false); }}
                                    className="flex items-start gap-3 p-4 rounded-2xl bg-muted/40 border border-border/50 text-foreground hover:bg-muted/60 transition-all text-left"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                        <FileText size={20} className="text-blue-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate">{pitch.name}</p>
                                        <p className="text-xs text-muted-foreground">{pitch.description}</p>
                                    </div>
                                    <Download size={16} className="text-muted-foreground flex-shrink-0 mt-2" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {user ? (
                        <>
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-4">Navigation</p>
                                <div className="grid gap-2">
                                    <NavLink to="/pitches" onClick={() => setOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-border/50 text-foreground font-semibold hover:bg-muted/60 transition-all">
                                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                            <LayoutDashboard size={20} className="text-blue-400" />
                                        </div>
                                        Pitches
                                    </NavLink>
                                    <NavLink to="/vcs" onClick={() => setOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-border/50 text-foreground font-semibold hover:bg-muted/60 transition-all">
                                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                            <Database size={20} className="text-blue-400" />
                                        </div>
                                        Investors
                                    </NavLink>
                                    {/* <NavLink to="/matches" onClick={() => setOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-200 font-semibold hover:bg-white/10 transition-all">
                                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                            <Zap size={20} className="text-blue-400" />
                                        </div>
                                        Matches
                                    </NavLink> */}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-4">Account</p>
                                <div className="grid gap-2">
                                    <button
                                        onClick={() => { setOpen(false); navigate("/profile"); }}
                                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-border/50 text-foreground font-semibold hover:bg-muted/60 transition-all text-left"
                                    >
                                        <div className="h-10 w-10 rounded-xl bg-slate-500/10 flex items-center justify-center">
                                            <User size={20} className="text-slate-400" />
                                        </div>
                                        My Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 text-rose-400 font-semibold transition-all text-left"
                                    >
                                        <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                                            <LogOut size={20} />
                                        </div>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="grid gap-4 pt-10">
                            <Link to="/login" onClick={() => setOpen(false)} className="p-5 text-center rounded-2xl bg-muted/40 border border-border/50 text-foreground font-bold hover:bg-muted/60 transition-all">
                                Login
                            </Link>
                            <Link to="/signup" onClick={() => setOpen(false)} className="p-5 text-center rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all">
                                Create Account
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
