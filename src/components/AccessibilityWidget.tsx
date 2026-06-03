import { useState, useEffect } from "react";
import { Volume2, VolumeX, Languages, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

interface AccessibilityWidgetProps {
  onChatOpen?: () => void;
  isChatOpen?: boolean;
}

export function AccessibilityWidget({ onChatOpen, isChatOpen }: AccessibilityWidgetProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.getElementById("google-translate-script")) return;
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            { pageLanguage: 'zh-TW', includedLanguages: 'en,ja,ko,zh-CN,zh-TW', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
            'google_translate_element'
          );
        }
      };
    };
    addGoogleTranslateScript();
  }, []);

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = document.body.innerText;
      const cleanText = textToRead.substring(0, 5000);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "zh-TW";
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    return () => { window.speechSynthesis.cancel(); };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{
          opacity: showTranslate ? 1 : 0,
          y: showTranslate ? 0 : 10,
          scale: showTranslate ? 1 : 0.95,
          pointerEvents: showTranslate ? "auto" : "none"
        }}
        className="bg-black/90 border border-gold-400/30 p-4 rounded-lg shadow-2xl backdrop-blur-md mb-2 flex flex-col gap-3"
      >
        <div className="flex justify-between items-center mb-1 gap-8">
          <span className="text-gold-400 text-xs font-display tracking-widest uppercase">Select Language</span>
          <button onClick={() => setShowTranslate(false)} className="text-white/50 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div id="google_translate_element" className="min-h-[32px] text-black rounded overflow-hidden"></div>
        <style>{`
          html { top: 0 !important; }
          body { top: 0 !important; position: static !important; }
          .skiptranslate iframe { display: none !important; }
          .skiptranslate.goog-te-banner-frame { display: none !important; }
          #goog-gt-tt { display: none !important; }
          .goog-te-gadget-simple {
            background-color: #1a1a1a !important;
            border: 1px solid rgba(212, 175, 55, 0.3) !important;
            padding: 8px !important;
            border-radius: 4px !important;
            font-family: inherit !important;
          }
          .goog-te-gadget-simple span { color: #D4AF37 !important; }
          .goog-te-menu-value { color: #D4AF37 !important; }
          .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
        `}</style>
      </motion.div>

      <div className="flex gap-3">
        {/* AI 聊天按鈕 */}
        <button
          onClick={onChatOpen}
          className={`${isChatOpen ? 'bg-gold-400 text-black' : 'bg-black/80 text-gold-400 border border-gold-400/30'} hover:bg-gold-400/20 hover:text-gold-400 p-4 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all flex items-center justify-center backdrop-blur-sm group`}
          title="策略智庫數位領航員"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* 翻譯按鈕 */}
        <button
          onClick={() => setShowTranslate(!showTranslate)}
          className="bg-black/80 hover:bg-gold-400/20 text-gold-400 border border-gold-400/30 p-4 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all flex items-center justify-center backdrop-blur-sm group"
          title="語言翻譯"
        >
          <Languages className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* 語音按鈕 */}
        <button
          onClick={toggleSpeech}
          className={`${isSpeaking ? 'bg-gold-400 text-black' : 'bg-black/80 text-gold-400 border border-gold-400/30'} hover:bg-gold-400/20 hover:text-gold-400 p-4 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all flex items-center justify-center backdrop-blur-sm group`}
          title={isSpeaking ? "停止朗讀" : "朗讀頁面"}
        >
          {isSpeaking ? (
            <VolumeX className="w-6 h-6 group-hover:scale-110 transition-transform animate-pulse" />
          ) : (
            <Volume2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
}
