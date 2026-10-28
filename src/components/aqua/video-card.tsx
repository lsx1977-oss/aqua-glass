"use client";

import { Heart, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { formatDuration, genreLabel, type Video } from "./videos";

// Matches the grid: 4 columns on desktop (capped at 1680px wide), 3 on tablet, 2 on phones.
const POSTER_SIZES = "(min-width: 1680px) 420px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw";

export function VideoCard({
  video,
  liked,
  preload = false,
  onOpen,
}: {
  video: Video;
  liked: boolean;
  /** Load the poster right away (first row) instead of lazily. */
  preload?: boolean;
  onOpen: (video: Video) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [previewing, setPreviewing] = useState(false);
  const posterWidth = video.posterWidth ?? video.width;
  const posterHeight = video.posterHeight ?? video.height;

  // Load the stream only while hovered so the grid doesn't download every film.
  const startPreview = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    setPreviewing(true);
    requestAnimationFrame(() => {
      const el = videoRef.current;
      if (!el) return;
      el.currentTime = Math.min(20, video.duration / 4);
      el.play().catch(() => {});
    });
  };

  const stopPreview = () => {
    videoRef.current?.pause();
    setPreviewing(false);
  };

  return (
    <button
      className="aq-card aq-videoCard"
      type="button"
      onClick={() => onOpen(video)}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
    >
      <span className="aq-cardMedia aq-videoThumb" style={{ aspectRatio: `${posterWidth} / ${posterHeight}` }}>
        <Image src={video.poster} alt="" fill sizes={POSTER_SIZES} quality={90} preload={preload} />
        {previewing ? (
          <video ref={videoRef} src={video.src} muted playsInline loop preload="none" aria-hidden="true" />
        ) : null}
        <span className="aq-cardBadge">{genreLabel(video.genre)}</span>
        <span className="aq-durationBadge">{formatDuration(video.duration)}</span>
        <span className="aq-playHint" aria-hidden="true">
          <Play />
        </span>
      </span>
      <span className="aq-cardBody">
        <strong>
          {video.title}
          {liked ? <Heart className="aq-likedMark" aria-label="已喜欢" /> : null}
        </strong>
        <span>{video.studio}</span>
      </span>
    </button>
  );
}
