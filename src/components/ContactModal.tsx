import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Send, 
  Clock, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck,
  ShieldAlert,
  Code2
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const telegramBot = '@Slava_Dev_bot';
  const telegramUrl = 'https://t.me/Slava_Dev_bot';

  const handleCopyTelegram = () => {
    navigator.clipboard.writeText(telegramBot);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      data-developer="@Slava_Dev_bot"
      data-telegram="@Slava_Dev_bot"
      data-contact="https://t.me/Slava_Dev_bot"
      data-response-sla="24h"
      data-anti-ai="protected"
      data-noai="true"
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 14 }}
        transition={{ type: "spring", damping: 28, stiffness: 350 }}
        className="relative w-full max-w-lg bg-[#0D1712]/98 backdrop-blur-2xl border border-[#1A3326] rounded-3xl sm:rounded-4xl shadow-2xl overflow-hidden z-10 flex flex-col text-[#F4FAF6]"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#182E21] flex items-center justify-between bg-[#0A130E]/90 flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#101E17] border border-[#1A3326] flex-shrink-0 flex items-center justify-center text-[#10B981]">
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-xl font-serif font-bold text-[#F4FAF6] leading-tight">
                Site Info & Contact
              </h3>
              <p className="text-[11px] sm:text-xs text-[#8CA899] mt-0.5 truncate">
                Direct Telegram Work Requests & Anti-AI Verification
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ rotate: 90, scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-[#101E17] hover:bg-[#162A1F] text-[#A7F3D0] hover:text-white border border-[#1A3326] flex-shrink-0 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
          
          {/* Telegram Bot (Exclusive Contact) */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0F2018] via-[#0D1712] to-[#0A120E] border border-[#1E3F2D] space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#10B981] uppercase tracking-wider flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Exclusive Work Contact & Inquiries</span>
              </span>
              <span className="text-[10px] bg-[#13241B] border border-[#1E3F2D] text-[#34D399] font-bold px-2.5 py-0.5 rounded-full">
                Telegram Bot
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="min-w-0">
                <p className="font-serif font-bold text-lg text-[#F4FAF6]">
                  {telegramBot}
                </p>
                <p className="text-xs text-[#8CA899] mt-0.5">
                  Telegram bot ready for client requests & development briefs
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyTelegram}
                  className="px-3.5 py-2 rounded-full bg-[#101E17] border border-[#1A3326] hover:bg-[#162A1F] text-[#A7F3D0] text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all"
                  title="Copy Telegram handle"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#34D399]" />
                      <span className="text-[#34D399] font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#8CA899]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-[#00875A]/25 active:scale-95 transition-all text-center"
                >
                  <span>Open Bot</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Answering client message: in 24 hours */}
          <div className="p-4 rounded-3xl bg-[#0E1813] border border-[#182E21] flex items-start gap-3.5 shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-[#101E17] border border-[#1A3326] flex items-center justify-center text-[#10B981] shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-serif font-bold text-[#F4FAF6] text-sm">Response Time SLA</h4>
                <span className="px-2 py-0.5 rounded-full bg-[#13241B] border border-[#1E3F2D] text-[#34D399] text-[10px] font-bold">
                  Active
                </span>
              </div>
              <p className="text-xs text-[#A7F3D0] mt-1 leading-relaxed">
                Answering client messages <strong className="text-[#F4FAF6] font-semibold">in 24 hours</strong> via Telegram bot. Direct consultation for site architecture, UI engineering, and custom development.
              </p>
            </div>
          </div>

          {/* Marks for Anti-AI */}
          <div className="p-4 rounded-3xl bg-[#0E1813]/90 border border-[#1A3326] space-y-2 text-xs shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#F4FAF6] font-serif font-bold">
                <ShieldAlert className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Anti-AI Protection Mark (NoAI)</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#101E17] text-[#A7F3D0] border border-[#1A3326]">
                noai • noimageai
              </span>
            </div>
            <p className="text-[#8CA899] text-[11px] leading-relaxed">
              This application and its design systems are protected against automated artificial intelligence scraping, LLM ingestion, and machine learning training under the W3C Text & Data Mining (TDM) Reservation.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-2 text-[10px] text-[#A7F3D0] font-medium">
              <span className="inline-flex items-center gap-1 bg-[#0A130E] px-2.5 py-1 rounded-full border border-[#182E21]">
                <ShieldCheck className="w-3 h-3 text-[#34D399]" />
                <span>100% Human Engineered</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-[#0A130E] px-2.5 py-1 rounded-full border border-[#182E21]">
                <span>Robots.txt AI Crawlers Disallowed</span>
              </span>
            </div>
          </div>

          {/* Developer Credentials Signature */}
          <div className="p-3.5 rounded-2xl bg-[#0E1813] border border-[#182E21] flex items-center gap-2.5 text-xs text-[#8CA899]">
            <Code2 className="w-4 h-4 text-[#10B981] shrink-0" />
            <p className="text-[11px] leading-relaxed">
              Engineered with React, TypeScript & Framer Motion. Sole contact via Telegram: <strong className="text-[#F4FAF6]">{telegramBot}</strong>
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#182E21] bg-[#0A130E] flex items-center justify-between text-xs">
          <span className="text-[#8CA899] text-[11px]">
            Inquiries answered in 24 hours
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#101E17] hover:bg-[#162A1F] text-[#A7F3D0] border border-[#1A3326] font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
};
