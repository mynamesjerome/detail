import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Star, Calendar, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onBookClick: () => void;
}

interface HeroMediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  poster?: string;
  durationMs?: number;
  bgPosition?: string;
  name: string;
}

// High-definition cycling media items: Corvette -> BMW Interior (extended) -> BMW M4 Foam -> BMW M4 Pan -> Mustang -> Rest
const HERO_SHOWCASE_MEDIA: HeroMediaItem[] = [
  {
    id: 'corvette-video',
    type: 'video',
    url: '/corvette exterior after.mp4',
    poster: '/posters/corvette-poster.jpg',
    durationMs: 7000,
    bgPosition: 'center 50%',
    name: 'Corvette C8 Exterior Walkaround'
  },
  {
    id: 'bmw-interior-video',
    type: 'video',
    url: '/bmw interior.mp4',
    poster: '/posters/bmw-interior-poster.jpg',
    durationMs: 11000, // Extended duration to appreciate full cockpit detail
    bgPosition: 'center 50%',
    name: 'BMW Interior Precision Detail'
  },
  {
    id: 'bmw-m4-foam-video',
    type: 'video',
    url: '/bmw m4 foam.mp4',
    poster: '/posters/bmw-m4-foam-poster.jpg',
    durationMs: 7500,
    bgPosition: 'center 50%',
    name: 'BMW M4 Snow Foam Bath'
  },
  {
    id: 'bmw-m4-pan-video',
    type: 'video',
    url: '/bmw m4 pan.mp4',
    poster: '/posters/bmw-m4-pan-poster.jpg',
    durationMs: 7500,
    bgPosition: 'center 50%',
    name: 'BMW M4 Exterior Walkaround'
  },
  {
    id: 'mustang-after',
    type: 'image',
    url: '/mustang after read this.JPG',
    durationMs: 6000,
    bgPosition: 'center 68%', // Framed perfectly on Mustang GT front and hood
    name: 'Mustang GT Deep Gloss Finish'
  },
  {
    id: 'porsche-video',
    type: 'video',
    url: '/porsche after.mp4',
    poster: '/posters/porsche-poster.jpg',
    durationMs: 7000,
    bgPosition: 'center 50%',
    name: 'Porsche 911 Showcase'
  },
  {
    id: 'mercedes-after',
    type: 'image',
    url: '/mercedes after.JPG',
    durationMs: 6000,
    bgPosition: 'center 32%', // Moved up
    name: 'Mercedes-Benz Deep Gloss Finish'
  },
  {
    id: 'aston-angled',
    type: 'image',
    url: '/aston 2.JPG',
    durationMs: 6000,
    bgPosition: 'center 64%', // Angled Aston Martin only
    name: 'Aston Martin DBX Angled Detail'
  },
  {
    id: 'silver-video',
    type: 'video',
    url: '/silver after.mp4',
    poster: '/posters/silver-poster.jpg',
    durationMs: 7000,
    bgPosition: 'center 50%',
    name: 'Silver Sports Coupe Shine'
  },
  {
    id: 'audi-after',
    type: 'image',
    url: '/audi.JPG',
    durationMs: 6000,
    bgPosition: 'center 60%', // Moved up a little bit as requested
    name: 'Audi S-Line Front Finish'
  },
  {
    id: 'bmw-5-foam',
    type: 'video',
    url: '/bmw 5 foam.mp4',
    poster: '/posters/bmw-5-foam-poster.jpg',
    durationMs: 7000,
    bgPosition: 'center 50%',
    name: 'BMW 5-Series Foam Bath'
  }
];

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onBookClick
}) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [prevMediaIndex, setPrevMediaIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Preload showcase background images
  useEffect(() => {
    HERO_SHOWCASE_MEDIA.forEach((item) => {
      if (item.type === 'image') {
        const img = new Image();
        img.src = encodeURI(item.url);
      }
    });
  }, []);

  // Slide rotation & video playback management
  useEffect(() => {
    const currentItem = HERO_SHOWCASE_MEDIA[currentMediaIndex];
    
    // Play active video smoothly
    if (currentItem.type === 'video') {
      const vid = videoRefs.current[currentMediaIndex];
      if (vid) {
        vid.muted = true;
        // Only seek to beginning if the video is currently paused/stopped
        if (vid.paused) {
          vid.currentTime = 0;
          const playPromise = vid.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        }
      }
    }

    // Schedule next slide after duration completes
    const duration = currentItem.durationMs || 6000;
    const nextTimer = setTimeout(() => {
      setPrevMediaIndex(currentMediaIndex);
      setCurrentMediaIndex((prev) => (prev + 1) % HERO_SHOWCASE_MEDIA.length);
    }, duration);

    return () => {
      clearTimeout(nextTimer);
    };
  }, [currentMediaIndex]);

  // Pause and reset previous slide's video after cross-fade completes
  useEffect(() => {
    if (prevMediaIndex === null) return;
    const cleanupTimer = setTimeout(() => {
      const prevItem = HERO_SHOWCASE_MEDIA[prevMediaIndex];
      if (prevItem && prevItem.type === 'video') {
        const prevVid = videoRefs.current[prevMediaIndex];
        if (prevVid) {
          prevVid.pause();
          prevVid.currentTime = 0;
        }
      }
    }, 1500);

    return () => clearTimeout(cleanupTimer);
  }, [prevMediaIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-20 sm:pb-24 overflow-hidden bg-slate-950 text-white">
      {/* Background Image/Video Slider with silky-smooth layered cross-dissolve */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        {HERO_SHOWCASE_MEDIA.map((item, idx) => {
          const isActive = idx === currentMediaIndex;
          const isPrev = idx === prevMediaIndex;

          return (
            <div
              key={item.id}
              style={{
                zIndex: isActive ? 20 : isPrev ? 10 : 0,
                opacity: isActive ? 1 : isPrev ? 1 : 0,
                transition: 'opacity 1400ms cubic-bezier(0.4, 0.0, 0.2, 1)',
                willChange: 'opacity',
                transform: 'translateZ(0)',
              }}
              className="absolute inset-0 overflow-hidden pointer-events-none"
            >
              {item.type === 'video' ? (
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  poster={item.poster ? encodeURI(item.poster) : undefined}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="auto"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: item.bgPosition || 'center center' }}
                >
                  <source src={encodeURI(item.url.replace(/\.mov$/i, '.mp4'))} type="video/mp4" />
                  <source src={encodeURI(item.url.replace(/\.mp4$/i, '.MOV'))} type="video/quicktime" />
                </video>
              ) : (
                <div
                  className="w-full h-full bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url("${encodeURI(item.url)}")`,
                    backgroundPosition: item.bgPosition || 'center 50%',
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Atmospheric Gradient Overlay - low opacity so cars and videos are vivid and cinematic */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20 pointer-events-none z-30" />
        <div className="absolute inset-0 bg-black/15 pointer-events-none z-30" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        {/* Main Slogan / Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-normal sm:tracking-wide text-white uppercase leading-[1.12] mb-6 drop-shadow-2xl max-w-4xl"
        >
          FAST. LOCAL. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">
            DETAILED TO PERFECTION.
          </span>
        </motion.h1>

        {/* Concise Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-300 font-normal max-w-2xl mb-10 leading-relaxed text-balance drop-shadow"
        >
          Austin's premier mobile auto detailing. We bring professional precision care and showroom shine straight to your driveway.
        </motion.p>

        {/* Big Main Button & Action Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          {/* BIG MAIN BOOK NOW BUTTON */}
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 px-10 py-5 text-xl font-black text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-2xl shadow-blue-600/50 hover:shadow-blue-500/80 transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer tracking-wider uppercase border border-blue-400/30 group animate-shimmer relative overflow-hidden"
          >
            <Calendar className="w-6 h-6 text-blue-200 group-hover:scale-110 transition-transform relative z-10" />
            <span className="relative z-10">BOOK NOW</span>
            <ArrowRight className="w-6 h-6 text-blue-200 group-hover:translate-x-1 transition-transform relative z-10" />
          </button>

          {/* Secondary Pricing Button */}
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-5 text-base font-bold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-2xl backdrop-blur-md transition-all cursor-pointer hover:text-white"
          >
            <span>View Pricing</span>
          </button>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm font-medium text-slate-400"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Satisfaction Guaranteed</span>
          </div>
        </motion.div>
      </div>

      {/* Gradient Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950 pointer-events-none" />
    </section>
  );
};

