import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  ShieldCheck, 
  Award
} from 'lucide-react';

interface AuthenticationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const points = [
    {
      num: '1',
      title: 'Ultraviolet Luminescence Analysis',
      desc: 'Midsole glue patterns, watermarks, and invisible factory stamps are examined under 365nm UV rays.'
    },
    {
      num: '2',
      title: 'Digital Scale Weight Calibration (±2g)',
      desc: 'Every authentic pair has a strict micro-gram tolerance. We weigh each shoe against verified reference standards.'
    },
    {
      num: '3',
      title: 'Stitch Gauge & Density Inspection',
      desc: 'Stitch frequency, thread tension, corner turn angles, and bartack finishes are evaluated under magnification.'
    },
    {
      num: '4',
      title: 'Manufacturer RFID & Serial Validation',
      desc: 'Internal manufacturer chips and serial identifiers are matched against verified production releases.'
    },
    {
      num: '5',
      title: 'Foam Cushioning Durometer Test',
      desc: 'Shore C durometer instruments verify the exact density and elasticity of ZoomX, Boost, or EVA compounds.'
    },
    {
      num: '6',
      title: 'Insole & Strobel Board Construction',
      desc: 'Footbeds are removed to examine underneath strobel stitching, tape reinforcement, and factory marks.'
    },
    {
      num: '7',
      title: 'Packaging Matrix & Typography',
      desc: 'Barcode resolution, font kerning, box lid folds, and label alignments are checked against authentic benchmarks.'
    },
    {
      num: '8',
      title: 'Leather Grain & Material Tactility',
      desc: 'Calfskin nap, tumbled leather depth, and textile weave are verified by master leather artisans.'
    },
    {
      num: '9',
      title: 'Factory Adhesive Olfactory Assessment',
      desc: 'Proprietary assembly solvents evaluated to detect volatile synthetic glues found in unauthorized copies.'
    },
    {
      num: '10',
      title: 'Hardware & Eyelet Finishing',
      desc: 'Metal eyelets, aglets, zip ties, and debossed logos measured for precise alloy and stamping depth.'
    },
    {
      num: '11',
      title: 'Provenance & Chain of Custody Audit',
      desc: 'Invoices, authorized retail order records, and secondary ownership provenance are verified.'
    },
    {
      num: '12',
      title: 'Vault Physical Security Medallion',
      desc: 'Once passed, each shoe receives our tamper-evident numbered Vault medallion guaranteeing authenticity.'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", damping: 28, stiffness: 350 }}
        className="relative w-full max-w-3xl bg-[#0D1712]/98 backdrop-blur-xl border border-[#1A3326] rounded-3xl sm:rounded-4xl shadow-2xl overflow-hidden z-10 max-h-[92vh] sm:max-h-[90vh] flex flex-col text-[#F4FAF6]"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#182E21] flex items-center justify-between bg-[#0A130E]/90 flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#101E17] border border-[#1A3326] flex-shrink-0 flex items-center justify-center text-[#10B981]">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm xs:text-base sm:text-xl md:text-2xl font-serif font-bold text-[#F4FAF6] leading-tight">
                12-Point Authentication Standard
              </h3>
              <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#8CA899] mt-0.5 break-words">
                Physical In-Hand Inspection • Zero Compromise
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ rotate: 90, scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-[#101E17] hover:bg-[#162A1F] text-[#A7F3D0] hover:text-white border border-[#1A3326] flex-shrink-0 transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="p-4 rounded-3xl bg-[#0E1813] border border-[#182E21] flex items-center gap-3">
            <Award className="w-6 h-6 text-[#10B981] flex-shrink-0" />
            <p className="text-xs text-[#A7F3D0] leading-relaxed">
              Unlike platforms relying only on photo uploads, <strong className="text-[#F4FAF6]">every single pair</strong> passes through our specialized laboratory verification suites before reaching your hands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {points.map((pt) => (
              <motion.div 
                key={pt.num}
                whileHover={{ y: -2, borderColor: '#00875A' }}
                className="p-4 rounded-2xl bg-[#0E1813]/80 border border-[#182E21] space-y-1 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#13241B] text-[#10B981] border border-[#1E3F2D] font-bold text-xs flex items-center justify-center shrink-0">
                    {pt.num}
                  </span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#F4FAF6] break-words">{pt.title}</h4>
                </div>
                <p className="text-[11px] text-[#8CA899] leading-relaxed pl-8">
                  {pt.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#101E17] border border-[#1A3326] text-center text-xs text-[#D1FAE5] font-medium">
            Full 100% money-back guarantee if any item authenticated by our specialists is ever determined otherwise.
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#182E21] bg-[#0A130E] flex justify-end">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-7 py-2.5 rounded-full bg-[#00875A] hover:bg-[#059669] text-white text-xs font-bold tracking-wide shadow-md shadow-[#00875A]/20 transition-colors"
          >
            Close Guide
          </motion.button>
        </div>

      </motion.div>
    </motion.div>
  );
};
