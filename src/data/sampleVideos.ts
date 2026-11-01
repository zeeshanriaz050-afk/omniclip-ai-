import { VideoProject } from '../types';

export const SAMPLE_VIDEOS: VideoProject[] = [
  {
    id: 'sample-hormozi',
    title: 'Alex Hormozi: The $100M Offer Blueprint & Why Most Businesses Fail',
    sourceUrl: 'https://www.youtube.com/watch?v=0kH8K2p6qXs',
    speakerName: 'Alex Hormozi',
    category: 'Business & Entrepreneurship',
    durationSeconds: 1420,
    summary:
      'A masterclass on high-ticket pricing, eliminating market commoditization, and delivering 10x value rather than competing on price discounts.',
    overallTheme: 'Value Creation & Pricing Psychology',
    createdAt: new Date().toISOString(),
    status: 'ready',
    transcript: `Look, most founders lose because they compete on price. Price is a race to the bottom that only the person with the deepest pockets can win.
Instead of discounting, make the offer so good that people feel stupid saying no.
How do you do that? Increase the dream outcome, maximize perceived likelihood of achievement, cut the time delay to zero, and eliminate effort and sacrifice.
If you deliver a million dollars in value and charge ten thousand, they will thank you forever. Stop underpricing yourself out of fear.
You are not paid for how hard you work; you are paid for the leverage and clarity you bring to the table.`,
    clips: [
      {
        id: 'hormozi-clip-1',
        title: 'Why Price Cutting Is Financial Suicide',
        viralityScore: 97,
        hookStrength: 98,
        retentionFactor: 95,
        shareabilityIndex: 96,
        viralityReason:
          'Opens with high-conviction contrarian statement breaking conventional sales wisdom. Immediate punchline in first 3 seconds triggers high comment debates.',
        startTime: 12,
        endTime: 42,
        speakerQuote: 'Price is a race to the bottom that you will lose.',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-businessman-talking-to-camera-in-office-42861-large.mp4',
        layout: 'face-tracking',
        aspectRatio: '9:16',
        subtitles: [
          { text: 'MOST FOUNDERS LOSE', startSeconds: 0, endSeconds: 2.2, emoji: '💀' },
          { text: 'because they compete on PRICE', startSeconds: 2.3, endSeconds: 5.1, emoji: '📉' },
          { text: 'Price is a RACE to the bottom', startSeconds: 5.2, endSeconds: 8.4, emoji: '🚨' },
          { text: 'that only giant corporations WIN', startSeconds: 8.5, endSeconds: 12.0, emoji: '🏢' },
          { text: 'Make your OFFER so good', startSeconds: 12.1, endSeconds: 15.6, emoji: '💎' },
          { text: 'people feel STUPID saying no!', startSeconds: 15.7, endSeconds: 19.8, emoji: '🧠' },
          { text: 'Charge for VALUE, not time!', startSeconds: 19.9, endSeconds: 24.5, emoji: '💰' },
        ],
        platformCopy: {
          tiktok: {
            caption: 'Stop discounting your business into bankruptcy. Here is the $100M offer rule 🧠',
            hashtags: ['#businesshacks', '#alexhormozi', '#entreprenuership', '#salesstrategy', '#wealthmindset'],
            soundRecommendation: 'Original Speech - Trending Business Phonk',
          },
          reels: {
            caption: 'The moment you drop your prices, you tell your customer you are not worth it. 📉\n\nInstead: \n1. 10x your dream outcome\n2. Minimize time to result\n3. Eliminate customer friction\n\nSave this framework before your next client pitch 📌',
            hashtags: ['#hormozimindset', '#businessgrowth', '#agencyowner', '#pricingstrategy', '#salesfunnel'],
          },
          shorts: {
            title: 'Why 99% of Businesses Die In 2 Years 💀',
            description: 'Alex Hormozi breaks down why competing on price is a death trap for startups. Learn the 4 levers of high-ticket offers.',
            tags: ['#Shorts', '#Business', '#Hormozi', '#Entrepreneur', '#Pricing'],
          },
          linkedin: {
            headline: 'The single most expensive mistake founders make: Competing on price.',
            postBody: 'When you lower prices, you attract the most demanding clients with the lowest lifetime value.\n\nHere is what top 1% operators do instead:\n\n• Sell the Dream Outcome, not the deliverables\n• Cut perceived risk to absolute zero\n• Reduce the time-to-first-win from weeks to hours\n\nPrice is what they pay. Value is what they get.',
            hashtags: ['#Leadership', '#Entrepreneurship', '#SaaS', '#SalesStrategy', '#Scaling'],
          },
          twitter: {
            hookTweet: 'Price cutting is a race to the bottom you cannot afford to win.\n\nHere is the 4-part framework Alex Hormozi uses to charge 10x more and close faster 🧵👇',
            thread: [
              '1/ Stop pricing by hour or deliverable. Charge based on the monetary value of the transformation.',
              '2/ Increase likelihood of achievement with ironclad guarantees or milestone-based delivery.',
              '3/ Cut friction. If competitors take 30 days, automate the first deliverable in 48 hours.',
            ],
          },
        },
      },
      {
        id: 'hormozi-clip-2',
        title: 'You Are Not Paid For Working Hard',
        viralityScore: 92,
        hookStrength: 94,
        retentionFactor: 89,
        shareabilityIndex: 93,
        viralityReason:
          'Provocative truth bomb challenging the hustle culture myth, highly shareable on LinkedIn and Reels.',
        startTime: 78,
        endTime: 108,
        speakerQuote: 'You are paid for the leverage and clarity you bring.',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-having-an-online-meeting-with-a-laptop-42862-large.mp4',
        layout: 'split-screen',
        aspectRatio: '9:16',
        subtitles: [
          { text: 'Nobody cares how HARD you worked', startSeconds: 0, endSeconds: 2.8, emoji: '⏳' },
          { text: 'They only care about the RESULT', startSeconds: 2.9, endSeconds: 5.6, emoji: '🎯' },
          { text: 'A ditch digger works 14 hours a day', startSeconds: 5.7, endSeconds: 9.3, emoji: '⛏️' },
          { text: 'A hedge fund manager works 4 hours', startSeconds: 9.4, endSeconds: 13.0, emoji: '📈' },
          { text: 'The difference is LEVERAGE', startSeconds: 13.1, endSeconds: 16.5, emoji: '⚡' },
          { text: 'Code, Capital, Content & Labor', startSeconds: 16.6, endSeconds: 20.4, emoji: '🚀' },
          { text: 'Build leverage or stay stuck.', startSeconds: 20.5, endSeconds: 24.0, emoji: '🔑' },
        ],
        platformCopy: {
          tiktok: {
            caption: 'Working 16 hours a day is not a flex if your leverage is zero. Watch till end.',
            hashtags: ['#hardwork', '#leverage', '#successquotes', '#wealthbuilding', '#moneytalks'],
            soundRecommendation: 'Slowed Cinematic Strings',
          },
          reels: {
            caption: 'Hard work is the baseline. Leverage is the multiplier. 🔑\n\nIf effort equaled wealth, construction workers would be billionaires. Shift from trading hours to owning distribution, systems, and IP.',
            hashtags: ['#mindsetshift', '#worksmart', '#productivitytips', '#financialfreedom', '#businessadvice'],
          },
          shorts: {
            title: 'The Brutal Truth About Hard Work vs Leverage ⚡',
            description: 'Why working 80 hours a week will not make you rich without permissionless leverage.',
            tags: ['#Shorts', '#Motivation', '#CareerAdvice', '#Success'],
          },
          linkedin: {
            headline: 'Working 80 hours a week without leverage is just glorified exhaustion.',
            postBody: 'Four forms of leverage to multiply your output in 2026:\n1. Code (software works while you sleep)\n2. Media (content distributes infinitely at zero marginal cost)\n3. Capital (money earning money)\n4. People (specialized talent executing vision)\n\nWhich leverage lever are you pulling this quarter?',
            hashtags: ['#CareerDevelopment', '#ExecutiveLeadership', '#Productivity', '#FutureOfWork'],
          },
          twitter: {
            hookTweet: 'Effort without leverage is just loud failure.\n\nThe 4 levers that separate 6-figure workers from 8-figure operators:',
            thread: [
              '1/ Code: Build automated software pipelines that scale infinitely.',
              '2/ Content: One video can be watched by 10 million people with zero added cost.',
              '3/ Capital: Investing compounding resources into high-ROI assets.',
            ],
          },
        },
      },
      {
        id: 'hormozi-clip-3',
        title: 'The 10-Second Rule To Kill Procrastination',
        viralityScore: 94,
        hookStrength: 96,
        retentionFactor: 93,
        shareabilityIndex: 94,
        viralityReason:
          'Actionable self-improvement tactic with immediate utility; viewers save the reel to watch again.',
        startTime: 145,
        endTime: 175,
        speakerQuote: 'Action creates motivation, not the other way around.',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-thoughtful-man-looking-at-a-laptop-42863-large.mp4',
        layout: 'face-tracking',
        aspectRatio: '9:16',
        subtitles: [
          { text: 'Waiting to FEEL ready is a trap', startSeconds: 0, endSeconds: 2.7, emoji: '🪤' },
          { text: 'Action creates MOTIVATION', startSeconds: 2.8, endSeconds: 5.7, emoji: '🔥' },
          { text: 'Never the other way around!', startSeconds: 5.8, endSeconds: 8.9, emoji: '🔄' },
          { text: 'Start with just 10 SECONDS', startSeconds: 9.0, endSeconds: 12.2, emoji: '⏱️' },
          { text: 'Open the doc. Write 1 sentence.', startSeconds: 12.3, endSeconds: 16.0, emoji: '✍️' },
          { text: 'Momentum does the rest!', startSeconds: 16.1, endSeconds: 19.5, emoji: '🚀' },
        ],
        platformCopy: {
          tiktok: {
            caption: 'Do this the next time you cannot get out of bed to work ⏰',
            hashtags: ['#procrastination', '#habits', '#discipline', '#productivity', '#dailyroutine'],
            soundRecommendation: 'Deep Ambient Focus Beat',
          },
          reels: {
            caption: 'Motivation is a byproduct of movement. You do not wait to get in the mood; you take one micro-action and dopamine kicks in. 💡\n\nTry the 10-second ignition today.',
            hashtags: ['#disciplineovermotivation', '#focus', '#adhdtips', '#mindsetiseverything', '#habitbuilding'],
          },
          shorts: {
            title: 'How To Trick Your Brain Into Instant Focus 🧠',
            description: 'The psychological hack that cures procrastination in under 10 seconds.',
            tags: ['#Shorts', '#Psychology', '#Focus', '#Productivity'],
          },
          linkedin: {
            headline: 'Stop waiting for inspiration. It does not exist.',
            postBody: 'High performers do not wake up energized every morning.\n\nThey have engineered micro-starting rituals: 10 seconds of physical action triggers the basal ganglia into state flow.\n\nHow do you bypass decision fatigue on tough mornings?',
            hashtags: ['#MentalToughness', '#Habits', '#PeakPerformance', '#GrowthMindset'],
          },
          twitter: {
            hookTweet: 'Procrastination isn’t laziness. It’s emotional friction.\n\nHere’s how to bypass it in 10 seconds flat:',
            thread: [
              'Step 1: Lower the activation threshold to comical levels.',
              'Step 2: Do not commit to 1 hour. Commit to 10 seconds.',
              'Step 3: Once you cross the friction barrier, inertia takes over.',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'sample-huberman',
    title: 'Dr. Andrew Huberman: Dopamine, Morning Light & Laser Focus',
    sourceUrl: 'https://www.youtube.com/watch?v=kYfNvmF0Bqw',
    speakerName: 'Dr. Andrew Huberman',
    category: 'Neuroscience & Health',
    durationSeconds: 1840,
    summary:
      'Stanford neuroscientist explains how viewing morning sunlight resets circadian biology, spikes cortisol naturally, and unlocks 8+ hours of deep cognitive performance.',
    overallTheme: 'Circadian Biology & Dopamine Optimization',
    createdAt: new Date().toISOString(),
    status: 'ready',
    transcript: `The single most important habit you can cultivate is getting natural sunlight into your eyes within 30 to 60 minutes of waking.
Not through a window, not with sunglasses.
When photons hit the intrinsically photosensitive retinal ganglion cells, they set a timer for melatonin release 16 hours later and trigger an immediate pulse of cortisol and epinephrine that boosts alertness and dopamine throughout your day.
If you skip this, you will struggle with afternoon brain fog and late-night insomnia.`,
    clips: [
      {
        id: 'huberman-clip-1',
        title: 'The Morning Sunlight Protocol That Resets Your Brain',
        viralityScore: 98,
        hookStrength: 99,
        retentionFactor: 96,
        shareabilityIndex: 97,
        viralityReason:
          'Clear actionable health protocol with scientific authority. High retention due to specific biological explanation and clear instruction.',
        startTime: 34,
        endTime: 64,
        speakerQuote: 'Get natural sunlight into your eyes within 30 minutes of waking.',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-in-the-park-at-sunrise-42864-large.mp4',
        layout: 'face-tracking',
        aspectRatio: '9:16',
        subtitles: [
          { text: 'Do NOT check your phone first!', startSeconds: 0, endSeconds: 2.6, emoji: '📵' },
          { text: 'Step outside into NATURAL LIGHT', startSeconds: 2.7, endSeconds: 5.8, emoji: '☀️' },
          { text: 'Within 30 minutes of waking up', startSeconds: 5.9, endSeconds: 9.1, emoji: '⏰' },
          { text: 'Photons hit specialized RETINAL cells', startSeconds: 9.2, endSeconds: 13.0, emoji: '👁️' },
          { text: 'This triggers an alert CORTISOL spike', startSeconds: 13.1, endSeconds: 16.8, emoji: '⚡' },
          { text: 'And timers MELATONIN for deep sleep', startSeconds: 16.9, endSeconds: 21.0, emoji: '💤' },
          { text: '10 minutes outside changes everything!', startSeconds: 21.1, endSeconds: 25.0, emoji: '🧠' },
        ],
        platformCopy: {
          tiktok: {
            caption: 'Fix your sleep and focus with this 0-cost neurobiology protocol ☀️👁️',
            hashtags: ['#hubermanlab', '#morningroutine', '#biohacking', '#focus', '#sleephacks'],
            soundRecommendation: 'Ambient Calming Piano Echo',
          },
          reels: {
            caption: 'Your eyes are literally an extruded part of your central nervous system. 🧠\n\nWhen morning sunlight hits retinal ganglion cells:\n• Sets your circadian clock\n• Increases daytime dopamine\n• Ensures sound melatonin release 16 hours later\n\nNo windows. No sunglasses. Just 10 minutes of direct sky. Try it tomorrow!',
            hashtags: ['#neuroscience', '#healthhabits', '#wellnessjourney', '#sleepbetter', '#hubermanprotocol'],
          },
          shorts: {
            title: 'Stop Drinking Coffee First Thing In The Morning ☕❌',
            description: 'Dr. Andrew Huberman explains the neurobiology of morning photons and why light beats caffeine.',
            tags: ['#Shorts', '#Health', '#Sleep', '#Science', '#Huberman'],
          },
          linkedin: {
            headline: 'The $0 executive health protocol backed by Stanford neuroscience.',
            postBody: 'Most executives rely on caffeine to shock themselves awake, leading to the notorious 2 PM crash.\n\nNeuroscience shows a better way:\n1. 10 minutes of morning sunlight outside\n2. Delay caffeine 90 minutes post-waking to clear adenosine\n3. Consistent bedtime anchor\n\nDouble your cognitive output before noon.',
            hashtags: ['#ExecutiveHealth', '#Biohacking', '#Performance', '#Neuroscience', '#Productivity'],
          },
          twitter: {
            hookTweet: 'The #1 neurobiology protocol for 10/10 focus and deep sleep costs $0.\n\nDr. Andrew Huberman’s morning sunlight masterclass in 3 tweets: 🧵',
            thread: [
              '1/ Morning photons trigger retinal ganglion cells that sync every biological clock in your body.',
              '2/ Delay your morning coffee 90-120 minutes. This allows adenosine clearance and prevents the afternoon crash.',
              '3/ Even on cloudy days, outdoor light delivers 10x more lux than indoor overhead LED lights.',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'sample-mrbeast',
    title: 'MrBeast: The Secret Behind 1 Billion Views & Retention Curves',
    sourceUrl: 'https://www.youtube.com/watch?v=c8Z_lW_sP9c',
    speakerName: 'Jimmy Donaldson (MrBeast)',
    category: 'Content Creation & Viral Growth',
    durationSeconds: 1120,
    summary:
      'World-record YouTuber breaks down the science of 1st-second visual pacing, pacing transitions every 3.5 seconds, thumbnail payoffs, and story escalation.',
    overallTheme: 'YouTube Algorithm & Storytelling Mechanics',
    createdAt: new Date().toISOString(),
    status: 'ready',
    transcript: `If people leave in the first five seconds, your video is dead.
Every single millisecond of the intro has to deliver on the exact promise of the thumbnail.
Never say 'hey guys welcome back to my channel'. Nobody cares!
Jump right into the conflict. Increase the stakes every 30 seconds.
If you can keep 70% of viewers past the 1-minute mark, the YouTube algorithm will push your video to millions.`,
    clips: [
      {
        id: 'mrbeast-clip-1',
        title: 'Never Say This In The First 5 Seconds',
        viralityScore: 99,
        hookStrength: 100,
        retentionFactor: 98,
        shareabilityIndex: 98,
        viralityReason:
          'High emotion, direct callout of the #1 creator mistake. Extreme pace and instantly actionable for anyone making videos.',
        startTime: 10,
        endTime: 38,
        speakerQuote: 'If people leave in the first five seconds, your video is dead.',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-recording-video-with-his-smartphone-42865-large.mp4',
        layout: 'face-tracking',
        aspectRatio: '9:16',
        subtitles: [
          { text: 'NEVER say: "Hey guys welcome back!"', startSeconds: 0, endSeconds: 2.8, emoji: '🛑' },
          { text: 'Nobody cares about your day!', startSeconds: 2.9, endSeconds: 5.5, emoji: '🤷' },
          { text: 'Deliver the THUMBNAIL promise', startSeconds: 5.6, endSeconds: 8.8, emoji: '💥' },
          { text: 'in the FIRST THREE SECONDS', startSeconds: 8.9, endSeconds: 12.0, emoji: '⚡' },
          { text: 'If they swipe away in 5 seconds', startSeconds: 12.1, endSeconds: 15.5, emoji: '📉' },
          { text: 'the ALGORITHM KILLS YOUR VIDEO', startSeconds: 15.6, endSeconds: 19.5, emoji: '💀' },
          { text: 'Hook first, story second!', startSeconds: 19.6, endSeconds: 23.5, emoji: '🏆' },
        ],
        platformCopy: {
          tiktok: {
            caption: 'How MrBeast gets 100,000,000 views per video. Never make this intro mistake 📉🔥',
            hashtags: ['#mrbeast', '#creatorsecrets', '#algorithmhacks', '#youtubetips', '#contentcreator'],
            soundRecommendation: 'High Tension Boom Sound FX',
          },
          reels: {
            caption: '90% of videos die because the creator spends 10 seconds introducing themselves. 💀\n\nThe viewer gave you 2 seconds of attention. Hook them with the stakes immediately, or they are scrolling to the next video.\n\nDouble tap if you are fixing your intros today! 🎯',
            hashtags: ['#youtubegrowth', '#videoediting', '#reelsviral', '#contentstrategy', '#creatortips'],
          },
          shorts: {
            title: 'Why Your Videos Die In The First 5 Seconds 💀',
            description: 'MrBeast reveals the golden rule of viral hooks and algorithmic retention.',
            tags: ['#Shorts', '#MrBeast', '#YouTubeAlgorithm', '#ViralTips'],
          },
          linkedin: {
            headline: 'The brutal psychology of modern consumer attention spans.',
            postBody: 'MrBeast commands billions of views because he treats every second of attention as an earned transaction.\n\n3 lessons for B2B marketers and corporate communicators:\n1. Eliminate throat-clearing pleasantries\n2. State the stakes in sentence one\n3. Escalate the reward continuously\n\nAre your company presentations losing the audience in minute one?',
            hashtags: ['#MarketingStrategy', '#Storytelling', '#B2BMarketing', '#BrandStrategy'],
          },
          twitter: {
            hookTweet: 'The first 5 seconds of your content determine 95% of its success.\n\nHere is MrBeast’s formula for 100M-view intros: 🧵',
            thread: [
              '1/ The thumbnail sets an expectation. The first frame must immediately validate that expectation.',
              '2/ Zero self-introductions. Start in media res (in the middle of the action).',
              '3/ Introduce an open loop question that can only be resolved by watching until the climax.',
            ],
          },
        },
      },
    ],
  },
];
