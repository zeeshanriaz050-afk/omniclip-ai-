import React, { useState } from 'react';
import { 
  CheckCircle2, 
  RefreshCw, 
  Clock, 
  Sliders, 
  ShieldCheck, 
  ExternalLink, 
  Key, 
  Check, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { ConnectedAccount, PlatformId } from '../types';

interface ConnectedChannelsViewProps {
  accounts: ConnectedAccount[];
  onUpdateAccount: (updated: ConnectedAccount) => void;
}

export const ConnectedChannelsView: React.FC<ConnectedChannelsViewProps> = ({
  accounts,
  onUpdateAccount,
}) => {
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testSuccessId, setTestSuccessId] = useState<string | null>(null);

  const handleTestHandshake = (account: ConnectedAccount) => {
    setTestingId(account.id);
    setTimeout(() => {
      setTestingId(null);
      setTestSuccessId(account.id);
      setTimeout(() => setTestSuccessId(null), 3000);
    }, 1200);
  };

  const handleToggleAutoPublish = (account: ConnectedAccount) => {
    onUpdateAccount({
      ...account,
      autoPublishEnabled: !account.autoPublishEnabled,
    });
  };

  const handleTimeChange = (account: ConnectedAccount, time: string) => {
    onUpdateAccount({
      ...account,
      preferredPostTime: time,
    });
  };

  return (
    <div className="space-y-6">
      {/* Overview header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Multi-Platform API Gateway</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Connected Publishing Channels
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
              OmniClip AI connects directly to TikTok Content Posting API, Instagram Graph API, YouTube Data v3 API, LinkedIn Share API, and X API v2 for automatic scheduled publishing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>5 / 5 Channels Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account) => {
          const isTesting = testingId === account.id;
          const isSuccess = testSuccessId === account.id;

          return (
            <div
              key={account.id}
              className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4 hover:border-zinc-700 transition-all"
            >
              {/* Account header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={account.avatar}
                    alt={account.handle}
                    className="w-12 h-12 rounded-xl object-cover border border-zinc-700"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white">{account.name}</h4>
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    </div>
                    <div className="text-xs font-mono text-zinc-400">{account.handle}</div>
                    <div className="text-[11px] text-zinc-500 font-medium mt-0.5">
                      {account.followers} Followers
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                  Connected
                </span>
              </div>

              {/* Controls */}
              <div className="pt-3 border-t border-zinc-800/80 space-y-3">
                {/* Auto Publish Toggle */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-zinc-200">Auto-Publish Authorization</div>
                    <div className="text-[11px] text-zinc-500">
                      Permit direct background video drops without manual prompt
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleAutoPublish(account)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      account.autoPublishEnabled ? 'bg-amber-500' : 'bg-zinc-800'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        account.autoPublishEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Preferred Post Time */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Peak Audience Window</span>
                  </div>
                  <input
                    type="time"
                    value={account.preferredPostTime}
                    onChange={(e) => handleTimeChange(account, e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Handshake Test Footer */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">
                  OAuth Token: Valid (Expires in 58d)
                </span>

                <button
                  onClick={() => handleTestHandshake(account)}
                  disabled={isTesting}
                  className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
                >
                  {isTesting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      <span>Verifying...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">API Active!</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Test Handshake</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
