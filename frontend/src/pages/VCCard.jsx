import { Link } from "react-router-dom";
import { Globe, MapPin, DollarSign, Zap, ExternalLink, Calendar, Building2 } from "lucide-react";

const VCCard = ({ vc }) => {
    const initials = vc.identity.firm_name
        .split(" ")
        .map(w => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div className="group relative w-full rounded-[2.5rem] border border-border/30 bg-muted/40 backdrop-blur-2xl shadow-2xl transition-all duration-500 hover:border-primary/40 hover:-translate-y-2 overflow-hidden flex flex-col">
            {/* Header: Vibrant Ambient Mesh */}
            <div className="relative h-28 bg-gradient-to-br from-primary/30 via-secondary/10 to-transparent">
                <div className="absolute inset-0 bg-background/20" />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
            </div>

            {/* Body */}
            <div className="relative z-10 px-8 pb-8 flex flex-col flex-1">
                {/* Logo Overlap Container */}  
                <div className="relative -mt-10 mb-6 flex items-end justify-between">
                    <div className="h-20 w-20 rounded-3xl bg-none border border-border/10 shadow-2xl flex items-center justify-center overflow-hidden ring-4 ring-background/50 group-hover:scale-105 transition-transform duration-500">
                        {vc.identity.logo_url ? (
                            <img
                                src={vc.identity.logo_url}
                                alt={vc.identity.firm_name}
                                className="h-full w-full object-contain p-3"
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 text-foreground font-extrabold text-xl tracking-tighter">
                                {initials}
                            </div>
                        )}
                    </div>
                    {vc.investment_criteria.lead_investments && (
                        <div className="px-3 py-1.5 rounded-xl bg-success/10 border border-success/20 text-success text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 mb-1">
                            <Zap size={10} className="fill-success" />
                            Leader
                        </div>
                    )}
                </div>

                {/* Identity */}
                <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="text-2xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                            {vc.identity.firm_name}
                        </h3>
                        {vc.identity.website_url && (
                            <a
                                href={vc.identity.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl bg-foreground/5 border border-foreground/10 text-muted-foreground hover:text-foreground transition-colors mt-1"
                            >
                                <ExternalLink size={14} />
                            </a>
                        )}
                    </div>
                    {vc.identity.founded_year && (
                        <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                            <Calendar size={12} className="text-primary/60" />
                            <span>Since {vc.identity.founded_year}</span>
                        </div>
                    )}
                </div>

                {/* Thesis / Tagline */}
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground font-medium line-clamp-2 italic">
                    {vc.identity.tagline || vc.identity.thesis_summary}
                </p>

                {/* Stats Grid */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-foreground/5 border border-foreground/5 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            <DollarSign size={10} /> Check Size
                        </div>
                        <p className="text-sm font-bold text-foreground truncate">
                            {vc.investment_criteria.check_size?.display_text || "—"}
                        </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-foreground/5 border border-foreground/5 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            <MapPin size={10} /> Focus
                        </div>
                        <p className="text-sm font-bold text-foreground truncate">
                            {vc.investment_criteria.geographies?.[0] || "Global"}
                        </p>
                    </div>
                </div>

                {/* Sector Badges */}
                <div className="mt-6 flex flex-wrap gap-2">
                    {vc.investment_criteria.sectors?.slice(0, 3).map(sector => (
                        <span
                            key={sector}
                            className="px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-tighter"
                        >
                            {sector}
                        </span>
                    ))}
                    {vc.investment_criteria.sectors?.length > 3 && (
                        <span className="px-2.5 py-1 rounded-lg bg-foreground/5 border border-foreground/10 text-[10px] font-bold text-muted-foreground uppercase">
                            +{vc.investment_criteria.sectors.length - 3}
                        </span>
                    )}
                </div>

                {/* CTA */}
                <div className="mt-auto pt-8">
                    <Link
                        to={`/vc/${vc.id}`}
                        className="w-full flex items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-primary/90 transition-all active:scale-[0.98] group/cta"
                    >
                        View Profile
                        <ExternalLink size={16} className="group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VCCard;
