import React from 'react';

const SourceConflictModal = ({ isOpen, onClose, report, onResolveGitHub, onResolveSheet }) => {
  if (!isOpen || !report) return null;
  const isDrift = report.hasDrift;

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className={`p-6 border-b border-slate-800 flex justify-between items-center ${isDrift ? 'bg-red-900/20' : 'bg-blue-900/20'}`}>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <i className={`fa-solid ${isDrift ? 'fa-triangle-exclamation text-red-500' : 'fa-code-merge text-blue-400'}`}></i>
              {isDrift ? 'Data Drift Gevonden!' : 'GitHub Repository Gevonden'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isDrift ? 'Er zijn inhoudelijke verschillen tussen lokaal en GitHub.' : 'Deze site is gekoppeld aan GitHub. Wil je de laatste versie ophalen?'}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-xl">&times;</button>
        </div>

        <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4">
          {isDrift ? (
            Object.entries(report.files).map(([fileName, fileReport]) => (
              fileReport.drift && (
                <div key={fileName} className="p-4 rounded-xl border border-slate-700 bg-slate-800/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-sm text-violet-400">{fileName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                      Verschil gedetecteerd
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    De versie op GitHub bevat andere data dan je lokale bestanden.
                  </p>
                </div>
              )
            ))
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-cloud-arrow-down text-2xl text-blue-400"></i>
              </div>
              <p className="text-sm text-slate-300">
                Je lokale bestanden lijken in sync, maar het is een goede gewoonte om even te <strong>Syncen</strong> zodat je zeker weet dat je op de allerlaatste versie werkt.
              </p>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-800/30 border-t border-slate-800 space-y-4">
          <div className="flex gap-2 text-[11px] text-amber-300 bg-amber-900/20 p-3 rounded-lg border border-amber-900/30">
            <i className="fa-solid fa-shield-halved mt-0.5 text-amber-500"></i>
            <div>
               <p className="font-bold">Safety First:</p>
               <p>Bij het syncen wordt er <strong>automatisch een backup</strong> gemaakt van je huidige lokale JSON bestanden.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
                onClick={onResolveGitHub}
                className="flex-1 py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20 transition-all font-bold text-sm flex items-center justify-center gap-2"
            >
                <i className="fa-solid fa-cloud-arrow-down"></i>
                Sync from GitHub
            </button>
            <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-bold text-sm"
            >
                Negeren & Doorgaan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceConflictModal;
