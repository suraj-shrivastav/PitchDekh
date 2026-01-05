import { useEffect, useState } from "react";
import { useUpload } from "../context/UploadContext";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Layout, Activity, ChevronRight, Download } from "lucide-react";

const Section = ({ title, children, className = "" }) => (
    <div className={`rounded-2xl bg-muted/40 border border-border/50 backdrop-blur-sm p-6 lg:p-8 space-y-6 shadow-xl ${className}`}>
        <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]"></span>
            {title}
        </h2>
        {children}
    </div>
);

const KeyValue = ({ label, value }) => (
    <div className="space-y-1.5">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            {label}
        </p>
        <p className="text-base text-foreground font-semibold">
            {value || "—"}
        </p>
    </div>
);

const List = ({ items }) => (
    <ul className="space-y-2">
        {(items || []).map((item, i) => (
            <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                <span className="text-muted-foreground/60 mt-1.5">•</span>
                {item}
            </li>
        ))}
    </ul>
);

const safeJoin = (arr) =>
    Array.isArray(arr) && arr.length > 0 ? arr.join(", ") : "-";

const PitchAnalysis = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchPitchData } = useUpload();

    const [pitch, setPitch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPitch = async () => {
            try {
                setLoading(true);
                const res = await fetchPitchData(id);
                setPitch(res);
            } catch (err) {
                console.error("Failed to fetch pitch", err);
                setError("Failed to load pitch");
            } finally {
                setLoading(false);
            }
        };

        if (id) loadPitch();
    }, [id, fetchPitchData]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-muted-foreground font-medium animate-pulse">Running Analysis...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
                <div className="space-y-4">
                    <div className="text-4xl text-destructive">⚠️</div>
                    <p className="text-destructive font-medium">{error}</p>
                    <button onClick={() => navigate("/pitches")} className="text-primary text-sm hover:underline">Back to Pitches</button>
                </div>
            </div>
        );
    }

    if (!pitch) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
                Pitch not found
            </div>
        );
    }

    const {
        company = {},
        problem,
        solution,
        product = {},
        marketClaimedByFounder = {},
        businessModel = {},
        traction = {},
        competitionClaimedByFounder = {},
        team = [],
        roadmap = {},
        risksAndAsks = {},
        summary,
    } = pitch.pitch_normalized || {};

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500 px-6 lg:px-12 pt-28 pb-12">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/50">
                    <div className="space-y-2">
                        <button
                            onClick={() => navigate("/pitches")}
                            className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 mb-4 transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </button>
                        <div className="flex items-center gap-4 flex-wrap">
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                                {company.name || "Untitled Startup"}
                            </h1>
                            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                                {company.stage || "Unknown Stage"}
                            </span>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl font-medium">
                            {company.description || "No description provided"}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        {pitch.pitch_url && (
                            <a
                                href={pitch.pitch_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="px-5 py-3 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground flex items-center gap-2 font-bold transition-all"
                                title="Download Original Pitch Deck"
                            >
                                <Download size={18} />
                                Download Pitch
                            </a>
                        )}
                        <button
                            onClick={() => navigate(`/pitches/${id}/research`)}
                            className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all"
                        >
                            Market Research →
                        </button>
                    </div>
                </div>

                {/* SUMMARY */}
                <Section title="AI Summary">
                    <p className="text-lg text-foreground/90 leading-relaxed font-medium">
                        {summary}
                    </p>
                </Section>

                {/* COMPANY */}
                <Section title="Company Overview">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <KeyValue label="Legal Name" value={company.legalName} />
                        <KeyValue label="Founded" value={company.foundedYear} />
                        <KeyValue label="HQ" value={company.hqLocation} />
                        <KeyValue label="Status" value={company.incorporationStatus} />
                    </div>
                    <div className="pt-6 border-t border-border/50">
                        <KeyValue label="Vision" value={company.vision} />
                    </div>
                </Section>

                {/* PROBLEM & SOLUTION */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <Section title="Problem" className="bg-destructive/5 border-destructive/10">
                        <p className="text-muted-foreground leading-relaxed italic">"{problem}"</p>
                    </Section>
                    <Section title="Solution" className="bg-success/5 border-success/10">
                        <p className="text-muted-foreground leading-relaxed font-medium">{solution}</p>
                    </Section>
                </div>

                {/* PRODUCT */}
                <Section title="Product Ecosystem">
                    <div className="grid sm:grid-cols-2 gap-8">
                        <KeyValue label="Product Name" value={product.productName} />
                        <KeyValue label="Development Status" value={product.currentStatus} />
                    </div>

                    <div className="pt-6 border-t border-border/50">
                        <KeyValue label="Core Value Proposition" value={product.whatItDoes} />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-8 pt-6">
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                Target Users
                            </p>
                            <List items={product.targetUsers} />
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                Key Use Cases
                            </p>
                            <List items={product.useCases} />
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                Innovation Stack
                            </p>
                            <List items={product.techStack} />
                        </div>
                    </div>
                </Section>

                {/* MARKET & MODEL */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <Section title="Market Dynamics">
                        <div className="space-y-6">
                            <KeyValue label="Primary Industries" value={safeJoin(marketClaimedByFounder.industries)} />
                            <KeyValue label="Ideal Customer Type" value={marketClaimedByFounder.customerType} />
                            <KeyValue label="Geographic Reach" value={safeJoin(marketClaimedByFounder.geography)} />
                        </div>
                    </Section>

                    <Section title="Business Engine">
                        <div className="space-y-6">
                            <KeyValue label="Pricing Model" value={businessModel.pricingModel} />
                            <KeyValue label="Sales & Distribution" value={businessModel.salesMotion} />
                            <KeyValue label="Monetization Strategy" value={safeJoin(businessModel.revenueStreams)} />
                        </div>
                    </Section>
                </div>

                {/* TRACTION */}
                <Section title="Growth & Traction">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
                            <KeyValue label="User Base" value={traction.users} />
                        </div>
                        <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
                            <KeyValue label="Paid Customers" value={traction.customers} />
                        </div>
                        <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
                            <KeyValue label="Monthly Velocity" value={traction.revenue?.monthlyRevenue} />
                        </div>
                        <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
                            <KeyValue label="Growth KPI" value={traction.growthRate} />
                        </div>
                    </div>
                </Section>

                {/* COMPETITION */}
                <Section title="Competitive Advantage">
                    <p className="text-muted-foreground leading-relaxed mb-8 p-5 rounded-xl bg-primary/5 border border-primary/20 font-medium">
                        "{competitionClaimedByFounder.founderStatedDifferentiation}"
                    </p>
                    <div className="grid sm:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-destructive uppercase tracking-widest">Direct Rivals</p>
                            <List items={competitionClaimedByFounder.directCompetitors} />
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Indirect Threats</p>
                            <List items={competitionClaimedByFounder.indirectCompetitors} />
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Alternative Solutions</p>
                            <List items={competitionClaimedByFounder.alternativeSolutions} />
                        </div>
                    </div>
                </Section>

                {/* TEAM */}
                <Section title="Founding Team">
                    {team.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">
                            Team information not available
                        </p>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {team.map((m, i) => (
                                <div key={i} className="group rounded-2xl bg-muted/40 p-6 border border-border/50 hover:border-primary/30 transition-all">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                            {m.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground group-hover:text-primary transition-colors">{m.name}</p>
                                            <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{m.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{m.background}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </Section>

                {/* ROADMAP & RISKS */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <Section title="Strategic Roadmap">
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Short-Term Milestones</p>
                                <List items={roadmap.shortTermGoals} />
                            </div>
                            <div className="pt-6 border-t border-border/50">
                                <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Mid-Term Objectives</p>
                                <List items={roadmap.midTermGoals} />
                            </div>
                        </div>
                    </Section>

                    <Section title="Critical Risks">
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-destructive uppercase tracking-widest mb-2">Key Areas of Concern</p>
                            <div className="space-y-3">
                                {(risksAndAsks.keyRisks || []).map((risk, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 text-sm text-muted-foreground flex gap-3">
                                        <span className="text-destructive font-bold">!</span>
                                        {risk}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
};

export default PitchAnalysis;
