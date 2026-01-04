import { useEffect, useState } from "react";
import { useVCContext } from "../context/VCContext";
import { useParams } from "react-router-dom";

import {
    Globe,
    Calendar,
    MapPin,
    DollarSign,
    Target,
    TrendingUp,
    Mail,
    Linkedin,
    Twitter,
    ExternalLink,
    CheckCircle2,
    XCircle,
    Building2,
    Briefcase,
    Shield,
    Rocket,
    ArrowUpRight,
    Clock,
    Activity,
    Zap
} from "lucide-react";

/* -------------------- Helpers -------------------- */

const formatDate = (date) =>
    date
        ? new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        : "—";

const GlassCard = ({ title, children, className = "" }) => (
    <div className={`relative overflow-hidden rounded-2xl border border-border/50 bg-foreground/[0.03] backdrop-blur-xl p-6 transition-all duration-300 hover:border-primary/20 ${className}`}>
        {title && (
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80 mb-6">
                {title}
            </h2>
        )}
        {children}
    </div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
    const styles = {
        default: "bg-foreground/5 text-muted-foreground border-border/50",
        primary: "bg-primary/10 text-primary border-primary/20",
        success: "bg-success/10 text-success border-success/20",
        warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        indigo: "bg-secondary/10 text-secondary border-secondary/20",
    };
    return (
        <span className={`px-3 py-1 rounded-full text-[11px] font-medium border backdrop-blur-md ${styles[variant]} ${className}`}>
            {children}
        </span>
    );
};

const StatCard = ({ icon: Icon, label, value, sub, color = "primary" }) => {
    const colorClasses = {
        primary: "text-primary bg-primary/10",
        secondary: "text-secondary bg-secondary/10",
        pink: "text-pink-400 bg-pink-400/10",
        emerald: "text-success bg-success/10",
    };

    // Helper to safely format the value if it's an object
    const formatValue = (val) => {
        if (typeof val === 'object' && val !== null) {
            if (val.amount) {
                return `${val.currency || ''} ${val.amount}`.trim();
            }
            return JSON.stringify(val); // Fallback for debugging
        }
        return val;
    };

    const displayValue = formatValue(value);

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-border/10 bg-card/40 backdrop-blur-xl p-5 transition-all duration-500 hover:bg-card/60 hover:border-border/20">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
                    <p className="text-xl font-bold text-foreground tracking-tight">{displayValue}</p>
                    {sub && <p className="text-[11px] text-muted-foreground mt-1.5 font-medium">{sub}</p>}
                </div>
                <div className={`p-2.5 rounded-xl ${colorClasses[color] || colorClasses.sky} transition-transform duration-500 group-hover:scale-110`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            {/* Subtle Gradient Glow */}
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-current opacity-[0.03] blur-2xl rounded-full transition-opacity group-hover:opacity-[0.07]" />
        </div>
    );
};

/* -------------------- Page -------------------- */

const VCProfile = () => {
    const { id } = useParams();
    const { getVCById } = useVCContext();
    const [vcData, setVcData] = useState(null);

    useEffect(() => {
        const load = async () => {
            const res = await getVCById(id);
            setVcData(res);
            console.log("VC Data is: ", res);
        };
        load();
    }, [id]);

    if (!vcData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-6">
                    <div className="relative w-16 h-16 mx-auto">
                        <div className="absolute inset-0 border-2 border-sky-500/20 rounded-full"></div>
                        <div className="absolute inset-0 border-2 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
                        Synchronizing Intelligence
                    </p>
                </div>
            </div>
        );
    }

    const {
        identity = {},
        investment_criteria = {},
        operational_metrics = {},
        contact_and_access = {},
        value_add = {},
        team = [],
        portfolio_snapshot = {},
        metadata = {}
    } = vcData;

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-primary/30">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-secondary/10 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-accent/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-12 lg:pb-20 space-y-12">

                {/* ---------- Header ---------- */}
                <header className="flex flex-col lg:flex-row justify-between items-start gap-10">
                    <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                        <div className="group relative w-24 h-24 rounded-3xl border border-border/10 bg-muted/50 flex items-center justify-center backdrop-blur-xl transition-all duration-500 hover:border-sky-500/40 hover:bg-muted/80">
                            {identity.logo_url ? (
                                <img
                                    src={identity.logo_url}
                                    alt={identity.firm_name}
                                    className="w-12 h-12 object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <span className="text-3xl font-bold text-sky-400 transition-transform duration-500 group-hover:scale-110">
                                    {identity.firm_name?.[0]}
                                </span>
                            )}
                            <div className="absolute inset-0 bg-sky-400/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-2">
                                    {identity.firm_name || "Unnamed VC"}
                                </h1>
                                {identity.tagline && (
                                    <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
                                        {identity.tagline}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {operational_metrics.fund_status?.is_active && (
                                    <Badge variant="success" className="px-4 py-1.5">
                                        <Activity size={12} className="inline mr-2" />
                                        Actively Investing
                                    </Badge>
                                )}
                                {identity.founded_year && (
                                    <Badge className="px-4 py-1.5">
                                        <Calendar size={12} className="inline mr-2" />
                                        Since {identity.founded_year}
                                    </Badge>
                                )}
                                {value_add.network?.network_tier && (
                                    <Badge variant="indigo" className="px-4 py-1.5">
                                        <Target size={12} className="inline mr-2" />
                                        {value_add.network.network_tier}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                        {identity.website_url && (
                            <a
                                href={identity.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 lg:flex-none px-6 py-3 rounded-2xl border border-border/50 bg-foreground/5 text-sm font-bold text-foreground flex items-center justify-center gap-3 transition-all hover:bg-foreground/10 hover:border-border active:scale-95"
                            >
                                <Globe size={18} className="text-primary" /> Website
                            </a>
                        )}
                        {contact_and_access.channels?.submission_url && (
                            <a
                                href={contact_and_access.channels.submission_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 lg:flex-none px-6 py-3 rounded-2xl bg-primary text-white text-sm font-bold flex items-center justify-center gap-3 transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] active:scale-95 shadow-lg"
                            >
                                <Rocket size={18} /> Submit Pitch
                            </a>
                        )}
                    </div>
                </header>

                {/* ---------- Stats Grid ---------- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        icon={DollarSign}
                        label="Check Size"
                        value={investment_criteria.check_size?.display_text || "—"}
                        color="sky"
                    />
                    <StatCard
                        icon={Briefcase}
                        label="Est. Fund Size"
                        value={operational_metrics.fund_status?.estimated_fund_size || "—"}
                        sub={operational_metrics.fund_status?.vintage_year ? `Vintage: ${operational_metrics.fund_status.vintage_year}` : null}
                        color="indigo"
                    />
                    <StatCard
                        icon={Target}
                        label="Target Ownership"
                        value={operational_metrics.activity?.typical_ownership_target || "—"}
                        color="pink"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Notable Exits"
                        value={portfolio_snapshot.exits?.count ?? "—"}
                        color="emerald"
                    />
                </div>

                {/* ---------- Content Content ---------- */}
                <div className="grid lg:grid-cols-3 gap-8 items-start">

                    {/* Left Column (Core Info) */}
                    <div className="lg:col-span-2 space-y-8">
                        {investment_criteria.thesis_summary && (
                            <GlassCard title="Investment Thesis">
                                <p className="text-muted-foreground leading-relaxed text-lg font-light">
                                    {investment_criteria.thesis_summary}
                                </p>
                            </GlassCard>
                        )}

                        <GlassCard title="Strategic Focus">
                            <div className="grid sm:grid-cols-2 gap-10">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-400/60 mb-4">Sectors</p>
                                    <div className="flex flex-wrap gap-2">
                                        {investment_criteria.sectors?.map((s) => (
                                            <Badge key={s} variant="indigo">{s}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-400/60 mb-4">Stages</p>
                                    <div className="flex flex-wrap gap-2">
                                        {investment_criteria.stages?.map((s) => (
                                            <Badge key={s}>{s}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-400/60 mb-4">Geographic Presence</p>
                                    <div className="flex flex-wrap gap-2">
                                        {investment_criteria.geographies?.map((g) => (
                                            <Badge key={g}>
                                                <MapPin size={10} className="inline mr-2 text-sky-400/60" />
                                                {g}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Team Section */}
                        {team.length > 0 && (
                            <GlassCard title="Core Decision Makers">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {team.map((member) => (
                                        <div key={member.name} className="group p-5 rounded-2xl border border-border/10 bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-all duration-300">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-foreground font-bold text-lg">{member.name}</p>
                                                    <p className="text-primary/70 text-xs font-medium">{member.role}</p>
                                                </div>
                                                {member.linkedin_url && (
                                                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                                        <Linkedin size={14} />
                                                    </a>
                                                )}
                                            </div>
                                            {member.is_key_decision_maker && (
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest">
                                                    <Shield size={12} /> Key Partner
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        )}

                        {/* Portfolio */}
                        {portfolio_snapshot.notable_investments?.length > 0 && (
                            <GlassCard title="Selected Portfolio">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {portfolio_snapshot.notable_investments.map((co) => (
                                        <a
                                            key={co.name}
                                            href={co.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group px-4 py-4 rounded-xl border border-border/10 bg-muted/20 hover:bg-sky-500/5 hover:border-sky-500/20 transition-all flex items-center justify-between"
                                        >
                                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{co.name}</span>
                                            <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-sky-400 transition-colors" />
                                        </a>
                                    ))}
                                </div>
                            </GlassCard>
                        )}
                    </div>

                    {/* Right Column (Engagement & Metrics) */}
                    <div className="space-y-8">
                        <GlassCard title="Founder Access">
                            <div className="space-y-6">
                                <div className="flex items-end justify-between">
                                    <span className="text-muted-foreground text-sm">Friendliness Score</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-black text-foreground">{contact_and_access.accessibility?.founder_friendliness_score}</span>
                                        <span className="text-slate-500 font-bold ml-1">/10</span>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                                        style={{ width: `${(contact_and_access.accessibility?.founder_friendliness_score || 0) * 10}%` }}
                                    />
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between py-3 border-b border-border/10">
                                        <span className="text-xs font-medium text-muted-foreground">Cold Outreach</span>
                                        <Badge variant={contact_and_access.accessibility?.cold_outbound_friendly ? "success" : "default"}>
                                            {contact_and_access.accessibility?.cold_outbound_friendly ? "Encouraged" : "Limited"}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-border/10">
                                        <span className="text-xs font-medium text-muted-foreground">Warm Intro</span>
                                        <Badge variant={contact_and_access.accessibility?.warm_intro_required ? "warning" : "success"}>
                                            {contact_and_access.accessibility?.warm_intro_required ? "Preferred" : "Optional"}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <span className="text-xs font-medium text-muted-foreground">Pitch Barrier</span>
                                        <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                                            {contact_and_access.accessibility?.pitch_barrier_level}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard title="Deal Activity">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                                        <Zap size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Frequency</p>
                                        <p className="text-sm font-bold text-foreground">{operational_metrics.activity?.investment_frequency}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Last Deployment</p>
                                        <p className="text-sm font-bold text-foreground">{formatDate(operational_metrics.activity?.last_investment_date)}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Round Lead</p>
                                        <p className="text-sm font-bold text-foreground">{investment_criteria.lead_investments ? "Active Lead Investor" : "Follow-on Investor"}</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard title="Connect">
                            <div className="space-y-4">
                                {contact_and_access.channels?.general_email && (
                                    <a href={`mailto:${contact_and_access.channels.general_email}`} className="flex items-center gap-4 group p-3 rounded-xl hover:bg-muted/10 transition-colors">
                                        <div className="p-2 rounded-lg bg-muted/10 text-muted-foreground group-hover:text-sky-400 transition-colors">
                                            <Mail size={16} />
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate">
                                            {contact_and_access.channels.general_email}
                                        </span>
                                    </a>
                                )}
                                {contact_and_access.channels?.linkedin_url && (
                                    <a href={contact_and_access.channels.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-3 rounded-xl hover:bg-muted/10 transition-colors">
                                        <div className="p-2 rounded-lg bg-muted/10 text-muted-foreground group-hover:text-[#0077b5] transition-colors">
                                            <Linkedin size={16} />
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                            LinkedIn Profile
                                        </span>
                                        <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                )}
                                {contact_and_access.channels?.twitter_handle && (
                                    <a
                                        href={`https://twitter.com/${contact_and_access.channels.twitter_handle.replace("@", "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 group p-3 rounded-xl hover:bg-muted/10 transition-colors"
                                    >
                                        <div className="p-2 rounded-lg bg-muted/10 text-muted-foreground group-hover:text-[#1DA1F2] transition-colors">
                                            <Twitter size={16} />
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                            {contact_and_access.channels.twitter_handle}
                                        </span>
                                        <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                )}
                            </div>
                        </GlassCard>

                        <div className="px-4 py-2 space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-600">
                                <span>Intelligence Integrity</span>
                                <span className="flex items-center gap-1.5 text-emerald-500/60">
                                    <Zap size={10} /> {metadata.confidence_scores?.scraped_facts}%
                                </span>
                            </div>
                            {/* <p className="text-[10px] text-slate-700 text-center font-medium">
                                Last verified: {formatDate(metadata.last_updated)}
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VCProfile;
