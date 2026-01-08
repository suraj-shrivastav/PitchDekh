import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MapPin, Calendar, Layout, ArrowRight, Activity, Zap, Download } from "lucide-react";
import { api } from "../libs/api";

const PitchCard = ({ company, id, pitch_url }) => {
    const { session } = useAuth();
    const navigate = useNavigate();

    const handleMatchClick = async (pitchId) => {
        try {
            const res = await api.post(`/match/vcs`, {
                pitchId
            })
            const data = await res.data;
            console.log(data);
        } catch (error) {
            console.error("Error fetching match data:", error);
        }
    };

    const handleResearchClick = (pitchId) => {
        navigate(`/pitches/${pitchId}/research`);
    };

    return (
        <div className="group relative flex h-full flex-col rounded-3xl border border-border/50 bg-muted/40 backdrop-blur-2xl shadow-2xl transition-all duration-500 hover:border-primary/30 hover:-translate-y-2 overflow-hidden">
            {/* Ambient Background Glow (Hover) */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Main Content Area */}
            <div className="relative z-10 p-7 space-y-6 flex-grow flex flex-col">
                {/* Header: Badges */}
                <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                        {company.stage}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-success/10 border border-success/20 text-success text-[10px] font-black uppercase tracking-widest">
                        {company.incorporationStatus}
                    </span>
                    {pitch_url && (
                        <a
                            href={pitch_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="p-1.5 rounded-lg bg-muted/50 border border-border/50 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center"
                            title="Download Pitch Deck"
                        >
                            <Download className="w-3.5 h-3.5" />
                        </a>
                    )}
                </div>

                {/* Body Content */}
                <div className="space-y-4">
                    <h3 className="text-xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {company.name}
                    </h3>

                    <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-2 italic">
                        {company.description}
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-tighter">
                            <MapPin className="w-3.5 h-3.5 text-primary/60" />
                            <span className="truncate">{company.hqLocation === "0" ? "Global" : company?.hqLocation}</span>
                        </div>
                        {company.foundedYear > 0 && (
                            <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-tighter">
                                <Calendar className="w-3.5 h-3.5 text-primary/60" />
                                <span>Est. {company.foundedYear}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Vision Box */}
                {company.vision && (
                    <div className="mt-auto pt-6 border-t border-border/50">
                        <div className="flex items-start gap-3 p-4 rounded-2xl bg-foreground/[0.02] border border-border/10">
                            <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-muted-foreground font-medium leading-[1.6] line-clamp-2">
                                “{company.vision}”
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions: Fixed Bottom */}
            <div className="relative z-10 p-7 pt-0 space-y-4">
                <Link
                    to={`/pitches/${id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-all active:scale-[0.98]"
                >
                    View Analysis
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => navigate(`/pitches/${id}/matches`)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-muted/50 border border-border/50 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-all"
                    >
                        <Layout className="w-3 h-3" />
                        Match
                    </button>
                    <button
                        onClick={() => handleResearchClick(id)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-muted/50 border border-border/50 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-all"
                    >
                        <Activity className="w-3 h-3" />
                        Research
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PitchCard;
