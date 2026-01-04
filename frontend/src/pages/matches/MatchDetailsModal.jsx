import React from 'react';
import { X, CheckCircle, AlertTriangle, Briefcase, Globe, TrendingUp } from 'lucide-react';

const MatchDetailsModal = ({ match, onClose }) => {
    if (!match) return null;

    const { score, vc, ai_analysis, reasons } = match;
    const { firm_name, logo_url, website_url } = vc.identity;
    const { summary, analysis, email_draft } = ai_analysis || {};

    // Fallbacks if AI analysis failed
    const thesis = analysis?.thesis_alignment || "Analysis unavailable.";
    const sectorFit = analysis?.sector_fit || "N/A";
    const concerns = analysis?.concerns || [];

    const copyToClipboard = () => {
        if (email_draft) {
            const text = `Subject: ${email_draft.subject}\n\n${email_draft.body}`;
            navigator.clipboard.writeText(text);
            alert("Email draft copied to clipboard!");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-full transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 min-h-[600px]">
                    {/* Left Sidebar: ID & Stats */}
                    <div className="p-8 border-b md:border-b-0 md:border-r border-border bg-muted/30">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-24 h-24 rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden mb-2">
                                {logo_url ? <img src={logo_url} alt={firm_name} className="w-full h-full object-cover" /> : <TrendingUp className="text-muted-foreground" size={40} />}
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-foreground">{firm_name}</h2>
                                <a href={website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                    Visit Website
                                </a>
                            </div>

                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
                                <span className={`text-2xl font-bold ${score >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                    {Math.round(score)}
                                </span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Match Score</span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-6">
                            <div>
                                <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Key Signals</h4>
                                <div className="flex flex-wrap gap-2">
                                    {reasons?.map((r, i) => (
                                        <span key={i} className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground border border-border">
                                            {r}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Investment Focus</h4>
                                <ul className="space-y-2 text-sm text-foreground/80">
                                    <li className="flex items-center gap-2">
                                        <Globe size={14} className="text-primary" />
                                        {vc.investment_criteria?.geographies?.slice(0, 3).join(", ")}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Briefcase size={14} className="text-primary" />
                                        {vc.investment_criteria?.stages?.join(", ")}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Content: Analysis */}
                    <div className="col-span-2 p-8 space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">Why this match?</h3>
                            <p className="text-lg text-foreground/80 font-light leading-relaxed">
                                {summary?.one_line_verdict || "Detailed analysis unavailable."}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="p-5 rounded-xl bg-muted/40 border border-border">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-500 mb-3">
                                    <CheckCircle size={16} /> Thesis Alignment
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {thesis}
                                </p>
                            </div>

                            <div className="p-5 rounded-xl bg-muted/40 border border-border">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-blue-500 mb-3">
                                    <Briefcase size={16} /> Sector Fit
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {sectorFit}
                                </p>
                            </div>

                            {concerns.length > 0 && (
                                <div className="p-5 rounded-xl bg-destructive/10 border border-destructive/20">
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-destructive mb-3">
                                        <AlertTriangle size={16} /> Potential Concerns
                                    </h4>
                                    <ul className="space-y-2">
                                        {concerns.map((c, i) => (
                                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-destructive/50" />
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {email_draft && (
                            <div className="pt-6 border-t border-border">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-foreground">Outreach Draft</h3>
                                    <button
                                        onClick={copyToClipboard}
                                        className="text-xs px-3 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/20 hover:bg-primary/30 transition-colors"
                                    >
                                        Copy to Clipboard
                                    </button>
                                </div>
                                <div className="p-4 rounded-xl bg-muted border border-border font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                                    <div className="mb-2 text-muted-foreground/60">Subject: {email_draft.subject}</div>
                                    {email_draft.body}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchDetailsModal;
