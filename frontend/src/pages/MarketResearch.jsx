import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpload } from "../context/UploadContext";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, RefreshCw, MapPin, Zap, ChevronRight, BarChart3, TrendingUp, Info, Brain } from "lucide-react";
import { api } from "../libs/api";

const Section = ({ title, children, className = "" }) => (
    <div className={`rounded-2xl bg-muted/40 border border-border/50 backdrop-blur-sm p-6 lg:p-8 space-y-6 shadow-xl ${className}`}>
        <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            {title}
        </h2>
        {children}
    </div>
);

const SWOTCard = ({ title, items, type }) => {
    const colors = {
        strengths: "text-success border-success/20 bg-success/5",
        weaknesses: "text-amber-500 border-amber-500/20 bg-amber-500/5",
        opportunities: "text-primary border-primary/20 bg-primary/5",
        threats: "text-destructive border-destructive/20 bg-destructive/5",
    };

    return (
        <div className={`p-5 rounded-xl border ${colors[type]} space-y-3`}>
            <h3 className="text-sm font-bold uppercase tracking-widest">{title}</h3>
            <ul className="space-y-2">
                {items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                        <span className="text-muted-foreground/60 mt-1.5">•</span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const MarketResearch = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchPitchData } = useUpload();
    const { session } = useAuth();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);

    const loadData = async (forceRefresh = false) => {
        try {
            setLoading(true);
            const res = await fetchPitchData(id);
            if (res.pitch_research) {
                setData(res.pitch_research);
            } else if (!forceRefresh) {
                setData(null);
            }
        } catch (err) {
            console.error("Failed to fetch research data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateResearch = async () => {
        try {
            setGenerating(true);
            const res = await api.post("/pitches/research", {
                pitchId: id
            })
            const result = await res.data;
            if (result.success) {
                setData(result.data);
            }
        } catch (error) {
            console.error("Error generating research:", error);
        } finally {
            setGenerating(false);
        }
    };

    useEffect(() => {
        if (id) loadData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-muted-foreground font-medium animate-pulse">Analyzing market data...</p>
                </div>
            </div>
        );
    }

    if (!data && !generating) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="bg-muted/40 border border-border p-8 rounded-3xl backdrop-blur-xl">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">🔍</span>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">No Research Found</h2>
                        <p className="text-muted-foreground mb-8">
                            We haven't generated a deep market research report for this pitch yet.
                        </p>
                        <button
                            onClick={handleGenerateResearch}
                            className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all"
                        >
                            Generate Market Research
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (generating) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <div className="max-w-md w-full text-center space-y-8">
                    <div className="relative">
                        <div className="h-24 w-24 border-4 border-primary/10 border-t-primary rounded-full animate-spin mx-auto"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl animate-bounce"><Brain size={24} /></span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-foreground">AI is researching...</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Scanning market trends, competitive benchmarks, and growth patterns. This may take up to 30 seconds.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const { swot_analysis, growth_strategy, market_intelligence, financial_benchmarks, competitive_landscape } = data;

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500 px-6 lg:px-12 pt-28 pb-12">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/50">
                    <div className="space-y-2">
                        <button
                            onClick={() => navigate(`/pitches/${id}`)}
                            className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 mb-4 transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Analysis
                        </button>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                            Market Research
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl font-medium">
                            Deep-dive competitive intelligence and strategic growth roadmap.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleGenerateResearch}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-muted border border-border hover:bg-muted/80 text-foreground text-sm font-bold transition-all"
                        >
                            <RefreshCw size={16} className={generating ? "animate-spin" : ""} />
                            Refresh Analysis
                        </button>
                    </div>
                </div>

                {/* SWOT Analysis */}
                <Section title="SWOT Analysis">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <SWOTCard title="Strengths" items={swot_analysis.strengths} type="strengths" />
                        <SWOTCard title="Weaknesses" items={swot_analysis.weaknesses} type="weaknesses" />
                        <SWOTCard title="Opportunities" items={swot_analysis.opportunities} type="opportunities" />
                        <SWOTCard title="Threats" items={swot_analysis.threats} type="threats" />
                    </div>
                </Section>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Growth Strategy */}
                    <Section title="Growth Strategy">
                        <div className="space-y-6">
                            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Expansion Roadmap</h4>
                                <p className="text-foreground/90 leading-relaxed font-medium">{growth_strategy.expansion_roadmap}</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Marketing Tactics</h4>
                                <ul className="space-y-3">
                                    {(growth_strategy.marketing_tactics || []).map((tactic, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                                            <span className="h-5 w-5 rounded-full bg-muted border border-border flex items-center justify-center text-[10px] flex-shrink-0 text-primary font-bold">{i + 1}</span>
                                            {tactic}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Section>

                    {/* Market Intelligence */}
                    <Section title="Market Intelligence">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Market Gap Identified</h4>
                                <p className="text-foreground/90 font-medium italic">"{market_intelligence.market_gaps}"</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Current Trends</h4>
                                <div className="grid gap-3">
                                    {(market_intelligence.current_trends || []).map((trend, i) => (
                                        <div key={i} className="p-3 rounded-lg bg-muted/40 border border-border/50 text-sm text-muted-foreground">
                                            {trend}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Target Persona</h4>
                                <p className="text-sm text-muted-foreground">{market_intelligence.target_audience_persona}</p>
                            </div>
                        </div>
                    </Section>
                </div>

                {/* Recommended Locations - Map-like list */}
                <Section title="High-Potential Target Locations">
                    <div className="grid md:grid-cols-3 gap-6">
                        {(growth_strategy.recommended_locations || []).map((loc, i) => (
                            <div key={i} className="group relative p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/50 transition-all">
                                <div className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-100 transition-opacity">📍</div>
                                <h4 className="text-lg font-bold text-foreground mb-2">{loc.type}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{loc.why}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Financial Benchmarks */}
                <Section title="Financial Benchmarks">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Cost Drivers</h4>
                            <div className="flex flex-wrap gap-2">
                                {(financial_benchmarks.major_cost_drivers || []).map((driver, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-muted text-xs text-muted-foreground border border-border">
                                        {driver}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center p-6 rounded-2xl bg-success/5 border border-success/20 text-center">
                            <span className="text-xs font-bold text-muted-foreground uppercase mb-2">Industry Gross Margin</span>
                            <span className="text-3xl font-black text-foreground">{financial_benchmarks.industry_gross_margin}</span>
                        </div>
                        <div className="flex flex-col justify-center items-center p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                            <span className="text-xs font-bold text-muted-foreground uppercase mb-2">Daily Revenue (Bench)</span>
                            <span className="text-2xl font-black text-foreground">{financial_benchmarks.avg_daily_revenue_benchmark}</span>
                        </div>
                    </div>
                </Section>

                {/* Competitive Landscape */}
                <Section title="Competitive Landscape & Players">
                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {(competitive_landscape.major_players || []).map((player, i) => (
                                <div key={i} className="flex flex-col p-5 rounded-xl bg-muted/40 border border-border/50 space-y-4">
                                    <h4 className="font-bold text-foreground text-lg border-b border-border/50 pb-2">{player.name}</h4>
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase">Strength</div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{player.strength}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase">Weakness</div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{player.weakness}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-border/50">
                            <div>
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Market Substitutes</h4>
                                <div className="flex flex-wrap gap-3">
                                    {(competitive_landscape.substitutes || []).map((sub, i) => (
                                        <span key={i} className="px-4 py-2 rounded-full bg-muted border border-border text-sm text-muted-foreground">
                                            {sub}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Pricing Position</h4>
                                <p className="text-lg font-bold text-foreground">{competitive_landscape.pricing_position}</p>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default MarketResearch;
