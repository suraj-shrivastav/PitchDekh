import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "../../libs/supabaseClient.js"
import MatchCard from './MatchCard';
import MatchDetailsModal from './MatchDetailsModal';
import { Sparkles, Loader2, ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../libs/api.js';

const MatchesPage = () => {
    const { id: pitchId } = useParams();
    const navigate = useNavigate();

    const [matchesData, setMatchesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                // Fetch the most recent match run for this pitch
                const { data, error } = await supabase
                    .from('pitch_matches')
                    .select('*')
                    .eq('pitchId', pitchId)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();

                if (error && error.code !== 'PGRST116') throw error;

                if (data) {
                    setMatchesData(data);
                }
            } catch (err) {
                console.error("Error fetching matches:", err);
                setError("Failed to load matches.");
            } finally {
                setLoading(false);
            }
        };

        if (pitchId) {
            fetchMatches();
        }
    }, [pitchId]);

    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateMatches = async () => {
        setIsGenerating(true);
        setError(null);

        try {
            const res = await api.post("/match/vcs", { pitchId });
            if (!res) {
                throw new Error("Match generation failed");
            }
            window.location.reload();
        } catch (err) {
            console.error("Focus Match Error:", err);
            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to generate matches. Please try again."
            );
        } finally {
            setIsGenerating(false);
        }
    };

    if (loading || isGenerating) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-primary" size={40} />
                    <p className="text-muted-foreground animate-pulse">
                        {isGenerating ? "Analyzing Database & Identifying Matches... This will take some time." : "Scanning VC Database..."}
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center p-8 rounded-2xl bg-destructive/5 border border-destructive/10">
                    <p className="text-destructive mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg text-foreground transition-colors">Retry</button>
                </div>
            </div>
        );
    }

    if (!matchesData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                    <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-foreground mb-2">No Matches Found</h2>
                    <p className="text-muted-foreground mb-8">We haven't run a deep match analysis for this pitch yet.</p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleGenerateMatches}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
                        >
                            Run Match Analysis
                        </button>
                        <button
                            onClick={() => navigate(`/pitches/${pitchId}`)}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-muted/50 px-5 py-3 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-all border border-border/50"
                        >
                            <ArrowLeft size={16} /> Back to Pitch
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const { top_matches = [], other_matches = [], meta } = matchesData;

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12 relative overflow-hidden transition-colors duration-500">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

            <div className="relative max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors">
                            <ArrowLeft size={16} /> Back
                        </button>
                        <h1 className="text-4xl font-bold text-foreground">
                            Match Results
                        </h1>
                        <p className="text-muted-foreground mt-2 flex items-center gap-2">
                            Analysis of {meta?.total_scanned || 0} VCs • {meta?.matches_found || 0} Matches Found
                        </p>
                    </div>
                    <button
                        onClick={handleGenerateMatches}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
                        Re-Analyze Matches
                    </button>
                </div>

                {/* Top Matches Section */}
                {top_matches.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="text-2xl font-semibold">Top Recommendations</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {top_matches.filter(m => m).map((match, i) => (
                                <MatchCard
                                    key={i}
                                    match={match}
                                    onClick={() => setSelectedMatch(match)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Other Candidates Section */}
                {other_matches.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold text-muted-foreground mb-6">Other Candidates</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {other_matches.filter(m => m).map((match, i) => (
                                <MatchCard
                                    key={i}
                                    match={match}
                                    onClick={() => setSelectedMatch(match)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {!loading && top_matches.length === 0 && other_matches.length === 0 && (
                    <div className="text-center py-20 bg-muted/30 rounded-3xl border border-border/50">
                        <p className="text-muted-foreground">No matches found with the current criteria.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedMatch && (
                <MatchDetailsModal
                    match={selectedMatch}
                    onClose={() => setSelectedMatch(null)}
                />
            )}
        </div>
    );
};

export default MatchesPage;
