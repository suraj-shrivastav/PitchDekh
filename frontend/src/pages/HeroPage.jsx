import { useState } from "react";
import UploadPitchModal from "./UploadPitchModal";
import UploadVCLinkModal from "./UploadVCLinkModal";
import { useAuth } from "../context/AuthContext";
import { Brain, Target, BarChart3, Lock, Zap, ArrowRight, MousePointer2, Activity, ChevronRight, BarChart, ShieldCheck, Lightbulb } from "lucide-react";

const HeroPage = () => {
    const { user } = useAuth();
    const [openUpload, setOpenUpload] = useState(false);
    const [openVCUpload, setOpenVCUpload] = useState(false);

    const features = [
        {
            title: "Market Intelligence",
            desc: "Understand competitor gaps and industry benchmarks through deep-scanning AI.",
            icon: Brain,
            color: "primary",
        },
        {
            title: "Investor Scoring",
            desc: "View objective analysis of your unit economics from a VC's perspective.",
            icon: Target,
            color: "secondary",
        },
        {
            title: "Strategic Roadmap",
            desc: "AI-generated expansion milestones tailored to your specific market segment.",
            icon: BarChart3,
            color: "primary",
        },
        {
            title: "Data Sovereignty",
            desc: "Enterprise-grade encryption keeps your deck and analysis strictly private.",
            icon: Lock,
            color: "muted-foreground",
        },
    ];

    return (
        <div className="relative min-h-screen bg-background transition-colors duration-500 overflow-hidden flex flex-col font-sans">
            {/* AMBIENT BACKGROUND SYSTEM */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Layer 1: Mesh Glows */}
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[160px] opacity-40 animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[160px] opacity-30 animate-pulse delay-700" />

                {/* Layer 2: Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

                {/* Layer 3: Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-overlay" />
            </div>

            {/* MAIN HERO SECTION */}
            <main className="flex-grow flex items-center justify-center relative z-10 px-6 pt-32 pb-20">
                <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">

                    {/* LEFT CONTENT: THE NARRATIVE */}
                    <div className="space-y-12 text-center lg:text-left">
                        <div className="inline-flex items-center gap-3 px-1 py-1 pr-4 rounded-full bg-foreground/5 border border-border/50 backdrop-blur-xl mx-auto lg:mx-0 group hover:bg-foreground/[0.08] transition-colors cursor-default">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-transparent text-[10px] font-bold text-white"><Lightbulb /></span>
                            <span className="text-xs font-semibold text-muted-foreground tracking-tight">Powerfull Real-time Analysis Active</span>
                            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.08] tracking-tight">
                                Authority in your <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">Market Narrative.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                The intelligent co-pilot for high-growth founders. Analyze pitch decks, bridge market gaps, and align with global VCs using institutional-grade AI.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                            <button
                                onClick={() => setOpenUpload(true)}
                                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group active:scale-[0.98]"
                            >
                                Analyze Your Deck
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {user?.app_metadata?.role === "admin" && (
                                <button
                                    onClick={() => setOpenVCUpload(true)}
                                    className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-muted border border-border text-muted-foreground font-bold hover:bg-muted/80 hover:text-foreground transition-all flex items-center justify-center gap-3"
                                >
                                    Institutional Access
                                </button>
                            )}
                        </div>

                        {/* Social Proof / Trusted Ribbon */}
                        <div className="flex flex-col items-center lg:items-start gap-6 pt-4">
                            <div className="flex -space-x-3 items-center">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden ring-1 ring-border shadow-xl transition-transform hover:scale-110 hover:z-20 cursor-pointer">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + i * 15}`} alt="VCO" />
                                    </div>
                                ))}
                                <div className="pl-6">
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Powered founders at</p>
                                    <div className="flex items-center gap-4 opacity-40 grayscale select-none mt-1">
                                        <span className="font-black text-foreground italic text-sm">SEQUOIA</span>
                                        <span className="font-black text-foreground italic text-sm">ACCEL</span>
                                        <span className="font-black text-foreground italic text-sm">YC</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT: THE VISUAL ENGINE */}
                    <div className="hidden lg:block relative order-first lg:order-last group">
                        {/* THE DASHBOARD PREVIEW */}
                        <div className="relative z-10 rounded-[3rem] border border-border bg-muted/40 backdrop-blur-3xl p-1 shadow-2xl overflow-hidden min-h-[520px] transition-all duration-700 hover:border-primary/30">
                            {/* Inner Glass Content */}
                            <div className="h-full w-full rounded-[2.9rem] bg-gradient-to-br from-muted/60 to-muted-foreground/10 p-10 flex flex-col justify-between">

                                {/* Top Header: AI Status */}
                                <div className="flex items-center justify-between border-b border-border/50 pb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
                                            <Activity className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-foreground font-bold tracking-tight">AI Engine v2.0</h4>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                                                <span className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter">Scanning active</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 rounded-xl bg-foreground/5 border border-border text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                                        Phase 04: Market Gap
                                    </div>
                                </div>

                                {/* Main Visual Area: Scanning Logic */}
                                <div className="flex-grow py-12 flex flex-col items-center justify-center text-center space-y-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                                        <div className="relative h-32 w-32 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30 shadow-2xl group-hover:scale-110 transition-transform duration-500 ring-8 ring-foreground/5">
                                            <Zap className="w-16 h-16 text-primary fill-primary/10" />
                                        </div>
                                    </div>
                                    <div className="space-y-3 max-w-[280px]">
                                        <p className="text-foreground text-xl font-bold tracking-tight">Deep Benchmarking...</p>
                                        <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                                            <div className="h-full w-[72%] bg-gradient-to-r from-primary to-secondary rounded-full animate-progress-glow shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                                            <span>Analyzing Sentiment</span>
                                            <span className="text-primary">72%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Stats: Insights */}
                                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-border/50">
                                    <div className="p-4 rounded-2xl bg-foreground/5 border border-border/50 space-y-2">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Market Potential</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-foreground font-bold">Top 5%</span>
                                            <ShieldCheck className="w-4 h-4 text-success" />
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-foreground/5 border border-border/50 space-y-2">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Investor Match</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-foreground font-bold">Strong</span>
                                            <BarChart className="w-4 h-4 text-primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Cursor Simulation */}
                            <div className="absolute top-[40%] right-[15%] group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-1000 pointer-events-none opacity-0 group-hover:opacity-100">
                                <div className="flex items-center gap-3">
                                    <div className="bg-foreground text-background px-3 py-1.5 rounded-full text-[10px] font-bold uppercase">Refining TAM</div>
                                    <MousePointer2 className="text-foreground fill-foreground rotate-[-30deg]" size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Background Layer Glows */}
                        <div className="absolute -top-12 -right-12 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -z-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] -z-0 opacity-30 group-hover:opacity-80 transition-opacity" />
                    </div>
                </div>
            </main>

            {/* FEATURE GRID: THE CAPABILITIES */}
            <div className="max-w-7xl mx-auto w-full px-6 pb-32">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="group p-10 rounded-[2.5rem] bg-muted/40 border border-border/50 hover:border-primary/20 transition-all hover:-translate-y-2 backdrop-blur-3xl relative overflow-hidden">
                            {/* Accent Glow */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative">
                                <div className={`h-16 w-16 rounded-2xl bg-foreground/[0.03] border border-border/50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                                    <feature.icon className={`text-primary w-8 h-8`} />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-foreground font-bold text-xl tracking-tight">{feature.title}</h4>
                                        <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
                                    </div>
                                    <p className="text-muted-foreground text-sm font-medium leading-[1.65] group-hover:text-foreground transition-colors">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODALS */}
            <UploadPitchModal
                open={openUpload}
                onClose={() => setOpenUpload(false)}
            />
            <UploadVCLinkModal
                open={openVCUpload}
                onClose={() => setOpenVCUpload(false)}
            />

            {/* Custom Animations in Inline Style for simplicity in this project context */}
            {/* <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes progress-glow {
                    0% { opacity: 0.8; filter: brightness(1); }
                    50% { opacity: 1; filter: brightness(1.3); }
                    100% { opacity: 0.8; filter: brightness(1); }
                }
                .animate-progress-glow {
                    animation: progress-glow 2s infinite ease-in-out;
                }
            `}} /> */}
        </div>
    );
};

export default HeroPage;