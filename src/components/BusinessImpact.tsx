import { TrendingDown, Fuel, BarChart3, IndianRupee } from 'lucide-react';

const impacts = [
  {
    icon: TrendingDown,
    value: '60%',
    label: 'Reduce Empty Miles',
    color: 'from-cyan-500 to-cyan-600',
    shadow: 'shadow-cyan-500/20',
  },
  {
    icon: Fuel,
    value: '35%',
    label: 'Save Fuel Costs',
    color: 'from-teal-500 to-teal-600',
    shadow: 'shadow-teal-500/20',
  },
  {
    icon: BarChart3,
    value: '85%+',
    label: 'Improve Fleet Utilization',
    color: 'from-emerald-500 to-emerald-600',
    shadow: 'shadow-emerald-500/20',
  },
  {
    icon: IndianRupee,
    value: '2.5x',
    label: 'Revenue per Trip',
    color: 'from-amber-500 to-amber-600',
    shadow: 'shadow-amber-500/20',
  },
];

export default function BusinessImpact() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-lg font-semibold text-white mb-6 text-center">
          Business Impact
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impacts.map((item) => (
            <div
              key={item.label}
              className="relative group bg-slate-800/50 border border-slate-700 rounded-xl p-5 text-center hover:border-slate-600 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} shadow-lg ${item.shadow} mb-3`}
              >
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <div className="text-sm text-slate-400 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
