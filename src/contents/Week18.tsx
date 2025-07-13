import React, { useState, useRef } from "react";
import { Card } from "../components/ui/card";

const moods = [
  {
    name: "Happy",
    emoji: "😄",
    color: "bg-yellow-200",
    ring: "ring-yellow-400",
    verse: {
      text: "Rejoice in the Lord always. I will say it again: Rejoice!",
      ref: "Philippians 4:4",
    },
  },
  {
    name: "Angry",
    emoji: "😠",
    color: "bg-red-200",
    ring: "ring-red-400",
    verse: {
      text: "Be not quick in your spirit to become angry, for anger lodges in the heart of fools.",
      ref: "Ecclesiastes 7:9",
    },
  },
  {
    name: "Sad",
    emoji: "😢",
    color: "bg-sky-200",
    ring: "ring-sky-400",
    verse: {
      text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
      ref: "Psalm 34:18",
    },
  },
  {
    name: "Excited",
    emoji: "🤩",
    color: "bg-orange-200",
    ring: "ring-orange-400",
    verse: {
      text: "Delight yourself in the Lord, and he will give you the desires of your heart.",
      ref: "Psalm 37:4",
    },
  },
  {
    name: "Calm",
    emoji: "😌",
    color: "bg-green-200",
    ring: "ring-green-400",
    verse: {
      text: "Peace I leave with you; my peace I give you.",
      ref: "John 14:27",
    },
  },
  {
    name: "Tired",
    emoji: "😴",
    color: "bg-gray-200",
    ring: "ring-gray-400",
    verse: {
      text: "Come to me, all you who are weary and burdened, and I will give you rest.",
      ref: "Matthew 11:28",
    },
  },
  {
    name: "Anxious",
    emoji: "😬",
    color: "bg-teal-200",
    ring: "ring-teal-400",
    verse: {
      text: "Cast all your anxiety on him because he cares for you.",
      ref: "1 Peter 5:7",
    },
  },
  {
    name: "Lonely",
    emoji: "🥺",
    color: "bg-purple-200",
    ring: "ring-purple-400",
    verse: {
      text: "I am with you always, to the end of the age.",
      ref: "Matthew 28:20",
    },
  },
  {
    name: "Grateful",
    emoji: "🙏",
    color: "bg-amber-200",
    ring: "ring-amber-400",
    verse: {
      text: "Give thanks to the Lord, for he is good; his love endures forever.",
      ref: "Psalm 107:1",
    },
  },
  {
    name: "Hopeful",
    emoji: "🌈",
    color: "bg-pink-200",
    ring: "ring-pink-400",
    verse: {
      text: "For I know the plans I have for you, declares the Lord, plans to give you hope and a future.",
      ref: "Jeremiah 29:11",
    },
  },
  {
    name: "Afraid",
    emoji: "😨",
    color: "bg-blue-200",
    ring: "ring-blue-400",
    verse: {
      text: "When I am afraid, I put my trust in you.",
      ref: "Psalm 56:3",
    },
  },
  {
    name: "Confused",
    emoji: "😕",
    color: "bg-lime-200",
    ring: "ring-lime-400",
    verse: {
      text: "Trust in the Lord with all your heart and lean not on your own understanding.",
      ref: "Proverbs 3:5",
    },
  },
  // Additional moods
  {
    name: "Inspired",
    emoji: "💡",
    color: "bg-yellow-100",
    ring: "ring-yellow-300",
    verse: {
      text: "I can do all things through Christ who strengthens me.",
      ref: "Philippians 4:13",
    },
  },
  {
    name: "Overwhelmed",
    emoji: "🥵",
    color: "bg-rose-100",
    ring: "ring-rose-300",
    verse: {
      text: "When my heart is overwhelmed, lead me to the rock that is higher than I.",
      ref: "Psalm 61:2",
    },
  },
  {
    name: "Loved",
    emoji: "❤️",
    color: "bg-red-100",
    ring: "ring-red-300",
    verse: {
      text: "We love because He first loved us.",
      ref: "1 John 4:19",
    },
  },
  {
    name: "Disappointed",
    emoji: "😞",
    color: "bg-gray-100",
    ring: "ring-gray-300",
    verse: {
      text: "The Lord is my portion, says my soul, therefore I will hope in Him.",
      ref: "Lamentations 3:24",
    },
  },
  {
    name: "Motivated",
    emoji: "🚀",
    color: "bg-green-100",
    ring: "ring-green-300",
    verse: {
      text: "Whatever you do, work at it with all your heart, as working for the Lord.",
      ref: "Colossians 3:23",
    },
  },
  {
    name: "Bored",
    emoji: "🥱",
    color: "bg-blue-100",
    ring: "ring-blue-300",
    verse: {
      text: "Whatever you do, do it all for the glory of God.",
      ref: "1 Corinthians 10:31",
    },
  },
  {
    name: "Surprised",
    emoji: "😲",
    color: "bg-fuchsia-100",
    ring: "ring-fuchsia-300",
    verse: {
      text: "See, I am doing a new thing! Now it springs up; do you not perceive it?",
      ref: "Isaiah 43:19",
    },
  },
  {
    name: "Peaceful",
    emoji: "🕊️",
    color: "bg-cyan-100",
    ring: "ring-cyan-300",
    verse: {
      text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
      ref: "Philippians 4:7",
    },
  },
  {
    name: "Blessed",
    emoji: "😇",
    color: "bg-indigo-100",
    ring: "ring-indigo-300",
    verse: {
      text: "Blessed are those who trust in the Lord.",
      ref: "Jeremiah 17:7",
    },
  },
  {
    name: "Content",
    emoji: "😊",
    color: "bg-emerald-100",
    ring: "ring-emerald-300",
    verse: {
      text: "Godliness with contentment is great gain.",
      ref: "1 Timothy 6:6",
    },
  },
  {
    name: "Worried",
    emoji: "😟",
    color: "bg-orange-100",
    ring: "ring-orange-300",
    verse: {
      text: "Do not worry about tomorrow, for tomorrow will worry about itself.",
      ref: "Matthew 6:34",
    },
  },
  {
    name: "Shy",
    emoji: "😳",
    color: "bg-pink-100",
    ring: "ring-pink-300",
    verse: {
      text: "The Lord is with me; I will not be afraid.",
      ref: "Psalm 118:6",
    },
  },
  {
    name: "Thankful",
    emoji: "🧡",
    color: "bg-amber-100",
    ring: "ring-amber-300",
    verse: {
      text: "Give thanks in all circumstances; for this is God’s will for you in Christ Jesus.",
      ref: "1 Thessalonians 5:18",
    },
  },
  {
    name: "Playful",
    emoji: "😜",
    color: "bg-lime-100",
    ring: "ring-lime-300",
    verse: {
      text: "A cheerful heart is good medicine.",
      ref: "Proverbs 17:22",
    },
  },
  {
    name: "Embarrassed",
    emoji: "🙈",
    color: "bg-rose-50",
    ring: "ring-rose-200",
    verse: {
      text: "Those who look to him are radiant; their faces are never covered with shame.",
      ref: "Psalm 34:5",
    },
  },
  {
    name: "Jealous",
    emoji: "😒",
    color: "bg-green-50",
    ring: "ring-green-200",
    verse: {
      text: "Love does not envy or boast; it is not arrogant.",
      ref: "1 Corinthians 13:4",
    },
  },
  {
    name: "Forgiving",
    emoji: "🤗",
    color: "bg-cyan-50",
    ring: "ring-cyan-200",
    verse: {
      text: "Forgive as the Lord forgave you.",
      ref: "Colossians 3:13",
    },
  },
  {
    name: "Hungry",
    emoji: "🍔",
    color: "bg-orange-200",
    ring: "ring-orange-400",
    verse: {
      text: "Man shall not live by bread alone, but by every word that comes from the mouth of God.",
      ref: "Matthew 4:4",
    },
  },
  {
    name: "Silly",
    emoji: "🤪",
    color: "bg-pink-50",
    ring: "ring-pink-200",
    verse: {
      text: "A cheerful heart is good medicine.",
      ref: "Proverbs 17:22",
    },
  },
  {
    name: "Shocked",
    emoji: "😱",
    color: "bg-violet-100",
    ring: "ring-violet-300",
    verse: {
      text: "Do not be afraid, for I am with you.",
      ref: "Isaiah 41:10",
    },
  },
  {
    name: "Focused",
    emoji: "🎯",
    color: "bg-blue-50",
    ring: "ring-blue-200",
    verse: {
      text: "Set your minds on things above, not on earthly things.",
      ref: "Colossians 3:2",
    },
  },
  {
    name: "Relieved",
    emoji: "😌",
    color: "bg-green-50",
    ring: "ring-green-200",
    verse: {
      text: "Cast your cares on the Lord and he will sustain you.",
      ref: "Psalm 55:22",
    },
  },
  {
    name: "Proud",
    emoji: "😏",
    color: "bg-yellow-50",
    ring: "ring-yellow-200",
    verse: {
      text: "Let the one who boasts, boast in the Lord.",
      ref: "1 Corinthians 1:31",
    },
  },
  {
    name: "Ashamed",
    emoji: "😳",
    color: "bg-gray-50",
    ring: "ring-gray-200",
    verse: {
      text: "Those who look to him are radiant; their faces are never covered with shame.",
      ref: "Psalm 34:5",
    },
  },
  {
    name: "Tempted",
    emoji: "😈",
    color: "bg-red-300",
    ring: "ring-red-500",
    verse: {
      text: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.",
      ref: "1 Corinthians 10:13",
    },
  },
  {
    name: "Shocked",
    emoji: "😲",
    color: "bg-fuchsia-100",
    ring: "ring-fuchsia-300",
    verse: {
      text: "See, I am doing a new thing! Now it springs up; do you not perceive it?",
      ref: "Isaiah 43:19",
    },
  },
  {
    name: "Hopeful",
    emoji: "🤞",
    color: "bg-pink-200",
    ring: "ring-pink-400",
    verse: {
      text: "But those who hope in the Lord will renew their strength.",
      ref: "Isaiah 40:31",
    },
  },
  {
    name: "Disgusted",
    emoji: "🤢",
    color: "bg-green-300",
    ring: "ring-green-500",
    verse: {
      text: "Create in me a pure heart, O God, and renew a steadfast spirit within me.",
      ref: "Psalm 51:10",
    },
  },
  {
    name: "Energetic",
    emoji: "⚡",
    color: "bg-yellow-200",
    ring: "ring-yellow-400",
    verse: {
      text: "The joy of the Lord is your strength.",
      ref: "Nehemiah 8:10",
    },
  },
  {
    name: "Creative",
    emoji: "🎨",
    color: "bg-indigo-100",
    ring: "ring-indigo-300",
    verse: {
      text: "For we are God’s handiwork, created in Christ Jesus to do good works.",
      ref: "Ephesians 2:10",
    },
  },
  {
    name: "Stressed",
    emoji: "😫",
    color: "bg-red-100",
    ring: "ring-red-300",
    verse: {
      text: "Cast your cares on the Lord and he will sustain you.",
      ref: "Psalm 55:22",
    },
  },
  {
    name: "Relaxed",
    emoji: "🛀",
    color: "bg-blue-100",
    ring: "ring-blue-300",
    verse: {
      text: "Be still, and know that I am God.",
      ref: "Psalm 46:10",
    },
  },
  {
    name: "Curious",
    emoji: "🧐",
    color: "bg-yellow-100",
    ring: "ring-yellow-300",
    verse: {
      text: "Call to me and I will answer you and tell you great and unsearchable things you do not know.",
      ref: "Jeremiah 33:3",
    },
  },
  {
    name: "Determined",
    emoji: "💪",
    color: "bg-orange-100",
    ring: "ring-orange-300",
    verse: {
      text: "I press on toward the goal to win the prize for which God has called me heavenward in Christ Jesus.",
      ref: "Philippians 3:14",
    },
  },
  {
    name: "Insecure",
    emoji: "😔",
    color: "bg-gray-200",
    ring: "ring-gray-400",
    verse: {
      text: "For the Lord will be your confidence and will keep your foot from being caught.",
      ref: "Proverbs 3:26",
    },
  },
  {
    name: "Satisfied",
    emoji: "😌",
    color: "bg-green-200",
    ring: "ring-green-400",
    verse: {
      text: "You open your hand and satisfy the desires of every living thing.",
      ref: "Psalm 145:16",
    },
  },
  {
    name: "Regretful",
    emoji: "😞",
    color: "bg-gray-100",
    ring: "ring-gray-300",
    verse: {
      text: "If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.",
      ref: "1 John 1:9",
    },
  },
  {
    name: "Adventurous",
    emoji: "🌍",
    color: "bg-blue-50",
    ring: "ring-blue-200",
    verse: {
      text: "The Lord will watch over your coming and going both now and forevermore.",
      ref: "Psalm 121:8",
    },
  },
  {
    name: "Nostalgic",
    emoji: "📸",
    color: "bg-pink-100",
    ring: "ring-pink-300",
    verse: {
      text: "Remember the former things, those of long ago; I am God, and there is no other.",
      ref: "Isaiah 46:9",
    },
  },
  {
    name: "Rejected",
    emoji: "🙁",
    color: "bg-gray-300",
    ring: "ring-gray-500",
    verse: {
      text: "Though my father and mother forsake me, the Lord will receive me.",
      ref: "Psalm 27:10",
    },
  },
  {
    name: "Victorious",
    emoji: "🏆",
    color: "bg-yellow-200",
    ring: "ring-yellow-400",
    verse: {
      text: "But thanks be to God! He gives us the victory through our Lord Jesus Christ.",
      ref: "1 Corinthians 15:57",
    },
  },
];

const getToday = () => {
  const now = new Date();
  return now.toLocaleDateString(undefined, { month: "long", day: "numeric" });
};
const getTime = () => {
  const now = new Date();
  return now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
};

const Week18 = () => {
  const [selected, setSelected] = useState(0);
  const mood = moods[selected];
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSelect = (i: number) => {
    setSelected(i);
    setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 10);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-lime-100 transition-colors duration-300 px-2 py-6 sm:py-10">
      <div className="w-full max-w-md mx-auto flex flex-col flex-1 justify-center">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <span className="font-semibold text-lg sm:text-xl tracking-tight">Current Mood</span>
        </div>
        {/* Mood Display Card */}
        <Card ref={cardRef} className="w-full flex flex-col items-center shadow-lg border-0 rounded-2xl py-6 px-4 sm:px-8 bg-white mb-6">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-7xl mb-2 drop-shadow-sm">{mood.emoji}</div>
            <div className="text-3xl font-extrabold mb-1 tracking-tight text-gray-900">{mood.name}</div>
            <div className="text-base font-medium text-gray-700 mb-0.5">{getToday()}</div>
            <div className="text-xs text-gray-500 mb-4">{getTime()}</div>
            {/* Bible Verse */}
            <div className="w-full bg-lime-50 rounded-lg p-4 mt-2 text-center shadow-sm">
              <div className="text-base font-medium text-gray-800 italic mb-1">“{mood.verse.text}”</div>
              <div className="text-xs font-semibold text-gray-500">{mood.verse.ref}</div>
            </div>
          </div>
        </Card>
        {/* Mood Selector Grid */}
        <div className="w-full grid grid-cols-4 sm:grid-cols-6 gap-4">
          {moods.map((m, i) => (
            <button
              key={m.name}
              onClick={() => handleSelect(i)}
              className={`flex flex-col items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/40 p-2 sm:p-3
                ${i === selected ? 'bg-white scale-110 shadow font-bold ring-2 ring-black/30' : 'bg-lime-50 hover:bg-white/80 opacity-80 hover:opacity-100'}
              `}
              aria-label={m.name}
            >
              <span className="text-2xl sm:text-3xl mb-1">{m.emoji}</span>
              <span className="text-xs text-gray-700 font-medium text-center leading-tight truncate w-16">{m.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1" />
    </div>
  );
};

export default Week18;