import React, { useState } from 'react';
import { CheckCircle2, Lock, Send, Clock, ExternalLink, ShieldAlert, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAuth: () => void;
  onOpenSell: () => void;
  onSelectBrand: (brand: string) => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAuth,
  onOpenSell,
  onSelectBrand,
  onOpenContact
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer 
      className="bg-[#070D0A] border-t border-[#13241B] pt-16 pb-24 sm:pb-12 text-[#6A8F7C] text-xs"
      data-developer="@Slava_Dev_bot"
      data-telegram-bot="@Slava_Dev_bot"
      data-contact="https://t.me/Slava_Dev_bot"
      data-turnaround="24h"
      data-anti-ai="protected"
      data-ai-training="prohibited"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Brand row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#13241B]">
          
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#101E17] border border-[#1A3326] flex items-center justify-center font-serif font-bold text-[#F4FAF6] text-base shadow-sm">
                V
              </div>
              <span className="font-serif font-bold text-xl tracking-tight text-[#F4FAF6]">
                The Sneaker Vault
              </span>
            </div>
            <p className="text-[#6A8F7C] text-xs max-w-sm leading-relaxed">
              The premier destination for authenticated luxury editions and archival grails. 
              Physical laboratory inspection and secure custody on every transaction.
            </p>
            <div className="flex items-center gap-1.5 text-[#A7F3D0] text-xs pt-1 font-medium">
              <Lock className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Full buyer protection and authenticity warranty</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#0C1510] border border-[#182E21] rounded-3xl p-6 shadow-xl">
              <h4 className="font-serif font-bold text-base text-[#F4FAF6]">
                Curator's Weekly Dispatch
              </h4>
              <p className="text-xs text-[#6A8F7C] mt-1 mb-4 leading-relaxed">
                Receive private previews of incoming rare grails, atelier drops, and archival curations.
              </p>
              
              {subscribed ? (
                <div className="flex items-center gap-2 text-[#10B981] py-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Subscribed. Our curator's dispatch will arrive in your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#08100C] border border-[#1A3326] rounded-full px-4 py-2.5 text-[#F4FAF6] placeholder-[#6A8F7C] focus:outline-none focus:border-[#00875A] text-xs shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-bold tracking-wide transition-all whitespace-nowrap active:scale-95 text-center shadow-md shadow-[#00875A]/20"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Creator & Site Info Bar (Prominent Site Info Space) */}
        <div className="bg-[#0C1510] border border-[#182E21] rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#6A8F7C]">
                Site Architecture & Client Inquiries
              </span>
            </div>
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#F4FAF6]">
              Work Requests & Developer Contact
            </h4>
            <p className="text-xs text-[#A7F3D0] flex items-center gap-1.5 flex-wrap">
              <Clock className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span>Answering client messages: <strong className="text-[#F4FAF6] font-semibold">in 24 hours</strong>.</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#101E17] border border-[#1A3326] text-[#A7F3D0] text-xs font-medium">
              <ShieldAlert className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Anti-AI Protected</span>
            </span>

            <a
              href="https://t.me/Slava_Dev_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#00875A] hover:bg-[#059669] text-white text-xs font-bold shadow-lg shadow-[#00875A]/25 transition-all active:scale-95"
              title="Telegram bot for work requests and inquiries"
            >
              <Send className="w-3.5 h-3.5 text-white" />
              <span>Telegram: @Slava_Dev_bot</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-[#101E17] hover:bg-[#162A1F] text-[#A7F3D0] border border-[#1A3326] text-xs font-semibold transition-all"
              >
                Site Credentials
              </button>
            )}
          </div>
        </div>

        {/* Links grid with dedicated Site Info column */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-xs">
          
          <div className="space-y-3">
            <h5 className="font-serif font-bold text-[#F4FAF6] uppercase tracking-wider text-xs">Collection</h5>
            <ul className="space-y-2">
              <li><a href="#market-section" className="text-[#6A8F7C] hover:text-[#10B981] transition-colors">All Available Pairs</a></li>
              <li><a href="#market-section" className="text-[#6A8F7C] hover:text-[#10B981] transition-colors">Deadstock Editions</a></li>
              <li><a href="#market-section" className="text-[#6A8F7C] hover:text-[#10B981] transition-colors">Near Mint & Pre-Owned</a></li>
              <li><a href="#market-section" className="text-[#6A8F7C] hover:text-[#10B981] transition-colors">Most Coveted Grails</a></li>
              <li><a href="#market-section" className="text-[#6A8F7C] hover:text-[#10B981] transition-colors">Runway Collaborations</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-serif font-bold text-[#F4FAF6] uppercase tracking-wider text-xs">Ateliers</h5>
            <ul className="space-y-2">
              <li><button onClick={() => onSelectBrand('Dior')} className="text-[#6A8F7C] hover:text-[#10B981] transition-colors">Dior</button></li>
              <li><button onClick={() => onSelectBrand('Travis Scott')} className="text-[#6A8F7C] hover:text-[#10B981] transition-colors">Travis Scott</button></li>
              <li><button onClick={() => onSelectBrand('Off-White')} className="text-[#6A8F7C] hover:text-[#10B981] transition-colors">Off-White</button></li>
              <li><button onClick={() => onSelectBrand('Louis Vuitton')} className="text-[#6A8F7C] hover:text-[#10B981] transition-colors">Louis Vuitton</button></li>
              <li><button onClick={() => onSelectBrand('Balenciaga')} className="text-[#6A8F7C] hover:text-[#10B981] transition-colors">Balenciaga</button></li>
              <li><button onClick={() => onSelectBrand('Rick Owens')} className="text-[#6A8F7C] hover:text-[#10B981] transition-colors">Rick Owens</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-serif font-bold text-[#F4FAF6] uppercase tracking-wider text-xs">Authentication</h5>
            <ul className="space-y-2">
              <li><button onClick={onOpenAuth} className="text-[#6A8F7C] hover:text-[#10B981] text-left transition-colors">12-Point Laboratory Standard</button></li>
              <li><button onClick={onOpenAuth} className="text-[#6A8F7C] hover:text-[#10B981] text-left transition-colors">Micro-Weight Calibration</button></li>
              <li><button onClick={onOpenAuth} className="text-[#6A8F7C] hover:text-[#10B981] text-left transition-colors">Ultraviolet Luminescence Check</button></li>
              <li><button onClick={onOpenAuth} className="text-[#6A8F7C] hover:text-[#10B981] text-left transition-colors">Full Authenticity Guarantee</button></li>
              <li><button onClick={onOpenAuth} className="text-[#6A8F7C] hover:text-[#10B981] text-left transition-colors">Tamper-Evident Medallion</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-serif font-bold text-[#F4FAF6] uppercase tracking-wider text-xs">Consignment</h5>
            <ul className="space-y-2">
              <li><button onClick={onOpenSell} className="text-[#6A8F7C] hover:text-[#10B981] text-left font-medium transition-colors">Consign Your Pair</button></li>
              <li><button onClick={onOpenSell} className="text-[#6A8F7C] hover:text-[#10B981] text-left transition-colors">Immediate Vault Buyout</button></li>
              <li><button onClick={onOpenSell} className="text-[#6A8F7C] hover:text-[#10B981] text-left transition-colors">Seller Commission Schedule</button></li>
              <li><button onClick={onOpenSell} className="text-[#6A8F7C] hover:text-[#10B981] text-left transition-colors">Complimentary Shipping Kit</button></li>
              <li><button onClick={onOpenSell} className="text-[#6A8F7C] hover:text-[#10B981] text-left transition-colors">Private Collector Concierge</button></li>
            </ul>
          </div>

          {/* Column 5: Site Info & Developer Credentials */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <h5 className="font-serif font-bold text-[#F4FAF6] uppercase tracking-wider text-xs">Site Info & Contact</h5>
            <ul className="space-y-2">
              <li>
                <span className="text-[#6A8F7C] block text-[11px]">Work Requests Bot:</span>
                <a 
                  href="https://t.me/Slava_Dev_bot" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#F4FAF6] underline font-semibold text-[#34D399] inline-flex items-center gap-1 transition-colors"
                >
                  <span>@Slava_Dev_bot</span>
                  <ExternalLink className="w-3 h-3 text-[#34D399]" />
                </a>
              </li>
              <li>
                <span className="text-[#6A8F7C] block text-[11px]">Client Response SLA:</span>
                <span className="text-[#F4FAF6] font-bold">Answering in 24 hours</span>
              </li>
              <li>
                <span className="text-[#6A8F7C] block text-[11px]">Security & AI Policy:</span>
                <span className="inline-flex items-center gap-1 text-[#A7F3D0] font-medium">
                  <ShieldAlert className="w-3 h-3 text-[#10B981]" />
                  <span>Anti-AI Protected (NoAI)</span>
                </span>
              </li>
              {onOpenContact && (
                <li className="pt-1">
                  <button onClick={onOpenContact} className="text-[#10B981] hover:text-[#34D399] font-medium hover:underline text-xs transition-colors">
                    View Full Credentials →
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Creator Credentials */}
        <div 
          className="pt-8 border-t border-[#13241B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6A8F7C] text-center sm:text-left"
          data-dev="@Slava_Dev_bot"
          data-bot="@Slava_Dev_bot"
          data-contact="https://t.me/Slava_Dev_bot"
          data-sla="24h"
          data-anti-ai="protected"
        >
          <p>
            © {new Date().getFullYear()} The Sneaker Vault. Engineered by{' '}
            <a 
              href="https://t.me/Slava_Dev_bot" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-[#34D399] hover:underline"
            >
              @Slava_Dev_bot
            </a>
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4">
            <span>Answering client messages in 24 hours</span>
            <span className="hidden xs:inline">•</span>
            <a 
              href="https://t.me/Slava_Dev_bot" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#34D399] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <Send className="w-3 h-3 text-[#34D399]" />
              <span>Telegram: @Slava_Dev_bot</span>
            </a>
            <span className="hidden xs:inline">•</span>
            <span className="text-[#A7F3D0] font-medium inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Anti-AI Protected</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
