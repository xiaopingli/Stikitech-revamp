
import React, { useState } from 'react';
import { getSolutionRecommendation } from '../services/geminiService';

const AISolutionArchitect: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await getSolutionRecommendation(input);
      setResponse(res || 'Unable to generate recommendation at this time.');
    } catch (err) {
      setResponse('Expert connection interrupted. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-charcoal text-white p-8 rounded-lg shadow-2xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2 flex items-center">
          <span className="mr-2">🤖</span> StikiAI Solution Architect
        </h3>
        <p className="text-slate-400 text-sm">Describe your security project requirements to receive a professional hardware and software stack recommendation.</p>
      </div>

      <div className="flex flex-col space-y-4">
        <textarea
          className="bg-slate-800 border border-slate-700 rounded p-4 text-sm focus:outline-none focus:border-stikiRed transition-all h-32"
          placeholder="e.g. 'I need a 500-camera system for a logistics hub with high-bandwidth throughput and 30-day retention...'"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className={`bg-stikiRed hover:bg-white hover:text-stikiRed text-white font-bold py-3 px-6 rounded transition-all flex justify-center items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
              Architecting Solution...
            </span>
          ) : 'Generate Technical Recommendation'}
        </button>
      </div>

      {response && (
        <div className="mt-8 p-6 bg-slate-900 border-l-4 border-stikiRed rounded text-slate-200 prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{response}</div>
        </div>
      )}
    </div>
  );
};

export default AISolutionArchitect;
