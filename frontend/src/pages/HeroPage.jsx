import { useState } from "react";
import UploadPitchModal from "./UploadPitchModal";
import UploadVCLinkModal from "./UploadVCLinkModal";
import { useAuth } from "../context/AuthContext";
import { Brain, Target, BarChart3, Lock, Zap, ArrowRight, Activity, ChevronRight, BarChart, ShieldCheck, Lightbulb } from "lucide-react";

const HeroPage = () => {
    const { user } = useAuth();
    const [openUpload, setOpenUpload] = useState(false);
    const [openVCUpload, setOpenVCUpload] = useState(false);

    const features = [
        {
            title: "Market Intelligence",
            desc: "Understand competitor gaps and industry benchmarks through deep-scanning AI.",
            icon: Brain,
        },
        {
            title: "Investor Scoring",
            desc: "View objective analysis of your unit economics from a VC's perspective.",
            icon: Target,
        },
        {
            title: "Strategic Roadmap",
            desc: "AI-generated expansion milestones tailored to your specific market segment.",
            icon: BarChart3,
        },
        {
            title: "Data Sovereignty",
            desc: "Enterprise-grade encryption keeps your deck and analysis strictly private.",
            icon: Lock,
        },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">

            {/* MAIN HERO SECTION */}
            <main className="flex-grow flex items-center justify-center px-6 pt-32 pb-20">
                <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* LEFT: NARRATIVE */}
                    <div className="space-y-10 text-center lg:text-left">
                        <div className="pill mx-auto lg:mx-0 text-muted-foreground">
                            <Lightbulb className="w-3.5 h-3.5 text-accent" />
                            <span>Real-time analysis active</span>
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-light text-foreground">
                                Authority in your <br className="hidden md:block" />
                                Market Narrative.
                            </h1>

                            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                The intelligent co-pilot for high-growth founders. Analyze pitch decks,
                                bridge market gaps, and align with global VCs using institutional-grade AI.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button
                                onClick={() => setOpenUpload(true)}
                                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-background font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                Analyze Your Deck
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            {user?.app_metadata?.role === "admin" && (
                                <button
                                    onClick={() => setOpenVCUpload(true)}
                                    className="w-full sm:w-auto px-8 py-4 rounded-full border border-foreground/15 text-foreground font-semibold hover:bg-foreground/[0.04] transition-colors"
                                >
                                    Institutional Access
                                </button>
                            )}
                        </div>

                        {/* Social Proof — clean editorial trust strip */}
                        <div className="flex flex-col items-center lg:items-start gap-5 pt-4">
                            <span className="pill text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                                2,400+ decks analyzed
                            </span>
                            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
                                <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground font-medium">
                                    Founders backed by
                                </span>
                                <div className="flex items-center gap-3.5 text-sm font-medium text-foreground/70">
                                    <span>Sequoia</span>
                                    <span className="w-1 h-1 rounded-full bg-foreground/25" />
                                    <span>Accel</span>
                                    <span className="w-1 h-1 rounded-full bg-foreground/25" />
                                    <span>Y&nbsp;Combinator</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: FLAT PREVIEW */}
                    <div className="hidden lg:block">
                        <div className="card-soft p-8 space-y-6">

                            {/* Header row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-11 w-11 rounded-2xl bg-accent/12 flex items-center justify-center text-accent">
                                        <Activity className="w-5 h-5" strokeWidth={1.6} />
                                    </div>
                                    <div>
                                        <h4 className="text-foreground font-semibold text-sm">AI Engine v2.0</h4>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-success" />
                                            <span className="text-[10px] uppercase font-medium text-muted-foreground tracking-wider">Scanning active</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="pill text-muted-foreground">Phase 04</span>
                            </div>

                            {/* Dark contrast panel */}
                            <div className="card-dark p-8 flex flex-col items-center text-center gap-5">
                                <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center">
                                    <Zap className="w-9 h-9 text-white" />
                                </div>
                                <div className="w-full max-w-[280px] space-y-3">
                                    <p className="text-white text-lg font-medium">Deep Benchmarking</p>
                                    <div className="h-1.5 w-full bg-white/15 rounded-full overflow-hidden">
                                        <div className="h-full w-[72%] bg-white rounded-full animate-progress-glow" />
                                    </div>
                                    <div className="flex justify-between text-[10px] font-medium text-white/55 uppercase tracking-wider">
                                        <span>Analyzing sentiment</span>
                                        <span className="text-white">72%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stat tiles */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl bg-background p-4 space-y-2">
                                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Market Potential</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-foreground font-semibold">Top 5%</span>
                                        <ShieldCheck className="w-4 h-4 text-success" />
                                    </div>
                                </div>
                                <div className="card-dark p-4 space-y-2">
                                    <p className="text-[10px] font-medium text-white/55 uppercase tracking-wider">Investor Match</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-semibold">Strong</span>
                                        <BarChart className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* FEATURE GRID */}
            <div className="max-w-7xl mx-auto w-full px-6 pb-32">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <div key={i} className="card-soft p-8 glide-lift group">
                            <div className="h-14 w-14 rounded-2xl bg-accent/12 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                                <feature.icon className="text-accent w-6 h-6" strokeWidth={1.6} />
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-foreground font-semibold text-lg">{feature.title}</h4>
                                    <ChevronRight className="text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all" size={18} />
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODALS */}
            <UploadPitchModal open={openUpload} onClose={() => setOpenUpload(false)} />
            <UploadVCLinkModal open={openVCUpload} onClose={() => setOpenVCUpload(false)} />
        </div>
    );
};

export default HeroPage;
