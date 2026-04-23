import { useState } from 'react';
import Header from './components/Header';
import BusinessImpact from './components/BusinessImpact';
import StepIndicator from './components/StepIndicator';
import TruckInputForm from './components/TruckInputForm';
import LoadSuggestions from './components/LoadSuggestions';
import OptimizationDashboard from './components/OptimizationDashboard';
import {
  generateLoadSuggestions,
  calculateOptimization,
  type TruckInput,
  type LoadSuggestion,
  type OptimizationResult,
} from './data';

export default function App() {
  const [step, setStep] = useState(0);
  const [truckInput, setTruckInput] = useState<TruckInput | null>(null);
  const [suggestions, setSuggestions] = useState<LoadSuggestion[]>([]);
  const [selectedLoad, setSelectedLoad] = useState<LoadSuggestion | null>(null);
  const [optimization, setOptimization] = useState<OptimizationResult | null>(null);

  const handleTruckSubmit = (input: TruckInput) => {
    setTruckInput(input);
    setSuggestions(generateLoadSuggestions(input));
    setStep(1);
  };

  const handleLoadSelect = (load: LoadSuggestion) => {
    setSelectedLoad(load);
    if (truckInput) {
      setOptimization(calculateOptimization(truckInput, load));
    }
    setStep(2);
  };

  const handleReset = () => {
    setStep(0);
    setTruckInput(null);
    setSuggestions([]);
    setSelectedLoad(null);
    setOptimization(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-10">
        <StepIndicator currentStep={step} />

        {step === 0 && <TruckInputForm onSubmit={handleTruckSubmit} />}

        {step === 1 && truckInput && (
          <LoadSuggestions
            suggestions={suggestions}
            truckInput={truckInput}
            onSelect={handleLoadSelect}
          />
        )}

        {step === 2 && optimization && selectedLoad && truckInput && (
          <OptimizationDashboard
            result={optimization}
            selectedLoad={selectedLoad}
            truckInput={truckInput}
            onReset={handleReset}
          />
        )}
      </main>
      <BusinessImpact />
    </div>
  );
}
