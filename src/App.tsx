/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Headphones, MessageCircle, PenTool, PlayCircle, Star, ArrowLeft, Volume2 } from "lucide-react";

const courseSets = [
  { 
    id: 1, 
    lessonTitle: "第1课",
    word: "Blume", 
    ipa: "[ˈbluːmə]", 
    meta: "阴性名词 die Blume", 
    meaning: "花、鲜花\n(eine Pflanze mit bunten Blüten)",
    exampleDe: "Ich schenke meiner Mutter eine Blume zum Geburtstag.",
    exampleCn: "生日那天我送给妈妈一朵花。",
    icon: BookOpen, 
    color: "text-blue-500" 
  },
  { 
    id: 2, 
    lessonTitle: "第2课",
    word: "Vogel", 
    ipa: "[ˈfoːɡl̩]", 
    meta: "阳性名词 der Vogel", 
    meaning: "鸟、飞禽\n(ein Tier mit Federn und Flügeln)",
    exampleDe: "Der Vogel sitzt auf dem Baum und singt.",
    exampleCn: "那只鸟坐在树上唱歌。",
    icon: Headphones, 
    color: "text-purple-500" 
  },
  { 
    id: 3, 
    lessonTitle: "第3课",
    word: "Tisch", 
    ipa: "[tɪʃ]", 
    meta: "阳性名词 der Tisch", 
    meaning: "桌子\n(ein Möbelstück mit einer Platte und Beinen)",
    exampleDe: "Das Essen steht schon auf dem Tisch.",
    exampleCn: "饭菜已经摆在桌子上了。",
    icon: MessageCircle, 
    color: "text-green-500" 
  },
  { 
    id: 4, 
    lessonTitle: "第4课",
    word: "Stuhl", 
    ipa: "[ʃtuːl]", 
    meta: "阳性名词 der Stuhl", 
    meaning: "椅子\n(ein Möbelstück für eine Person zum Sitzen)",
    exampleDe: "Nehmen Sie bitte Platz! Hier ist ein Stuhl.",
    exampleCn: "请坐！这里有一把椅子。",
    icon: PenTool, 
    color: "text-orange-500" 
  },
  { 
    id: 5, 
    lessonTitle: "第5课",
    word: "Wurst", 
    ipa: "[vʊrst]", 
    meta: "阴性名词 die Wurst", 
    meaning: "香肠\n(ein Lebensmittel aus zerkleinertem Fleisch)",
    exampleDe: "Möchtest du eine Bratwurst mit Senf essen?",
    exampleCn: "你想吃一根配芥末酱的烤肠吗？",
    icon: PlayCircle, 
    color: "text-red-500" 
  },
  { 
    id: 6, 
    lessonTitle: "第6课",
    word: "Gabel", 
    ipa: "[ˈɡaːbl̩]", 
    meta: "阴性名词 die Gabel", 
    meaning: "叉子\n(ein Essbesteck mit Zacken)",
    exampleDe: "Ich kann nicht mit Stäbchen essen, ich brauche eine Gabel.",
    exampleCn: "我不会用筷子，我需要一把叉子。",
    icon: Star, 
    color: "text-yellow-500" 
  },
];

export default function App() {
  const [activeLesson, setActiveLesson] = useState<typeof courseSets[0] | null>(null);

  const playAudio = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(voice => voice.lang.includes("de"));
    if (germanVoice) utterance.voice = germanVoice;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="h-screen w-screen bg-white text-black font-sans flex flex-col overflow-hidden select-none relative">
      <AnimatePresence mode="wait">
        {!activeLesson ? (
          <motion.div 
            key="list"
            className="flex flex-col h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Top Navigation / Header */}
            <header className="flex justify-between items-center px-12 pt-10 pb-6 shrink-0">
              <div className="flex flex-col">
                <h1 className="text-4xl font-light tracking-tighter">
                  德语核心词汇学习 <span className="text-gray-300">/ Vokabeln</span>
                </h1>
              </div>
            </header>

            {/* Main Interaction Area */}
            <main className="flex-1 px-12 pb-10 overflow-hidden">
              <div className="grid grid-cols-2 grid-rows-3 gap-6 w-full h-full">
                {courseSets.map((set, index) => (
                  <motion.button
                    key={set.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    id={`course-btn-${set.id}`}
                    onClick={() => setActiveLesson(set)}
                    className="group relative border border-black p-8 flex flex-col justify-between text-left transition-all duration-300 hover:bg-black hover:text-white"
                  >
                    <span className="text-5xl font-light tracking-tighter opacity-10 group-hover:opacity-100 transition-opacity">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-6">
                      <div className={`transition-transform group-hover:scale-110 duration-300 ${set.color} group-hover:text-white`}>
                        <set.icon size={32} strokeWidth={1.5} />
                      </div>
                      <h2 className="text-4xl font-medium tracking-tight">{set.lessonTitle}</h2>
                    </div>
                    <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-black group-hover:bg-white transition-colors" />
                  </motion.button>
                ))}
              </div>
            </main>

            {/* Footer / Status Bar */}
            <footer className="px-12 py-6 border-t border-gray-100 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-medium shrink-0">
              <div>学习进度已同步</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                系统在线
              </div>
            </footer>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            className="absolute inset-0 bg-white flex flex-col z-50 p-8 md:p-12 overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Detail Header */}
            <header className="flex justify-between items-center mb-6">
              <button 
                onClick={() => setActiveLesson(null)}
                className="flex items-center gap-3 text-slate-400 hover:text-black transition-colors group px-4 py-2 border border-transparent hover:border-black rounded-full"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-bold tracking-widest uppercase">返回课程列表</span>
              </button>
              <span className="text-[10px] font-mono opacity-20 tracking-widest">{activeLesson.lessonTitle} / MODULE_01</span>
            </header>

            {/* Detail Content */}
            <main className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="h-full flex flex-col justify-center"
              >
                <div className="flex items-baseline gap-6 mb-2 shrink-0">
                  <h2 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none">{activeLesson.word}</h2>
                  <button 
                    onClick={() => playAudio(activeLesson.word)}
                    className="flex items-center gap-3 text-3xl md:text-4xl font-mono text-slate-200 hover:text-blue-400 transition-colors cursor-pointer group/audio"
                  >
                    <span>{activeLesson.ipa}</span>
                    <Volume2 size={32} className="opacity-40 group-hover/audio:opacity-100 transition-opacity" />
                  </button>
                </div>
                
                <div className="flex gap-12 items-start flex-1 overflow-hidden">
                  <div className="flex-1 flex flex-col justify-between py-2 overflow-hidden">
                    <section className="shrink-0">
                      <p className="text-xl font-light text-slate-400 italic mb-2">
                        {activeLesson.meta}
                      </p>
                      <div className="h-1.5 w-16 bg-black mb-4" />
                      <h3 className="text-3xl md:text-4xl font-medium leading-tight max-w-xl whitespace-pre-line">
                        {activeLesson.meaning}
                      </h3>
                    </section>

                    <section className="space-y-4 pt-4 border-t border-slate-100 shrink-0">
                      <div className="space-y-2">
                        <p className="text-[9px] uppercase tracking-[0.4em] text-slate-300 font-black">Contextual Example / 典型语境</p>
                        <div className="flex items-start gap-4">
                          <p className="text-3xl md:text-4xl font-serif italic text-slate-800 leading-tight tracking-tight flex-1">
                            "{activeLesson.exampleDe}"
                          </p>
                          <button 
                            onClick={() => playAudio(activeLesson.exampleDe)}
                            className="mt-2 text-slate-300 hover:text-blue-400 transition-colors shrink-0 cursor-pointer"
                          >
                            <Volume2 size={24} />
                          </button>
                        </div>
                        <p className="text-xl md:text-2xl text-slate-400 font-light underline decoration-slate-100 underline-offset-4">
                          {activeLesson.exampleCn}
                        </p>
                      </div>
                    </section>
                  </div>
                  
                  {/* Side Graphic */}
                  <div className="w-1/4 aspect-square flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[3rem] relative overflow-hidden self-center shrink-0">
                    <div className={`relative z-10 ${activeLesson.color}`}>
                      <activeLesson.icon size={80} strokeWidth={1} />
                    </div>
                    <div className="absolute top-0 right-0 p-4 text-[7rem] font-black text-white select-none leading-none">
                      {activeLesson.word[0]}
                    </div>
                  </div>
                </div>
              </motion.div>
            </main>

            {/* Footer */}
            <footer className="mt-auto py-4 text-[9px] uppercase tracking-[0.5em] text-center text-slate-200 shrink-0">
              German Core Vocabulary • Artistic Flair Edition
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


