import React from 'react';
import { X, Play, Sparkles, Send, Flame, CheckCircle2, ArrowRight } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDemo: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  isOpen,
  onClose,
  onStartDemo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Guide / Rehnumai</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            OmniClip Engine Kaise Chalayein? (How to Use)
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Sirf 4 asaan steps mein lambi YouTube video ko viral 9:16 vertical shorts mein convert karein:
          </p>
        </div>

        {/* Steps Grid */}
        <div className="space-y-4 mb-6">
          {/* Step 1 */}
          <div className="p-4 bg-zinc-950/70 border border-zinc-800 rounded-2xl flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 font-black text-sm flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>⚡ 1-Click Input ya Demo Load Karein</span>
              </h4>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Upar diye gaye box mein koi bhi **YouTube Video Link** paste karein ya file upload karein. Ya agar turant test karna chahte hain toh <strong>"Load Demo"</strong> / preset buttons (Alex, Dr. Andrew, MrBeast) par click karein.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 bg-zinc-950/70 border border-zinc-800 rounded-2xl flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 font-black text-sm flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🤖 AI Auto-Cut &amp; Virality Score</span>
              </h4>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                <strong>"Repurpose Video"</strong> dabate hi Gemini AI poori video scan karta hai aur sabse high-energy viral moments ko 9:16 vertical cuts mein extract kar deta hai (Har clip ka Virality Score 0-100 bhi milta hai).
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 bg-zinc-950/70 border border-zinc-800 rounded-2xl flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 font-black text-sm flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>📱 9:16 Studio mein Dynamic Captions Dekhein</span>
              </h4>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Smartphone preview ke neeche <strong>"PLAY CLIP"</strong> dabayein. Alex Hormozi aur MrBeast style ke animated colorful bouncing subtitles live play honge. Right side se aap <strong>Styles, Colors, Emojis, aur Text</strong> ko edit kar sakte hain.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 bg-zinc-950/70 border border-zinc-800 rounded-2xl flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black text-sm flex items-center justify-center shrink-0">
              4
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🚀 1-Click Auto-Publish &amp; Schedule</span>
              </h4>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Neeche har platform (TikTok, Reels, Shorts, LinkedIn, X) ke liye tailored captions aur hashtags taiyar hain. <strong>"Direct Auto-Publish / Schedule"</strong> button dabayein, time chunein ya "Publish Now" click karein!
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-zinc-800">
          <span className="text-xs text-zinc-400">
            Abhi demo chala kar check karein:
          </span>

          <button
            onClick={() => {
              onStartDemo();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 hover:from-amber-400 hover:via-rose-400 hover:to-violet-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Chalao (Start Viral Demo)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
