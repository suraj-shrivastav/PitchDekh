import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MapPin, Calendar, Layout, ArrowRight, Activity, Zap, Download } from "lucide-react";
import { api } from "../libs/api";

const PitchCard = ({ company, id, pitch_url }) => {
    const { session } = useAuth();
    const navigate = useNavigate();

    const handleResearchClick = (pitchId) => {
        navigate(`/pitches/${pitchId}/research`);
    };

    return (
        <div className="group flex h-full flex-col card-paper overflow-hidden glide-lift">

            {/* Main Content */}
            <div className="p-7 space-y-6 flex-grow flex flex-col">
                {/* Header: Badges */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="pill text-foreground uppercase tracking-wide text-[10px]">
                            {company.stage}
                        </span>
                        <span className="pill text-success uppercase tracking-wide text-[10px]" style={{ borderColor: "color-mix(in srgb, var(--success) 35%, transparent)" }}>
                            {company.incorporationStatus}
                        </span>
                    </div>
                    {pitch_url && (
                        <a
                            href={pitch_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="h-8 w-8 rounded-full border border-foreground/15 text-muted-foreground hover:bg-foreground hover:text-background flex items-center justify-center flex-none transition-colors"
                            title="Download Pitch Deck"
                        >
                            <Download className="w-3.5 h-3.5" />
                        </a>
                    )}
                </div>

                {/* Body */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">
                        {company.name}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {company.description}
                    </p>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                            <MapPin className="w-3.5 h-3.5 text-secondary" />
                            <span className="truncate">{company.hqLocation === "0" ? "Global" : company?.hqLocation}</span>
                        </div>
                        {company.foundedYear > 0 && (
                            <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                                <Calendar className="w-3.5 h-3.5 text-secondary" />
                                <span>Est. {company.foundedYear}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Vision */}
                {company.vision && (
                    <div className="mt-auto pt-5 border-t border-border">
                        <div className="flex items-start gap-3 p-4 rounded-2xl bg-background">
                            <Zap className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                “{company.vision}”
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="p-7 pt-0 space-y-3">
                <Link
                    to={`/pitches/${id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
                >
                    View Analysis
                    <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => navigate(`/pitches/${id}/matches`)}
                        className="flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground transition-colors"
                    >
                        <Layout className="w-3.5 h-3.5" />
                        Match
                    </button>
                    <button
                        onClick={() => handleResearchClick(id)}
                        className="flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground transition-colors"
                    >
                        <Activity className="w-3.5 h-3.5" />
                        Research
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PitchCard;
