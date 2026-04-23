import { ArrowRight, Package, MapPin, Info, Star, CheckCircle2, ChevronRight } from 'lucide-react';
import type { LoadSuggestion, TruckInput } from '../data';

interface Props {
  suggestions: LoadSuggestion[];
  truckInput: TruckInput;
  onSelect: (load: LoadSuggestion) => void;
}

function MatchScoreBadge({ score }: { score: number }) {
  const color =
    score >= 90
      ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
      : score >= 75
        ? 'bg-cyan-100 text-cyan-700 border-cyan-200'
        : 'bg-amber-100 text-amber-700 border-amber-200';

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${color}`}>
      <Star className="w-3 h-3" />
      {score}% Match
    </span>
  );
}

export default function LoadSuggestions({ suggestions, truckInput, onSelect }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg shadow-teal-500/20 mb-4">
          <Package className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">AI Load Suggestions</h2>
        <p className="text-slate-500 mt-1">
          Return loads from <span className="font-semibold text-slate-700">{truckInput.destinationCity}</span> based on your route
        </p>
      </div>

      <div className="space-y-4">
        {suggestions.map((load, idx) => (
          <div
            key={load.id}
            className={`relative bg-white rounded-2xl border shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl group ${
              load.isRecommended
                ? 'border-cyan-300 shadow-cyan-500/10 ring-1 ring-cyan-200'
                : 'border-slate-200 shadow-slate-200/50'
            }`}
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {load.isRecommended && (
              <div className="absolute -top-3 left-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/25">
                  <CheckCircle2 className="w-3 h-3" />
                  Recommended
                </span>
              </div>
            )}

            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-teal-500" />
                    <span className="font-bold text-lg text-slate-900">{load.sourceCity}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <span className="font-bold text-lg text-slate-900">{load.destinationCity}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                      {load.loadType}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                      {load.weight}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                      {load.company}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Info className="w-3.5 h-3.5" />
                    <span className="font-medium text-slate-600">Why this load?</span>
                    {load.reasons.map((r, i) => (
                      <span key={i} className="text-xs text-slate-400">
                        {i > 0 && <span className="mx-1">·</span>}
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 md:min-w-[180px]">
                  <MatchScoreBadge score={load.matchScore} />
                  <div className="text-right">
                    <div className="text-sm text-slate-500">{load.distance} km</div>
                    <div className="text-xl font-bold text-slate-900">
                      ₹{load.estimatedProfit.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">est. profit</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => onSelect(load)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold text-sm shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Select Load
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
