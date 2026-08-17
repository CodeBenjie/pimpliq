import React, { useState } from 'react';
import { ESTIMATOR_ITEMS } from '../data/pimpliqData';
import { Calculator, Check, ArrowRight, ShieldCheck, Sparkles, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface ProposalEstimatorProps {
  onTransferProposal: (summaryText: string) => void;
}

export const ProposalEstimator: React.FC<ProposalEstimatorProps> = ({ onTransferProposal }) => {
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(['est-1', 'est-2']);
  const [scaleMultiplier, setScaleMultiplier] = useState<number>(1.4); // Mid-Market default
  const [timelineMultiplier, setTimelineMultiplier] = useState<number>(1.0); // Standard execution

  const [scaleLabel, setScaleLabel] = useState('Mid-Market Firm (26 - 150 Employees)');
  const [timelineLabel, setTimelineLabel] = useState('Standard Execution (1 Month)');

  const toggleItem = (id: string) => {
    setSelectedItemIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Calculate Investment
  const baseTotal = selectedItemIds.reduce((sum, id) => {
    const item = ESTIMATOR_ITEMS.find(e => e.id === id);
    return sum + (item ? item.baseCost : 0);
  }, 0);

  const estimatedTotal = Math.round(baseTotal * scaleMultiplier * timelineMultiplier);

  const selectedNames = selectedItemIds
    .map(id => ESTIMATOR_ITEMS.find(e => e.id === id)?.name)
    .filter(Boolean);

  const handleTransfer = () => {
    const summary = `Selected Services: ${selectedNames.join(', ') || 'None'}\nOrganization Scale: ${scaleLabel}\nTarget Timeline: ${timelineLabel}\nProjected Investment Range: UGX ${estimatedTotal.toLocaleString()}`;
    onTransferProposal(summary);
  };

  return (
    <section id="estimator" className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--color-gold-bg)] text-[#A4811B] dark:text-[#E8C860] border border-[#D4AF37]/30 mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#D4AF37]" />
            INSTANT SCOPE BUILDER
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight mb-4">
            Interactive Proposal & Cost Estimator
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)]">
            Select your desired professional services to configure an instant scope summary and projected investment estimate.
          </p>
        </div>

        {/* Main Estimator Card */}
        <div className="bg-[var(--bg-card)] rounded-3xl p-6 sm:p-10 border border-[var(--border-color)] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Inputs (8 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1A6B74] text-white text-xs flex items-center justify-center font-bold">1</span>
                  Select Required Services:
                </h3>

                {/* Service Checkboxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {ESTIMATOR_ITEMS.map((item) => {
                    const isChecked = selectedItemIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isChecked
                            ? 'bg-[var(--color-teal-bg)] border-[#1A6B74] text-[#1A6B74] dark:text-[#E8C860]'
                            : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[#1A6B74]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold transition-colors ${
                              isChecked ? 'bg-[#1A6B74] text-white' : 'border border-[var(--border-color)] bg-white dark:bg-gray-800'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-xs sm:text-sm font-semibold">{item.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Scale & Timeline Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                      2. Organization Scale:
                    </label>
                    <select
                      value={scaleMultiplier}
                      onChange={(e) => {
                        setScaleMultiplier(parseFloat(e.target.value));
                        setScaleLabel(e.target.options[e.target.selectedIndex].text);
                      }}
                      className="w-full p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-main)] text-sm font-semibold focus:outline-none focus:border-[#1A6B74]"
                    >
                      <option value={1.0}>Startup / SME (1 - 25 Employees)</option>
                      <option value={1.4}>Mid-Market Firm (26 - 150 Employees)</option>
                      <option value={2.0}>Enterprise / Multinational (150+ Employees)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                      3. Target Timeline:
                    </label>
                    <select
                      value={timelineMultiplier}
                      onChange={(e) => {
                        setTimelineMultiplier(parseFloat(e.target.value));
                        setTimelineLabel(e.target.options[e.target.selectedIndex].text);
                      }}
                      className="w-full p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-main)] text-sm font-semibold focus:outline-none focus:border-[#1A6B74]"
                    >
                      <option value={1.3}>Express Turnaround (2 Weeks)</option>
                      <option value={1.0}>Standard Execution (1 Month)</option>
                      <option value={0.9}>Long-Term Retainer (3+ Months)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Summary Box (5 cols) */}
            <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-lg mb-6 pb-4 border-b border-white/10">
                  <FileText className="w-5 h-5" />
                  <span>Scope Summary</span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-gray-400 font-medium">Services:</span>
                    <span className="font-semibold text-right max-w-[60%] text-gray-200">
                      {selectedNames.length > 0 ? selectedNames.join(', ') : 'None Selected'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium">Company Scale:</span>
                    <span className="font-semibold text-gray-200">{scaleLabel.split('(')[0]}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium">Timeline:</span>
                    <span className="font-semibold text-gray-200">{timelineLabel.split('(')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Projected Investment Range:
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#E8C860] mb-6 tracking-tight">
                  UGX {estimatedTotal.toLocaleString()}
                </div>

                <button
                  onClick={handleTransfer}
                  className="w-full py-3.5 px-5 rounded-full font-bold text-sm text-[#0F172A] bg-gradient-to-r from-[#D4AF37] to-[#E8C860] hover:from-[#E8C860] hover:to-[#D4AF37] shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  Transfer Scope to Form
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
