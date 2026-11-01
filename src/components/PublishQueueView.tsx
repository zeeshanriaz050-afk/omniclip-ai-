import React, { useState } from 'react';
import { 
  CalendarClock, 
  CheckCircle2, 
  Clock, 
  Send, 
  Trash2, 
  ExternalLink, 
  Filter, 
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { ScheduledPost, PlatformId } from '../types';

interface PublishQueueViewProps {
  posts: ScheduledPost[];
  onPublishNow: (postId: string) => void;
  onDeletePost: (postId: string) => void;
  onClearAll: () => void;
}

export const PublishQueueView: React.FC<PublishQueueViewProps> = ({
  posts,
  onPublishNow,
  onDeletePost,
  onClearAll,
}) => {
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'published'>('all');

  const filteredPosts = posts.filter((p) => {
    if (platformFilter !== 'all' && p.platform !== platformFilter) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    return true;
  });

  const scheduledCount = posts.filter((p) => p.status === 'scheduled').length;
  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const totalImpressions = posts.reduce((sum, p) => sum + (p.estimatedViews || 0), 0);

  const getPlatformIcon = (platform: PlatformId) => {
    switch (platform) {
      case 'tiktok':
        return '🎵 TikTok';
      case 'reels':
        return '📸 Instagram Reels';
      case 'shorts':
        return '🔴 YouTube Shorts';
      case 'linkedin':
        return '💼 LinkedIn';
      case 'twitter':
        return '🐦 X (Twitter)';
      default:
        return platform;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
              Scheduled in Queue
            </div>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {scheduledCount} <span className="text-xs text-zinc-500 font-normal">posts</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <CalendarClock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
              Auto-Published Total
            </div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {publishedCount} <span className="text-xs text-zinc-500 font-normal">posts</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
              Est. Cross-Channel Views
            </div>
            <div className="text-2xl font-black text-violet-400 mt-1">
              {totalImpressions.toLocaleString()}+
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Controls Header */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Platform:</span>
          </span>

          {['all', 'tiktok', 'reels', 'shorts', 'linkedin', 'twitter'].map((p) => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                platformFilter === p
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Status filter */}
          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
            {(['all', 'scheduled', 'published'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium transition-all ${
                  statusFilter === s
                    ? 'bg-zinc-800 text-white shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {posts.length > 0 && (
            <button
              onClick={onClearAll}
              className="p-1.5 rounded-lg bg-zinc-950 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 border border-zinc-800 transition-colors"
              title="Clear all posts"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <div className="bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <CalendarClock className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-zinc-200">
            No posts found in this queue view
          </h4>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Head to the Studio, select any viral 9:16 clip, and click "Auto-Publish or Schedule" to queue your multi-platform drops!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPosts.map((post) => {
            const isScheduled = post.status === 'scheduled';
            const releaseDate = new Date(post.scheduledFor);

            return (
              <div
                key={post.id}
                className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-zinc-700"
              >
                <div className="flex items-start gap-3.5 flex-1">
                  {/* Platform Icon Badge */}
                  <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-black uppercase text-amber-400">
                      {post.platform.slice(0, 2)}
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono">9:16</span>
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-extrabold text-white">
                        {getPlatformIcon(post.platform)}
                      </span>

                      {/* Status Chip */}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isScheduled
                            ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                            : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                        }`}
                      >
                        {isScheduled ? 'Scheduled Auto-Drop' : 'Published'}
                      </span>

                      {/* Time readout */}
                      <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <span>{releaseDate.toLocaleString()}</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-semibold text-zinc-200 line-clamp-1">
                      {post.clipTitle}
                    </h4>

                    <p className="text-xs text-zinc-400 line-clamp-2 max-w-2xl font-sans">
                      {post.copy}
                    </p>
                  </div>
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {isScheduled ? (
                    <button
                      onClick={() => onPublishNow(post.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold transition-all flex items-center gap-1.5 shadow"
                    >
                      <Send className="w-3.5 h-3.5 fill-black" />
                      <span>Drop Now</span>
                    </button>
                  ) : (
                    <a
                      href={post.postUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 hover:text-white transition-all flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                      <span>View Post</span>
                    </a>
                  )}

                  <button
                    onClick={() => onDeletePost(post.id)}
                    className="p-2 rounded-xl bg-zinc-950 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 border border-zinc-800 transition-colors"
                    title="Remove from queue"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
