import VCCard from "./VCCard";
import { useVCContext } from "../context/VCContext";

const VCGridSkeleton = () => (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
            <div
                key={i}
                className="h-[340px] rounded-2xl
                border border-slate-800
                bg-gradient-to-b from-slate-900 to-slate-950
                animate-pulse"
            >
                <div className="p-5 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-slate-800" />
                    <div className="h-4 w-2/3 bg-slate-800 rounded" />
                    <div className="h-3 w-full bg-slate-800 rounded" />
                    <div className="h-3 w-4/5 bg-slate-800 rounded" />
                </div>
            </div>
        ))}
    </div>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-lg font-semibold text-white">
            No VC firms found
        </p>
        <p className="mt-2 text-sm text-slate-400 max-w-md">
            Once investor profiles are added, they’ll appear here for discovery and matching.
        </p>
    </div>
);

const ErrorState = ({ message }) => (
    <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-lg font-semibold text-red-400">
            Something went wrong
        </p>
        <p className="mt-2 text-sm text-slate-400">
            {message}
        </p>
    </div>
);

const AllVCs = () => {
    const { vcs, loading, error } = useVCContext();

    return (
        <div className="min-h-screen bg-background pt-28 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-foreground">
                        Venture Capital Firms
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Discover and explore investors aligned with your startup.
                    </p>
                </div>

                {loading && <VCGridSkeleton />}

                {!loading && error && (
                    <ErrorState message={error} />
                )}

                {!loading && !error && vcs.length === 0 && (
                    <EmptyState />
                )}

                {!loading && !error && vcs.length > 0 && (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {vcs.map(vc => (
                            <VCCard key={vc.id} vc={vc} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllVCs;
