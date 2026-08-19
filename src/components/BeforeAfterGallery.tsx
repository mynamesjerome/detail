import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Maximize2,
  ShieldCheck,
  Camera,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Film,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title?: string;
  label?: string;
  fallbackUrl?: string;
}

export interface VehicleGroup {
  id: string;
  items: MediaItem[];
  aspectRatio: string;
  widthClass: string;
  rotation: number;
  floatDuration: number;
  yOffset: number;
  delay: number;
}

const VEHICLE_GROUPS: VehicleGroup[] = [
  {
    id: 'bmw-m4',
    items: [
      { id: 'bmw-interior', type: 'video', url: '/bmw interior.MOV', title: 'BMW Interior Detail', label: 'INTERIOR' },
      { id: 'bmw-m4-foam', type: 'video', url: '/bmw m4 foam.MOV', title: 'BMW M4 Snow Foam', label: 'FOAM' },
      { id: 'bmw-m4-pan', type: 'video', url: '/bmw m4 pan.MOV', title: 'BMW M4 Gloss Pan', label: 'WALKAROUND' }
    ],
    aspectRatio: 'aspect-[9/16]',
    widthClass: 'w-64 sm:w-72',
    rotation: -2.0,
    floatDuration: 7.2,
    yOffset: -10,
    delay: 0
  },
  {
    id: 'aston-martin',
    items: [
      { id: 'aston-1', type: 'image', url: '/aston 1.JPG' },
      { id: 'aston-2', type: 'image', url: '/aston 2.JPG' },
      { id: 'aston-3', type: 'image', url: '/aston 3.JPG' }
    ],
    aspectRatio: 'aspect-[4/3]',
    widthClass: 'w-80 sm:w-96',
    rotation: -2.5,
    floatDuration: 7.5,
    yOffset: -12,
    delay: 0.2
  },
  {
    id: 'bmw-5-series',
    items: [
      { id: 'bmw-5-foam', type: 'video', url: '/bmw 5 foam.MOV' },
      { id: 'bmw-5-interior', type: 'video', url: '/bmw 5 interior .MOV' }
    ],
    aspectRatio: 'aspect-[9/16]',
    widthClass: 'w-64 sm:w-72',
    rotation: 2.0,
    floatDuration: 8.0,
    yOffset: 10,
    delay: 0.5
  },
  {
    id: 'corvette',
    items: [
      { id: 'corvette-ext', type: 'video', url: '/corvette exterior after.MOV' }
    ],
    aspectRatio: 'aspect-[9/16]',
    widthClass: 'w-64 sm:w-72',
    rotation: -2.0,
    floatDuration: 6.8,
    yOffset: -10,
    delay: 0.4
  },
  {
    id: 'mercedes-benz',
    items: [
      { id: 'mercedes-after', type: 'image', url: '/mercedes after.JPG' }
    ],
    aspectRatio: 'aspect-[4/3]',
    widthClass: 'w-80 sm:w-96',
    rotation: 3.0,
    floatDuration: 7.8,
    yOffset: 12,
    delay: 0.9
  },
  {
    id: 'mustang-gt',
    items: [
      { id: 'mustang-before', type: 'image', url: '/mustang foam before.JPG', label: 'BEFORE (FOAM)' },
      { id: 'mustang-after', type: 'image', url: '/mustang after read this.JPG', fallbackUrl: '/mustang foam before.JPG', label: 'AFTER' }
    ],
    aspectRatio: 'aspect-[4/3]',
    widthClass: 'w-80 sm:w-96',
    rotation: -3.5,
    floatDuration: 7.0,
    yOffset: -12,
    delay: 0.6
  },
  {
    id: 'porsche',
    items: [
      { id: 'porsche-after', type: 'video', url: '/porsche after.MOV' }
    ],
    aspectRatio: 'aspect-[9/16]',
    widthClass: 'w-64 sm:w-72',
    rotation: 2.5,
    floatDuration: 8.5,
    yOffset: 14,
    delay: 1.2
  },
  {
    id: 'explorer-foam',
    items: [
      { id: 'explorer-foam', type: 'video', url: '/explorer foam.MOV' }
    ],
    aspectRatio: 'aspect-[9/16]',
    widthClass: 'w-64 sm:w-72',
    rotation: 2.0,
    floatDuration: 8.2,
    yOffset: 8,
    delay: 0.8
  },
  {
    id: 'audi',
    items: [
      { id: 'audi-finish', type: 'image', url: '/audi.JPG' }
    ],
    aspectRatio: 'aspect-[4/3]',
    widthClass: 'w-80 sm:w-96',
    rotation: -1.5,
    floatDuration: 6.5,
    yOffset: -8,
    delay: 0.3
  },
  {
    id: 'silver-spec',
    items: [
      { id: 'silver-after', type: 'video', url: '/silver after.MOV' }
    ],
    aspectRatio: 'aspect-[9/16]',
    widthClass: 'w-64 sm:w-72',
    rotation: 3.5,
    floatDuration: 9.0,
    yOffset: 16,
    delay: 1.1
  }
];

export const BeforeAfterGallery: React.FC = () => {
  // Modal selection state
  const [selectedGroup, setSelectedGroup] = useState<VehicleGroup | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);

  // Per-card active item index for flipping within cards
  const [cardActiveIndices, setCardActiveIndices] = useState<Record<string, number>>({});

  // Image Zoom & Pan States
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialPanOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Video Player States
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showVideoControls, setShowVideoControls] = useState<boolean>(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const galleryRowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [scrollStartX, setScrollStartX] = useState<number>(0);
  const [hasMovedDrag, setHasMovedDrag] = useState<boolean>(false);

  // Seamless looping stream with plenty of cards to scroll in 1 row
  const showcaseItems = React.useMemo(() => [...VEHICLE_GROUPS, ...VEHICLE_GROUPS], []);

  // Ambient gentle auto-scrolling that only pauses when clicking to drag or opening a modal
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const autoScroll = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isDragging && galleryRowRef.current && !selectedGroup) {
        const el = galleryRowRef.current;
        // Gentle smooth drift
        const speed = 0.04 * delta;
        el.scrollLeft += speed;

        // Loop seamlessly when reaching half-way through the duplicated items
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, selectedGroup]);

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = galleryRowRef.current;
    if (!el) return;
    setIsDragging(true);
    setHasMovedDrag(false);
    setDragStartX(e.pageX - el.offsetLeft);
    setScrollStartX(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = galleryRowRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasMovedDrag(true);
    }
    el.scrollLeft = scrollStartX - walk;

    // Loop bounds
    if (el.scrollLeft >= el.scrollWidth / 2) {
      el.scrollLeft -= el.scrollWidth / 2;
      setScrollStartX((prev) => prev - el.scrollWidth / 2);
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += el.scrollWidth / 2;
      setScrollStartX((prev) => prev + el.scrollWidth / 2);
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Reset zoom & pan whenever selected item changes
  const resetZoomAndPan = useCallback(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const activeMediaItem = selectedGroup ? selectedGroup.items[activeMediaIndex] : null;

  // Lock background page scroll when lightbox modal is open
  useEffect(() => {
    if (selectedGroup) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedGroup]);

  // Non-passive wheel event listener so mouse-wheel zoom never scrolls the website
  useEffect(() => {
    const el = imageContainerRef.current;
    if (!el || activeMediaItem?.type === 'video') return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const zoomDelta = e.deltaY < 0 ? 0.3 : -0.3;
      setZoomLevel((prev) => {
        const next = Math.min(Math.max(prev + zoomDelta, 1), 4);
        if (next === 1) setPanOffset({ x: 0, y: 0 });
        return next;
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [selectedGroup, activeMediaItem]);

  useEffect(() => {
    resetZoomAndPan();
    setIsPlaying(false);
    setCurrentTime(0);
  }, [selectedGroup, activeMediaIndex, resetZoomAndPan]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsVideoFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Format seconds to mm:ss
  const formatTime = (timeInSec: number) => {
    if (isNaN(timeInSec)) return '0:00';
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Video Controls Handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!videoWrapperRef.current) return;
    if (!document.fullscreenElement) {
      if (videoWrapperRef.current.requestFullscreen) {
        videoWrapperRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleVideoMouseMove = () => {
    setShowVideoControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowVideoControls(false);
      }, 2500);
    }
  };

  // Image Zoom Handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleDoubleClick = () => {
    if (activeMediaItem?.type === 'video') return;
    if (zoomLevel > 1) {
      resetZoomAndPan();
    } else {
      setZoomLevel(2.5);
    }
  };

  const handlePanPointerDown = (e: React.PointerEvent) => {
    if (zoomLevel <= 1) return;
    setIsPanning(true);
    panStartRef.current = { x: e.clientX, y: e.clientY };
    initialPanOffsetRef.current = { ...panOffset };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePanPointerMove = (e: React.PointerEvent) => {
    if (!isPanning || zoomLevel <= 1) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    setPanOffset({
      x: initialPanOffsetRef.current.x + dx,
      y: initialPanOffsetRef.current.y + dy
    });
  };

  const handlePanPointerUp = (e: React.PointerEvent) => {
    setIsPanning(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Flip within a group
  const handlePrevMedia = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedGroup) return;
    setActiveMediaIndex((prev) => (prev > 0 ? prev - 1 : selectedGroup.items.length - 1));
  };

  const handleNextMedia = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedGroup) return;
    setActiveMediaIndex((prev) => (prev < selectedGroup.items.length - 1 ? prev + 1 : 0));
  };

  // Flip on card directly
  const handleCardPrev = (e: React.MouseEvent, group: VehicleGroup) => {
    e.stopPropagation();
    setCardActiveIndices((prev) => {
      const current = prev[group.id] || 0;
      const next = current > 0 ? current - 1 : group.items.length - 1;
      return { ...prev, [group.id]: next };
    });
  };

  const handleCardNext = (e: React.MouseEvent, group: VehicleGroup) => {
    e.stopPropagation();
    setCardActiveIndices((prev) => {
      const current = prev[group.id] || 0;
      const next = current < group.items.length - 1 ? current + 1 : 0;
      return { ...prev, [group.id]: next };
    });
  };

  // Keyboard controls for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedGroup) return;
      if (e.key === 'Escape') {
        setSelectedGroup(null);
      } else if (activeMediaItem?.type === 'video') {
        if (e.key === ' ' || e.key === 'k') {
          e.preventDefault();
          togglePlay();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (videoRef.current) videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          if (videoRef.current) videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, duration);
        } else if (e.key === 'f' || e.key === 'F') {
          e.preventDefault();
          toggleFullscreen();
        } else if (e.key === 'm' || e.key === 'M') {
          e.preventDefault();
          toggleMute();
        }
      } else {
        if (e.key === 'ArrowLeft') {
          handlePrevMedia();
        } else if (e.key === 'ArrowRight') {
          handleNextMedia();
        } else if (e.key === '+' || e.key === '=') {
          handleZoomIn();
        } else if (e.key === '-') {
          handleZoomOut();
        } else if (e.key === '0' || e.key === 'r') {
          resetZoomAndPan();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGroup, activeMediaItem, duration, isMuted, zoomLevel]);

  const scrollRow = (direction: 'left' | 'right') => {
    const el = galleryRowRef.current;
    if (!el) return;

    const scrollDistance = direction === 'left' ? -480 : 480;
    const startX = el.scrollLeft;
    const startTime = performance.now();
    const duration = 500;

    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      el.scrollLeft = startX + scrollDistance * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <section id="gallery" className="py-20 scroll-mt-20 sm:scroll-mt-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-4 py-1.5 rounded-full border border-blue-800/80 shadow-inner mb-3">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>High-Res Photo & Video Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Gavin's Detail Gallery
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-400 font-normal">
            Swipe or click arrows to browse.
          </p>

          {/* Quick Manual Navigation Buttons for Mobile & Desktop */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.90 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollRow('left')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 hover:text-white shadow-lg shadow-black/40 transition-colors cursor-pointer group"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-0.5 transition-transform" />
              <span>Scroll Left</span>
            </motion.button>

            <span className="text-[11px] text-slate-500 font-medium px-2">
              Swipe or click arrows
            </span>

            <motion.button
              type="button"
              whileTap={{ scale: 0.90 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollRow('right')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 hover:text-white shadow-lg shadow-black/40 transition-colors cursor-pointer group"
              aria-label="Scroll right"
            >
              <span>Scroll Right</span>
              <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Scrapbook Stream Container - 1 Unified Responsive Row */}
      <div className="relative w-full py-4">
        {/* Left and Right Fade Edge Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none" />

        {/* Unified Stream Row */}
        <div
          ref={galleryRowRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          style={{
            touchAction: 'pan-x pan-y',
            WebkitOverflowScrolling: 'touch',
          }}
          className={`flex gap-6 sm:gap-10 w-full overflow-x-auto scrollbar-none py-10 sm:py-14 px-6 sm:px-12 items-center select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {showcaseItems.map((group, index) => {
            const activeIdx = cardActiveIndices[group.id] || 0;
            const currentItem = group.items[activeIdx] || group.items[0];
            const isVideo = currentItem.type === 'video';
            const hasMultiple = group.items.length > 1;
            const safeMediaUrl = encodeURI(currentItem.url);

            return (
              <motion.div
                key={`gallery-${group.id}-${index}`}
                onClick={() => {
                  if (hasMovedDrag) return;
                  setSelectedGroup(group);
                  setActiveMediaIndex(activeIdx);
                }}
                animate={{
                  y: [group.yOffset, -group.yOffset * 1.25, group.yOffset],
                  rotate: [group.rotation, group.rotation + (group.rotation >= 0 ? 1.6 : -1.6), group.rotation],
                }}
                transition={{
                  duration: group.floatDuration,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: group.delay,
                }}
                style={{
                  marginTop: `${(index % 2 === 0 ? group.yOffset * 1.4 : -group.yOffset * 1.2)}px`,
                  transformOrigin: 'center center',
                }}
                className={`group/card relative cursor-pointer shrink-0 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-blue-500/70 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.05] hover:!rotate-0 hover:z-30 ${group.widthClass} ${index % 3 === 1 ? 'mx-1 sm:mx-3' : index % 3 === 2 ? 'mx-3 sm:mx-6' : 'mx-2 sm:mx-4'}`}
              >
                {/* Media Container */}
                <div className={`relative w-full ${group.aspectRatio} rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center`}>
                  {isVideo ? (
                    <video
                      src={safeMediaUrl}
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={safeMediaUrl}
                      alt="Car Detail"
                      decoding="async"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (currentItem.fallbackUrl && !target.src.includes(encodeURI(currentItem.fallbackUrl))) {
                          target.src = encodeURI(currentItem.fallbackUrl);
                        } else if (!target.src.includes(encodeURI('/mercedes after.JPG'))) {
                          target.src = encodeURI('/mercedes after.JPG');
                        }
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                    />
                  )}

                  {/* Top Gloss Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Video Badge & Play Button */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl border border-blue-400/50 backdrop-blur-sm group-hover/card:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 text-[10px] font-bold text-blue-300 border border-slate-700 backdrop-blur-sm flex items-center gap-1">
                        <Film className="w-3 h-3 text-blue-400" />
                        <span>VIDEO</span>
                      </div>
                    </div>
                  )}

                  {/* Multi-Photo / Multi-Angle Flipping Badge on Card */}
                  {hasMultiple && (
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-slate-950/85 backdrop-blur-md px-2 py-1 rounded-full border border-slate-700/80 z-10 shadow-lg">
                      <button
                        type="button"
                        onClick={(e) => handleCardPrev(e, group)}
                        className="p-0.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                        title="Previous angle"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] font-mono font-bold text-blue-400 px-1">
                        {currentItem.label ? currentItem.label : `${activeIdx + 1} / ${group.items.length}`}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleCardNext(e, group)}
                        className="p-0.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                        title="Next angle"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Expand Icon on Hover */}
                  <div className="absolute bottom-2.5 right-2.5 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <span className="p-1.5 rounded-full bg-slate-950/80 text-blue-400 border border-slate-800 flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Video Interactive Player Modal */}
      <AnimatePresence>
        {selectedGroup && activeMediaItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGroup(null)}
              className="fixed inset-0 bg-slate-950/95 backdrop-blur-lg"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col"
            >
              {/* Modal Top Control Bar */}
              <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-slate-800 bg-slate-950/90 gap-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  {activeMediaItem.type === 'video' ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/90 text-blue-300 border border-blue-800 text-xs font-bold shrink-0">
                      <Film className="w-3.5 h-3.5 text-blue-400" />
                      <span>HD Video Showcase</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/80 text-xs font-bold shrink-0">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>Full Resolution Inspection</span>
                    </div>
                  )}

                  {/* Multi-angle switcher tabs in header */}
                  {selectedGroup.items.length > 1 && (
                    <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-full border border-slate-800 shrink-0">
                      {selectedGroup.items.map((item, idx) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setActiveMediaIndex(idx);
                            resetZoomAndPan();
                          }}
                          className={`px-3 py-0.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                            activeMediaIndex === idx
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {item.type === 'video' ? <Film className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                          <span>{item.label || `${idx + 1}`}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right controls: Zoom Toolbar (for images) or Close */}
                <div className="flex items-center gap-2 shrink-0">
                  {activeMediaItem.type !== 'video' && (
                    <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-full px-2 py-1">
                      <button
                        type="button"
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 1}
                        className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Zoom Out (-)"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>

                      <span className="text-[11px] font-mono font-bold text-blue-400 px-1 min-w-[42px] text-center">
                        {Math.round(zoomLevel * 100)}%
                      </span>

                      <button
                        type="button"
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 4}
                        className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Zoom In (+)"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>

                      {zoomLevel > 1 && (
                        <button
                          type="button"
                          onClick={resetZoomAndPan}
                          className="p-1 rounded-full text-amber-400 hover:bg-slate-800 transition-colors ml-0.5"
                          title="Reset Zoom (0)"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedGroup(null)}
                    className="p-1.5 sm:p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* MEDIA STAGE */}
              <div className="relative w-full">
                {activeMediaItem.type === 'video' ? (
                  /* VIDEO PLAYER CONTAINER */
                  <div
                    ref={videoWrapperRef}
                    onMouseMove={handleVideoMouseMove}
                    className="relative w-full h-80 sm:h-[460px] md:h-[500px] bg-black select-none overflow-hidden flex items-center justify-center group"
                  >
                    <video
                      key={activeMediaItem.url}
                      ref={videoRef}
                      src={encodeURI(activeMediaItem.url)}
                      className="w-full h-full object-contain"
                      playsInline
                      loop
                      onClick={togglePlay}
                      onTimeUpdate={() => {
                        if (videoRef.current) {
                          setCurrentTime(videoRef.current.currentTime);
                        }
                      }}
                      onLoadedMetadata={() => {
                        if (videoRef.current) {
                          setDuration(videoRef.current.duration);
                        }
                      }}
                      onEnded={() => setIsPlaying(false)}
                    />

                    {/* Big Centered Play/Pause Click Overlay */}
                    {(!isPlaying || showVideoControls) && (
                      <button
                        type="button"
                        onClick={togglePlay}
                        className={`absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-950/80 text-white flex items-center justify-center shadow-2xl border border-white/20 backdrop-blur-md transition-all transform hover:scale-110 active:scale-95 ${
                          !isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'
                        }`}
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 fill-white" />
                        ) : (
                          <Play className="w-8 h-8 fill-white ml-1" />
                        )}
                      </button>
                    )}

                    {/* Custom Bottom Video Control Bar */}
                    <div
                      className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-3 sm:p-4 transition-opacity duration-300 flex flex-col gap-2 ${
                        showVideoControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      {/* Scrub Timeline Bar */}
                      <div className="relative w-full flex items-center group/scrub">
                        <input
                          type="range"
                          min="0"
                          max={duration || 100}
                          step="0.1"
                          value={currentTime}
                          onChange={handleSeek}
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:h-2.5 transition-all"
                        />
                      </div>

                      {/* Controls Row */}
                      <div className="flex items-center justify-between gap-2 text-white">
                        {/* Left: Play/Pause, Rewind, Time, Volume */}
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={togglePlay}
                            className="p-1.5 text-white hover:text-blue-400 transition-colors"
                            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                          >
                            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (videoRef.current) videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
                            }}
                            className="p-1 text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-0.5"
                            title="Rewind 5s (Left Arrow)"
                          >
                            <RotateCcw className="w-4 h-4" />
                            <span className="text-[10px]">5s</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (videoRef.current) videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, duration);
                            }}
                            className="p-1 text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-0.5"
                            title="Forward 5s (Right Arrow)"
                          >
                            <RotateCw className="w-4 h-4" />
                            <span className="text-[10px]">5s</span>
                          </button>

                          {/* Timestamp */}
                          <span className="text-xs font-mono text-slate-300 font-medium">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>

                          {/* Volume Slider & Toggle */}
                          <div className="hidden sm:flex items-center gap-1.5 group/vol ml-2">
                            <button
                              type="button"
                              onClick={toggleMute}
                              className="p-1 text-slate-300 hover:text-white transition-colors"
                              title={isMuted ? 'Unmute (m)' : 'Mute (m)'}
                            >
                              {isMuted || volume === 0 ? (
                                <VolumeX className="w-4 h-4 text-red-400" />
                              ) : (
                                <Volume2 className="w-4 h-4" />
                              )}
                            </button>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={isMuted ? 0 : volume}
                              onChange={handleVolumeChange}
                              className="w-16 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                          </div>
                        </div>

                        {/* Right: Speed & Fullscreen */}
                        <div className="flex items-center gap-2">
                          {/* Playback speed selector with slow-mo options */}
                          <div className="flex items-center bg-slate-900/90 rounded-full p-0.5 border border-slate-700 text-xs">
                            <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-400 px-1.5 hidden md:inline">
                              Speed
                            </span>
                            {[0.25, 0.5, 0.75, 1, 1.5, 2].map((spd) => (
                              <button
                                key={spd}
                                type="button"
                                onClick={() => handleSpeedChange(spd)}
                                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                                  playbackSpeed === spd
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                                title={spd < 1 ? `Slow Motion (${spd}x)` : `${spd}x speed`}
                              >
                                {spd < 1 ? `${spd}x` : `${spd}x`}
                              </button>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={toggleFullscreen}
                            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-full transition-colors"
                            title="Toggle Fullscreen (f)"
                          >
                            {isVideoFullscreen ? (
                              <Minimize className="w-4 h-4" />
                            ) : (
                              <Maximize className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* PHOTO STAGE WITH INTERACTIVE ZOOM & PAN */
                  <div
                    ref={imageContainerRef}
                    onDoubleClick={handleDoubleClick}
                    onPointerDown={handlePanPointerDown}
                    onPointerMove={handlePanPointerMove}
                    onPointerUp={handlePanPointerUp}
                    className={`relative h-80 sm:h-[460px] md:h-[500px] w-full bg-slate-950 select-none overflow-hidden flex items-center justify-center ${
                      zoomLevel > 1 ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
                    }`}
                  >
                    <div
                      className="relative w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
                      style={{
                        transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                        transformOrigin: 'center center'
                      }}
                    >
                      <img
                        key={activeMediaItem.url}
                        src={encodeURI(activeMediaItem.url)}
                        alt="Car Detail"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (activeMediaItem.fallbackUrl && !target.src.includes(encodeURI(activeMediaItem.fallbackUrl))) {
                            target.src = encodeURI(activeMediaItem.fallbackUrl);
                          } else if (!target.src.includes(encodeURI('/mercedes after.JPG'))) {
                            target.src = encodeURI('/mercedes after.JPG');
                          }
                        }}
                        draggable={false}
                        className="max-w-full max-h-full object-contain rounded-xl select-none pointer-events-none"
                      />
                    </div>

                    {/* Floating Zoom Hint */}
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-full px-3 py-1 text-[10px] text-slate-400 font-medium flex items-center gap-1.5 pointer-events-none">
                      <span>
                        {zoomLevel > 1
                          ? 'Drag to pan • Double click or scroll to reset'
                          : 'Scroll or double-click to zoom in close'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Left/Right Floating Chevrons for Multi-Angle Media */}
                {selectedGroup.items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevMedia}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/80 text-white flex items-center justify-center shadow-2xl border border-slate-700/80 backdrop-blur-md hover:bg-blue-600 transition-colors z-20"
                      title="Previous angle (Left Arrow)"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleNextMedia}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/80 text-white flex items-center justify-center shadow-2xl border border-slate-700/80 backdrop-blur-md hover:bg-blue-600 transition-colors z-20"
                      title="Next angle (Right Arrow)"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Footer CTA */}
              <div className="p-3.5 sm:p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Mobile On-Site Service across Austin, TX</span>
                </span>
                <a
                  href="#booking"
                  onClick={() => setSelectedGroup(null)}
                  className="w-full sm:w-auto py-2.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm text-center shadow-lg transition-colors cursor-pointer"
                >
                  Book This Treatment
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
