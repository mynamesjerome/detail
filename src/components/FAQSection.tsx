import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles, Phone, Calendar, CheckCircle2 } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Mobile Service & Requirements',
    question: 'Do you need water and electricity hookups at my location?',
    answer:
      "Yes, we just need access to a standard outdoor water spigot and a regular household electrical outlet at your home, driveway, or residence. We bring everything else—including commercial high-pressure hoses, 100ft heavy-duty extension cords, pressure washers, steam cleaners, vacuums, and all professional detailing chemicals.",
  },
  {
    category: 'Packages & Services',
    question: 'What is the difference between the Basic Interior & Exterior and the Deluxe Detail?',
    answer:
      "Our Basic Interior & Exterior Detail ($130 Sedan / $150 SUV) provides a thorough full-vehicle wash, wheel cleaning, complete interior vacuum, and wipe-down. The Deluxe Detail ($170 Sedan / $190 SUV) is our signature package that adds deep interior steam sanitation, leather conditioning, UV dashboard protectant, iron chemical decontamination, and a 3-month ceramic spray coating for maximum gloss and water-beading protection.",
  },
  {
    category: 'Austin Climate & Paint Protection',
    question: 'How do you protect vehicles from Austin’s extreme heat, UV rays, and hard water?',
    answer:
      "Central Texas sun and mineral-heavy water cause fast clear coat oxidation and cracked interiors. Our Deluxe Detail includes ceramic-infused SiO2 sealants that form a hydrophobic UV barrier to reject road grime and prevent sun fading. All interior leather and vinyl receive non-greasy UV block conditioners.",
  },
  {
    category: 'Austin Coverage & Travel Area',
    question: 'What areas and suburbs around Greater Austin do you service?',
    answer:
      "We travel throughout a 30-mile radius around Austin, Texas. Our mobile service regularly covers Austin, Westlake Hills, Lakeway, Bee Cave, Barton Creek, Tarrytown, Circle C, Round Rock, Cedar Park, Pflugerville, Leander, Georgetown, Buda, and Kyle.",
  },
  {
    category: 'Duration & Vehicle Preparation',
    question: 'How long does a detailing appointment take, and how do I prepare my car?',
    answer:
      "Basic packages typically take 1 to 2 hours, while our Deluxe Detail Package takes about 2.5 to 3.5 hours depending on your vehicle's size and condition. To prepare, we only ask that you clear personal items from the cabin and trunk so we have full access to vacuum and steam every area.",
  },
  {
    category: 'Maintenance Program',
    question: 'How does the Bi-Weekly and Monthly Maintenance Program work?',
    answer:
      "Our Maintenance Program is for clients who want their car constantly looking clean without booking full details every time. After getting an initial detail, you unlock discounted recurring maintenance washes (weekly, bi-weekly, or monthly) with priority calendar booking.",
  },
];

interface FAQSectionProps {
  onBookClick: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onBookClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-inner">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-serif">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Questions</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
            Everything you need to know about our mobile detailing packages, hookup requirements, service areas, and ceramic protection across Austin, TX.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-blue-500/50 shadow-lg shadow-blue-950/30'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none cursor-pointer group select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-black transition-colors shrink-0 ${
                        isOpen ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={`text-base sm:text-lg font-bold transition-colors ${
                        isOpen ? 'text-white' : 'text-slate-200 group-hover:text-blue-400'
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 ml-2"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-colors ${
                        isOpen ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/60 font-normal">
                        <div className="flex items-start gap-2.5 pt-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Prompt Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-800/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Ready to book your mobile detail?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-normal">
              Pick your package above or call Gavin at <span className="text-blue-400 font-bold">(512) 589-6977</span> with any questions.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:5125896977"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white transition-all inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Call / Text</span>
            </a>
            <button
              type="button"
              onClick={onBookClick}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Back to Booking Form</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
