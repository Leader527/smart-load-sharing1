import { Truck, Package, BarChart3, Check } from 'lucide-react';

interface Props {
  currentStep: number;
}

const steps = [
  { label: 'Trip Details', icon: Truck },
  { label: 'Load Matching', icon: Package },
  { label: 'Optimization', icon: BarChart3 },
];

export default function StepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;
        const Icon = step.icon;

        return (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-all duration-500 ${
                  isCompleted
                    ? 'bg-cyan-600 border-cyan-600 shadow-lg shadow-cyan-500/25'
                    : isCurrent
                      ? 'bg-white border-cyan-500 shadow-lg shadow-cyan-500/15'
                      : 'bg-white border-slate-200'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Icon className={`w-5 h-5 ${isCurrent ? 'text-cyan-600' : 'text-slate-400'}`} />
                )}
              </div>
              <span
                className={`text-xs font-semibold mt-2 transition-colors duration-300 ${
                  isCompleted || isCurrent ? 'text-cyan-700' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`w-16 md:w-24 h-0.5 mx-2 mb-5 rounded-full transition-all duration-500 ${
                  idx < currentStep ? 'bg-cyan-500' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
