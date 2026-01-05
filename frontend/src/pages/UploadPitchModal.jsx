import { useState } from "react";
import { useUpload } from "../context/UploadContext";

const UploadPitchModal = ({ open, onClose }) => {
    const { uploadPitch, loading } = useUpload();
    const [file, setFile] = useState(null);

    if (!open) return null;

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            uploadPitch(file);
        } catch (error) {
            console.error(error);
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
            <div className="relative w-full max-w-lg rounded-2xl border border-border
                      bg-background p-8 shadow-2xl z-10 transition-colors duration-500">

                {/* HEADER */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">
                            Upload your pitch deck
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Get instant insights and VC matches.
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
                <form onSubmit={handleSubmit} className="space-y-6">
                    <label
                        htmlFor="pitch"
                        className={`flex flex-col items-center justify-center h-40 rounded-xl cursor-pointer
                        border-2 border-dashed transition
              ${file
                                ? "border-success bg-success/5"
                                : "border-border hover:border-primary"
                            }`}
                    >
                        {!file ? (
                            <div className="text-center">
                                <p className="text-sm text-foreground/80">
                                    Drag & drop your pitch deck
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    PDF only · Max 10MB
                                </p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <p className="text-sm font-medium text-success">
                                    Pitch deck selected
                                </p>
                                <p className="text-xs text-muted-foreground mt-1 truncate max-w-xs">
                                    {file.name}
                                </p>
                            </div>
                        )}

                        <input
                            id="pitch"
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>

                    {/* CTA */}
                    <button
                        type="submit"
                        disabled={!file || loading}
                        className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white
                       hover:bg-primary/90 transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Uploading & Analyzing..." : "Upload & Analyze"}
                    </button>
                </form>

                {/* FOOTER */}
                <p className="mt-5 text-center text-xs text-muted-foreground">
                    Your deck is processed securely and never shared without consent.
                </p>
            </div>
        </div>
    );
};

export default UploadPitchModal;
