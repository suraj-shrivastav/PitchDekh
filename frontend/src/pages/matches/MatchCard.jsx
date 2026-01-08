import React from 'react';

const MatchCard = ({ match, onClick }) => {
    if (!match) return null;
    const { score, vc, ai_analysis } = match;
    const { firm_name, logo_url } = vc?.identity || {};
    const { one_line_verdict, match_tier } = ai_analysis?.summary || {};

    // Color coding for score
    let scoreColor = "text-red-500";
    let scoreBg = "bg-red-500/10";
    let scoreBorder = "border-red-500/20";

    if (score >= 80) {
        scoreColor = "text-emerald-500";
        scoreBg = "bg-emerald-500/10";
        scoreBorder = "border-emerald-500/20";
    } else if (score >= 50) {
        scoreColor = "text-amber-500";
        scoreBg = "bg-amber-500/10";
        scoreBorder = "border-amber-500/20";
    }

    return (
        <div
            onClick={onClick}
            className="group relative flex flex-col gap-4 p-7 rounded-3xl border border-border/50 bg-muted/40 hover:bg-muted/60 hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 cursor-pointer backdrop-blur-2xl shadow-xl overflow-hidden"
        >
            {/* Ambient Background Glow (Hover) */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Header: Score & Logo */}
            <div className="relative z-10 flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center overflow-hidden border border-border/50 shadow-sm">
                        {logo_url ? (
                            <img src={logo_url} alt={firm_name} className="w-full h-full object-contain p-2" />
                        ) : (
                            <span className="text-xl font-bold text-muted-foreground">{firm_name?.charAt(0)}</span>
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                            {firm_name}
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">{match_tier || "Match Candidate"}</p>
                    </div>
                </div>

                <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 ${scoreBorder} ${scoreBg} shadow-inner`}>
                    <span className={`text-lg font-bold ${scoreColor}`}>{Math.round(score)}</span>
                </div>
            </div>

            {/* Verdict */}
            <div className="relative z-10 min-h-[3rem]">
                <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-2 italic">
                    {one_line_verdict || "Click to see detailed analysis..."}
                </p>
            </div>

            {/* Footer: Tags */}
            <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/30">
                {match.reasons && match.reasons.slice(0, 2).map((reason, i) => (
                    <span key={i} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg bg-primary/5 text-primary border border-primary/10">
                        {reason}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MatchCard;
