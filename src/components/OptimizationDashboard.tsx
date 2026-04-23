import { TrendingDown, Fuel, BarChart3, IndianRupee, ArrowRight, MapPin, RotateCcw } from 'lucide-react';
import type { OptimizationResult, LoadSuggestion, TruckInput } from '../data';

interface Props {
  result: OptimizationResult;
  selectedLoad: LoadSuggestion;
  truckInput: TruckInput;
  onReset: () => void;
}

function MetricCard({
  icon: Icon,
  label,
  value,
  unit,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
  color: string;
  delay: number;
}) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 hover:-translate-y-0.5 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm font-medium text-slate-500">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-slate-900">{value.toLocaleString()}</span>
        <span className="text-sm font-medium text-slate-400">{unit}</span>
      </div>
    </div>
  );
}

function BarChart({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-slate-600 w-40">{label}</span>
      <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden relative">
        <div
          className={`h-full rounded-lg bg-gradient-to-r ${color} transition-all duration-1000 ease-out flex items-center justify-end pr-3`}
          style={{ width: `${value}%` }}
        >
          <span className="text-xs font-bold text-white drop-shadow-sm">{value}%</span>
        </div>
      </div>
    </div>
  );
}

export default function OptimizationDashboard({ result, selectedLoad, truckInput, onReset }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 mb-4">
          <BarChart3 className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Optimization Results</h2>
        <p className="text-slate-500 mt-1">Your trip has been optimized for maximum efficiency</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <MapPin className="w-4 h-4 text-cyan-500" />
          <span className="font-semibold text-slate-700">{truckInput.sourceCity}</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-700">{truckInput.destinationCity}</span>
          <ArrowRight className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold text-emerald-700">{selectedLoad.destinationCity}</span>
          <span className="ml-2 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-xs font-medium">
            Return Load
          </span>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mb-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-cyan-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Route Map</span>
          </div>
          <div className="relative h-24 bg-gradient-to-r from-cyan-50 via-teal-50 to-emerald-50 rounded-lg border border-slate-200 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-between px-8">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-cyan-500 border-2 border-white shadow-md" />
                <span className="text-xs font-semibold text-slate-600 mt-1">{truckInput.sourceCity}</span>
              </div>
              <div className="flex-1 mx-4 relative">
                <div className="absolute top-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-slate-300" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-300 rounded-full px-2 py-0.5">
                  <span className="text-[10px] font-bold text-slate-500">OUTBOUND</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-slate-500 border-2 border-white shadow-md" />
                <span className="text-xs font-semibold text-slate-600 mt-1">{truckInput.destinationCity}</span>
              </div>
              <div className="flex-1 mx-4 relative">
                <div className="absolute top-2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-300" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-emerald-300 rounded-full px-2 py-0.5">
                  <span className="text-[10px] font-bold text-emerald-600">RETURN</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-md" />
                <span className="text-xs font-semibold text-slate-600 mt-1">{selectedLoad.destinationCity}</span>
              </div>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <span className="text-[10px] text-slate-400">Round trip optimized with return load</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          icon={TrendingDown}
          label="Empty Distance Reduced"
          value={result.emptyDistanceReduced}
          unit="%"
          color="bg-gradient-to-br from-cyan-500 to-cyan-600"
          delay={0}
        />
        <MetricCard
          icon={Fuel}
          label="Fuel Saved"
          value={result.fuelSaved}
          unit="INR"
          color="bg-gradient-to-br from-teal-500 to-teal-600"
          delay={80}
        />
        <MetricCard
          icon={BarChart3}
          label="Truck Utilization"
          value={result.truckUtilization}
          unit="%"
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          delay={160}
        />
        <MetricCard
          icon={IndianRupee}
          label="Estimated Profit"
          value={result.estimatedProfit}
          unit="INR"
          color="bg-gradient-to-br from-amber-500 to-amber-600"
          delay={240}
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 mb-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Performance Breakdown</h3>
        <div className="space-y-4">
          <BarChart value={result.emptyDistanceReduced} label="Empty Distance Reduced" color="from-cyan-500 to-cyan-400" />
          <BarChart value={result.truckUtilization} label="Truck Utilization" color="from-emerald-500 to-emerald-400" />
          <BarChart value={Math.min(95, Math.round(result.fuelSaved / 50))} label="Fuel Efficiency" color="from-teal-500 to-teal-400" />
          <BarChart value={Math.min(90, Math.round(result.estimatedProfit / 200))} label="Profitability Index" color="from-amber-500 to-amber-400" />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          Start New Search
        </button>
      </div>
    </div>
  );
}
