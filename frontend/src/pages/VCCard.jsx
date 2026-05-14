import { Link } from "react-router-dom";
import { MapPin, DollarSign, Zap, ExternalLink, Calendar } from "lucide-react";

const VCCard = ({ vc }) => {
    const initials = vc.identity.firm_name
        .split(" ")
        .map(w => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div className="group w-full card-soft p-7 flex flex-col glide-lift">

            {/* Top: logo + leader pill */}
            <div className="flex items-start justify-between">
                <div className="h-16 w-16 rounded-3xl bg-background border border-border flex items-center justify-center overflow-hidden flex-none">
                    {vc.identity.logo_url ? (
                        <img
                            src={vc.identity.logo_url}
                            alt={vc.identity.firm_name}
                            className="h-full w-full object-contain p-2.5"
                        />
                    ) : (
                        <span className="text-foreground font-semibold text-lg">{initials}</span>
                    )}
                </div>
                {vc.investment_criteria.lead_investments && (
                    <span className="pill text-success" style={{ borderColor: "color-mix(in srgb, var(--success) 35%, transparent)" }}>
                        <Zap size={11} className="fill-success" />
                        Leader
                    </span>
                )}
            </div>

            {/* Identity */}
            <div className="mt-6 space-y-2">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-2xl font-semibold text-foreground">
                        {vc.identity.firm_name}
                    </h3>
                    {vc.identity.website_url && (
                        <a
                            href={vc.identity.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-full border border-foreground/15 text-muted-foreground hover:bg-foreground hover:text-background flex items-center justify-center flex-none transition-colors mt-1"
                        >
                            <ExternalLink size={13} />
                        </a>
                    )}
                </div>
                {vc.identity.founded_year && (
                    <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                        <Calendar size={12} className="text-secondary" />
                        <span>Since {vc.identity.founded_year}</span>
                    </div>
                )}
            </div>

            {/* Thesis */}
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {vc.identity.tagline || vc.identity.thesis_summary}
            </p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-background space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        <DollarSign size={11} /> Check Size
                    </div>
                    <p className="text-sm font-semibold text-foreground truncate">
                        {vc.investment_criteria.check_size?.display_text || "—"}
                    </p>
                </div>
                <div className="p-4 rounded-2xl bg-background space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        <MapPin size={11} /> Focus
                    </div>
                    <p className="text-sm font-semibold text-foreground truncate">
                        {vc.investment_criteria.geographies?.[0] || "Global"}
                    </p>
                </div>
            </div>

            {/* Sector Badges */}
            <div className="mt-5 flex flex-wrap gap-2">
                {vc.investment_criteria.sectors?.slice(0, 3).map(sector => (
                    <span
                        key={sector}
                        className="px-2.5 py-1 rounded-full bg-background text-[10px] font-medium text-muted-foreground uppercase tracking-wide"
                    >
                        {sector}
                    </span>
                ))}
                {vc.investment_criteria.sectors?.length > 3 && (
                    <span className="px-2.5 py-1 rounded-full bg-background text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                        +{vc.investment_criteria.sectors.length - 3}
                    </span>
                )}
            </div>

            {/* CTA */}
            <div className="mt-auto pt-6">
                <Link
                    to={`/vc/${vc.id}`}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
                >
                    View Profile
                    <ExternalLink size={15} />
                </Link>
            </div>
        </div>
    );
};

export default VCCard;
