import { useEffect, useState } from "react";
import { useUpload } from "../context/UploadContext.jsx";
import PitchCard from "./PitchCard.jsx";
import UploadPitchModal from "./UploadPitchModal.jsx";

const MyPitches = () => {
    const { pitches, loading, error, fetchPitches } = useUpload();
    const [openUpload, setOpenUpload] = useState(false);

    useEffect(() => {
        fetchPitches();
    }, [fetchPitches]);

    const openUploadModal = () => setOpenUpload(true);
    const closeUploadModal = () => setOpenUpload(false);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
                Loading pitches...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center text-destructive">
                {error}
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-background px-8 py-10 pt-28 transition-colors duration-500">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold text-foreground">
                                Your Startups
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                Manage your pitch decks and track investor readiness.
                            </p>
                        </div>

                        {/* OPEN MODAL */}
                        <button
                            onClick={openUploadModal}
                            className="rounded-lg bg-primary hover:bg-primary/90 transition px-4 py-2 text-sm font-medium text-white"
                        >
                            + New Pitch
                        </button>
                    </div>

                    {/* Pitch Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {pitches.map((pitch) => (
                            <PitchCard key={pitch.id} {...pitch} />
                        ))}

                        {/* Create New Pitch Card */}
                        <button
                            onClick={openUploadModal}
                            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition min-h-[340px]"
                        >
                            <span className="text-4xl mb-2">+</span>
                            <span className="text-sm font-medium">
                                Create New Pitch
                            </span>
                            <span className="text-xs mt-1">
                                Start your analysis journey
                            </span>
                        </button>
                    </div>

                    {/* Empty state CTA */}
                    {pitches.length === 0 && (
                        <p
                            onClick={openUploadModal}
                            className="cursor-pointer text-center text-muted-foreground hover:text-primary transition"
                        >
                            No pitches yet. Create your first one 🚀
                        </p>
                    )}
                </div>
            </div>

            {/* Upload Modal */}
            <UploadPitchModal
                open={openUpload}
                onClose={closeUploadModal}
            />
        </>
    );
};

export default MyPitches;
