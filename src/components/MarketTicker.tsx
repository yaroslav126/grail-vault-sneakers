import React from 'react';
import { LIVE_TICKER_DATA } from '../data/shoes';

interface MarketTickerProps {
  onSelectTickerItem?: (name: string) => void;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ onSelectTickerItem }) => {
  return (
    <div className="w-full bg-[#0B140F] border-b border-[#162B1F] overflow-hidden py-2.5 select-none">
      <div className="flex items-center">
        {/* Left Badge */}
        <div className="hidden md:flex items-center px-4 py-0.5 bg-[#101E17] border-r border-[#1B3627] z-10 flex-shrink-0 text-xs font-semibold text-[#A7F3D0]">
          <span>Curated Market Activity</span>
        </div>

        {/* Marquee Content */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="flex items-center gap-8 animate-marquee">
            {[...LIVE_TICKER_DATA, ...LIVE_TICKER_DATA].map((item, idx) => (
              <div 
                key={idx}
                onClick={() => onSelectTickerItem?.(item.item)}
                className="flex items-center gap-2 cursor-pointer group text-xs text-[#8CA899] hover:text-[#F4FAF6] transition-colors"
              >
                <span className="font-medium group-hover:underline">
                  {item.item}
                </span>
                <span className="font-semibold text-[#F4FAF6] bg-[#12241B] px-2 py-0.5 rounded-full border border-[#1E3F2E]">
                  {item.price}
                </span>
                <span className="text-[#10B981] font-semibold">
                  {item.change}
                </span>
                <span className="text-[#1E3A2B] mx-2">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
