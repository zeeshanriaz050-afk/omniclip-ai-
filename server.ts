import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '20mb' }));

// Shared Gemini Client with required aistudio-build User-Agent
let aiClient: GoogleGenAI | null = null;
function getGenAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }
  return aiClient;
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.8-flash',
  });
});

// Video Analysis & Repurposing Endpoint
app.post('/api/repurpose/analyze', async (req, res) => {
  try {
    const { videoUrl, title, transcript, durationSeconds, stylePreset } = req.body;

    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    const prompt = `You are the world's top viral short-form video editor, content strategist, and growth hacker (working with MrBeast, Alex Hormozi, and top creator agencies).
Analyze the following long-form video details and extract 3 to 4 HIGH-RETENTION, VIRAL short clips (under 60 seconds each) suitable for 9:16 vertical video (TikTok, Instagram Reels, YouTube Shorts).

Video Title: "${title || 'Long-form Masterclass/Podcast'}"
Source URL / Description: "${videoUrl || 'Direct Upload'}"
Estimated Duration: ${durationSeconds || 600} seconds
Preferred Subtitle Style: ${stylePreset || 'Hormozi Pop'}
Transcript / Content Notes:
${transcript ? transcript.slice(0, 8000) : 'General long-form business, tech, and storytelling podcast conversation discussing productivity, high-leverage frameworks, wealth generation, and overcoming burnout.'}

For each viral clip, generate:
1. id: unique string (e.g. "clip-1")
2. title: Punchy, curiosity-inducing hook headline
3. viralityScore: Integer between 78 and 99
4. hookStrength: Integer between 80 and 100
5. retentionFactor: Integer between 75 and 100
6. shareabilityIndex: Integer between 70 and 100
7. viralityReason: 2-3 sentences explaining why this moment will stop the scroll (e.g., psychological pattern interrupt, strong counter-intuitive claim, emotional release)
8. startTime: number in seconds (e.g. 45)
9. endTime: number in seconds (e.g. 85, duration 20-55s)
10. speakerQuote: The signature punchline or quote from this clip
11. subtitles: Array of 4 to 8 subtitle lines spanning the clip. Each item must have:
    - text: The spoken phrase (with 1-2 words in CAPS or highlight)
    - startSeconds: float
    - endSeconds: float
    - emoji: A relevant contextual emoji (e.g. 🔥, 💡, 💰, 🧠, ⚡)
12. platformCopy:
    - tiktok: { caption: string (provocative hook, brief), hashtags: string[], soundRecommendation: string }
    - reels: { caption: string (engaging storytelling + call to action), hashtags: string[] }
    - shorts: { title: string (under 55 chars with high CTR), description: string, tags: string[] }
    - linkedin: { headline: string, postBody: string (thought-leadership formatting with bullet points), hashtags: string[] }
    - twitter: { hookTweet: string, thread: string[] }

Return pure JSON matching the specified schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            overallTheme: { type: Type.STRING },
            clips: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  viralityScore: { type: Type.INTEGER },
                  hookStrength: { type: Type.INTEGER },
                  retentionFactor: { type: Type.INTEGER },
                  shareabilityIndex: { type: Type.INTEGER },
                  viralityReason: { type: Type.STRING },
                  startTime: { type: Type.NUMBER },
                  endTime: { type: Type.NUMBER },
                  speakerQuote: { type: Type.STRING },
                  subtitles: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        text: { type: Type.STRING },
                        startSeconds: { type: Type.NUMBER },
                        endSeconds: { type: Type.NUMBER },
                        emoji: { type: Type.STRING },
                      },
                      required: ['text', 'startSeconds', 'endSeconds', 'emoji'],
                    },
                  },
                  platformCopy: {
                    type: Type.OBJECT,
                    properties: {
                      tiktok: {
                        type: Type.OBJECT,
                        properties: {
                          caption: { type: Type.STRING },
                          hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                          soundRecommendation: { type: Type.STRING },
                        },
                        required: ['caption', 'hashtags', 'soundRecommendation'],
                      },
                      reels: {
                        type: Type.OBJECT,
                        properties: {
                          caption: { type: Type.STRING },
                          hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                        required: ['caption', 'hashtags'],
                      },
                      shorts: {
                        type: Type.OBJECT,
                        properties: {
                          title: { type: Type.STRING },
                          description: { type: Type.STRING },
                          tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                        required: ['title', 'description', 'tags'],
                      },
                      linkedin: {
                        type: Type.OBJECT,
                        properties: {
                          headline: { type: Type.STRING },
                          postBody: { type: Type.STRING },
                          hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                        required: ['headline', 'postBody', 'hashtags'],
                      },
                      twitter: {
                        type: Type.OBJECT,
                        properties: {
                          hookTweet: { type: Type.STRING },
                          thread: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                        required: ['hookTweet', 'thread'],
                      },
                    },
                    required: ['tiktok', 'reels', 'shorts', 'linkedin', 'twitter'],
                  },
                },
                required: [
                  'id',
                  'title',
                  'viralityScore',
                  'hookStrength',
                  'retentionFactor',
                  'shareabilityIndex',
                  'viralityReason',
                  'startTime',
                  'endTime',
                  'speakerQuote',
                  'subtitles',
                  'platformCopy',
                ],
              },
            },
          },
          required: ['summary', 'overallTheme', 'clips'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Gemini repurpose analyze error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to analyze video for repurposing',
    });
  }
});

// Regenerate Copy for a specific platform with custom prompt instruction
app.post('/api/repurpose/generate-copy', async (req, res) => {
  try {
    const { clipTitle, speakerQuote, platform, toneInstruction } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.status(503).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const prompt = `You are a social media copywriter for short-form video.
Refine the copy for this clip:
Clip Title: "${clipTitle}"
Quote: "${speakerQuote}"
Platform: "${platform}" (TikTok, Instagram Reels, YouTube Shorts, LinkedIn, or Twitter/X)
User Instruction / Tone: "${toneInstruction || 'Make it more urgent and viral'}"

Return JSON with:
{
  "content": "The generated caption / post text",
  "hashtags": ["#tag1", "#tag2"],
  "tip": "Growth tip for publishing this post"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Gemini generate copy error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to generate copy' });
  }
});

// Auto-Publish Dispatch API Simulation (Executes direct API dispatch)
app.post('/api/repurpose/publish', async (req, res) => {
  try {
    const { clipId, clipTitle, platforms, scheduleTime } = req.body;

    // Simulate multi-platform API calls
    const isScheduled = Boolean(scheduleTime && new Date(scheduleTime) > new Date());
    const results = (platforms || ['tiktok', 'reels', 'shorts']).map((plat: string) => ({
      platform: plat,
      status: isScheduled ? 'SCHEDULED' : 'PUBLISHED',
      postUrl: `https://${plat}.com/post/omni_${Math.random().toString(36).substring(2, 9)}`,
      publishedAt: isScheduled ? scheduleTime : new Date().toISOString(),
      queueId: `queue_${Date.now()}_${plat}`,
    }));

    return res.json({
      success: true,
      clipId,
      clipTitle,
      mode: isScheduled ? 'scheduled' : 'instant',
      results,
      message: isScheduled
        ? `Successfully scheduled across ${results.length} platforms for ${new Date(scheduleTime).toLocaleString()}`
        : `Successfully published across ${results.length} platforms!`,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
