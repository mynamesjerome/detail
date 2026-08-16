import React, { useState, useRef, useEffect } from 'react';
import { Review } from '../types';
import { REVIEWS } from '../data/content';
import { Star, ExternalLink, Quote, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';

export const ReviewsMarquee: React.FC = () => {
  const [activeReview, setActiveReview] = useState<Review | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isInteracting = useRef(false);
  const interactTimeout = useRef<NodeJS.Timeout | null>(null);

  // 4x duplicated array for smooth infinite wrap-around
  const duplicatedReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS];

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let initialized = false;
    let animId: number;
    let pos = 0;

    const step = () => {
      if (el && el.scrollWidth > 0) {
        const setWidth = el.scrollWidth / 4;
        if (setWidth > 0) {
          if (!initialized) {
            pos = setWidth;
            el.scrollLeft = pos;
            initialized = true;
          }

          if (!isInteracting.current) {
            pos += 0.85; // Smooth constant auto-scroll
            if (pos >= setWidth * 3) {
              pos -= setWidth;
            } else if (pos < setWidth / 2) {
              pos += setWidth;
            }
            el.scrollLeft = pos;
          } else {
            pos = el.scrollLeft;
          }
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    const markInteraction = () => {
      isInteracting.current = true;
      if (interactTimeout.current) clearTimeout(interactTimeout.current);
      interactTimeout.current = setTimeout(() => {
        isInteracting.current = false;
      }, 1500);
    };

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onPointerDown = (e: PointerEvent) => {
      isInteracting.current = true;
      if (interactTimeout.current) clearTimeout(interactTimeout.current);
      if (e.pointerType === 'mouse') {
        isDragging = true;
        startX = e.clientX;
        startScrollLeft = el.scrollLeft;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - startX;
        el.scrollLeft = startScrollLeft - dx;
        markInteraction();
      }
    };

    const onPointerUp = () => {
      if (isDragging) isDragging = false;
      markInteraction();
    };

    const onWheel = () => {
      markInteraction();
    };

    el.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
    el.addEventListener('touchstart', markInteraction, { passive: true });
    el.addEventListener('touchend', markInteraction, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      if (interactTimeout.current) clearTimeout(interactTimeout.current);
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('touchstart', markInteraction);
      el.removeEventListener('touchend', markInteraction);
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <section id="reviews" className="py-20 scroll-mt-20 sm:scroll-mt-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0 Star Rated on Google</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Trusted Across Greater Austin
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 font-normal max-w-xl">
              Real reviews from local truck owners, daily commuters, and busy families.
            </p>
          </div>

          {/* Top Right Direct Button */}
          <a
            href="https://share.google/ZfnGtW2sYFWglAEk6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer group shrink-0"
          >
            <span>Read All Reviews on Google</span>
            <ExternalLink className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Horizontally Scrollable Reviews Container */}
      <div className="relative w-full py-4 group">
        {/* Left and Right Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Scrollable Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 w-full overflow-x-auto scrollbar-none px-4 sm:px-12 py-2 touch-pan-x cursor-grab active:cursor-grabbing select-none"
        >
          {duplicatedReviews.map((rev, index) => (
            <div
              key={`${rev.id}-${index}`}
              onClick={() => setActiveReview(rev)}
              className="w-[300px] sm:w-[380px] bg-slate-900/90 border border-slate-800 hover:border-blue-500/80 rounded-3xl p-6 flex flex-col justify-between shrink-0 shadow-xl hover:shadow-2xl hover:bg-slate-900 transition-all cursor-pointer group/card"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-700 group-hover/card:text-blue-500 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed line-clamp-4 mb-6">
                  "{rev.text}"
                </p>
              </div>

              {/* Author & Badge Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover/card:text-blue-400 transition-colors">
                    {rev.author}
                  </h4>
                  {rev.role && (
                    <span className="text-[11px] text-blue-400 font-medium">
                      {rev.role}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full">
                  <ThumbsUp className="w-3 h-3 text-emerald-400" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal for Expanded Reading */}
      {activeReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full text-white shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <button
                onClick={() => setActiveReview(null)}
                className="text-slate-400 hover:text-white p-1 text-sm font-bold"
              >
                ✕ Close
              </button>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{activeReview.author}</h3>
            {activeReview.role && (
              <p className="text-xs text-blue-400 font-medium mb-4">{activeReview.role}</p>
            )}

            <p className="text-sm text-slate-200 leading-relaxed font-normal mb-6">
              "{activeReview.text}"
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">Google Review for Gavin's Car Detailing</span>
              <a
                href="https://share.google/ZfnGtW2sYFWglAEk6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>View on Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
