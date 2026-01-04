import { useState } from "react";
import { useUpload } from "../context/UploadContext";
import { useAuth } from "../context/AuthContext";

const UploadVCLinkModal = ({ open, onClose }) => {
    const { uploadVCLink, loading } = useUpload();
    const { user } = useAuth();
    const [vcLink, setVcLink] = useState("");

    // Admin guard
    if (!open) return null;

    if (user?.app_metadata?.role !== "admin") return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(vcLink);
        if (!vcLink.trim()) return;
        const res = uploadVCLink(vcLink);
        if (res.message === "Success") {
            onClose;
            setVcLink("");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* MODAL */}
            <div
                className="relative w-full max-w-lg rounded-2xl border border-border
                   bg-background p-8 shadow-2xl z-10 transition-colors duration-500"
            >
                {/* HEADER */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">
                            Add VC / Investor Link
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Submit a VC, fund, or angel profile for analysis.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition"
                    >
                        ✕
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Investor or VC URL
                        </label>
                        <input
                            type="url"
                            placeholder="www.investor.com"
                            value={vcLink}
                            onChange={(e) => setVcLink(e.target.value)}
                            required
                            className="mt-2 w-full rounded-lg bg-muted border border-border/50
                         px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50
                         focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <p className="mt-2 text-xs text-muted-foreground">
                            LinkedIn, website, Crunchbase, or portfolio page
                        </p>
                    </div>

                    {/* CTA */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white
                       hover:bg-primary/90 transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Analyzing Investor..." : "Analyze Investor Fit"}
                    </button>
                </form>

                {/* FOOTER */}
                <p className="mt-5 text-center text-xs text-muted-foreground">
                    We analyze public data only. No private or sensitive data is accessed.
                </p>
            </div>
        </div>
    );
};

export default UploadVCLinkModal;
