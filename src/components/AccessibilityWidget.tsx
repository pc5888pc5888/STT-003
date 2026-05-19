import { useState, useEffect } from "react";
import { Volume2, VolumeX, Languages, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export function AccessibilityWidget() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);

  // Initialize Google Translate
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
      // Basic cleanup to remove some UI texts
      const cleanText = textToRead.replace(/Google 翻譯/g, '').replace(/聽取網頁/g, '').substring(0, 5000); // 5000 chars limit to avoid hanging
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "zh-TW"; // Provide zh-TW by default, browser might auto-detect
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Ensure speech stops when navigating away or unmounting
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
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
        {/* DO NOT conditionally render this div, otherwise Google Translate breaks when toggled */}
        <div id="google_translate_element" className="min-h-[32px] text-black rounded overflow-hidden"></div>
        <style>{`
          /* Aggressively override Google Translate page-shifting behavior */
          html { top: 0 !important; }
          body { top: 0 !important; position: static !important; }
          .skiptranslate iframe { display: none !important; }
          .skiptranslate.goog-te-banner-frame { display: none !important; }
          #goog-gt-tt { display: none !important; }
          
          /* Custom Google Translate Dropdown Styling */
          .goog-te-gadget-simple {
            background-color: #1a1a1a !important;
            border: 1px solid rgba(212, 175, 55, 0.3) !important;
            padding: 8px !important;
            border-radius: 4px !important;
            font-family: inherit !important;
          }
          .goog-te-gadget-simple span {
            color: #D4AF37 !important;
          }
          .goog-te-menu-value {
            color: #D4AF37 !important;
          }
          .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
        `}</style>
      </motion.div>

      <div className="flex gap-3">
        <button
          onClick={() => setShowTranslate(!showTranslate)}
          className="bg-black/80 hover:bg-gold-400/20 text-gold-400 border border-gold-400/30 p-4 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all flex items-center justify-center backdrop-blur-sm group"
          title="切換語言"
        >
          <Languages className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={toggleSpeech}
          className={`${isSpeaking ? 'bg-gold-400 text-black' : 'bg-black/80 text-gold-400 border border-gold-400/30'} hover:bg-gold-400/20 hover:text-gold-400 p-4 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all flex items-center justify-center backdrop-blur-sm group`}
          title={isSpeaking ? "停止播放" : "聽取網頁內容"}
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
