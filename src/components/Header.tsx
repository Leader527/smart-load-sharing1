import { Truck, Cpu, Route } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg shadow-cyan-500/20">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              AI-Powered Logistics Optimization
            </h1>
            <p className="text-slate-400 text-sm md:text-base mt-0.5">
              Smart Backhaul Load Matching System
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 mt-6">
          <div className="flex items-center gap-2 text-slate-300 text-sm">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>AI-Driven Matching</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 text-sm">
            <Route className="w-4 h-4 text-teal-400" />
            <span>Route Optimization</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 text-sm">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Fleet Utilization</span>
          </div>
        </div>
      </div>
    </header>
  );
}
