"use client";

import { ExternalLink, Heart, Link2, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatDuration, genreLabel, type Video } from "./videos";

/* eslint-disable @next/next/no-img-element -- stills are remote Wikimedia thumbnails. */

function FeedSlide({
  video,
  active,
  near,
  muted,
  liked,
  onToggleMute,
  onToggleLike,
  onCopyLink,
}: {
  video: Video;
  active: boolean;
  near: boolean;
  muted: boolean;
  liked: boolean;
  onToggleMute: () => void;
  onToggleLike: () => void;
  onCopyLink: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (active) {
      el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [active]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <article className="aq-slide" data-id={video.id}>
      <img className="aq-slideBackdrop" src={video.still} alt="" aria-hidden="true" loading="lazy" />
      {/* Only the current slide and its neighbours keep a stream attached. */}
      {near ? (
        <video
          ref={videoRef}
          className="aq-slideVideo"
          src={video.srcHd}
          poster={video.still}
          muted={muted}
          loop
          playsInline
          preload={active ? "auto" : "metadata"}
          onClick={togglePlay}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          onTimeUpdate={(event) => {
            const el = event.currentTarget;
            setProgress(el.duration ? el.currentTime / el.duration : 0);
          }}
        />
      ) : (
        <img className="aq-slideVideo" src={video.still} alt="" loading="lazy" />
      )}
      {active && paused ? (
        <button className="aq-slidePaused" type="button" aria-label="播放" onClick={togglePlay}>
          <Play />
        </button>
      ) : null}
      <div className="aq-slideInfo">
        <span className="aq-genreChip">{genreLabel(video.genre)}</span>
        <h2>{video.title}</h2>
        <p>{video.description}</p>
        <a href={video.sourcePage} target="_blank" rel="noreferrer">
          © {video.studio} · {video.license} · {formatDuration(video.duration)}
          <ExternalLink size={12} />
        </a>
      </div>
      <div className="aq-slideRail">
        <button
          className={liked ? "aq-roundAction active" : "aq-roundAction"}
          type="button"
          aria-pressed={liked}
          aria-label={liked ? "取消喜欢" : "喜欢"}
          onClick={onToggleLike}
        >
          <Heart />
        </button>
        <button className="aq-roundAction" type="button" aria-label={muted ? "取消静音" : "静音"} onClick={onToggleMute}>
          {muted ? <VolumeX /> : <Volume2 />}
        </button>
        <button className="aq-roundAction" type="button" aria-label={paused ? "播放" : "暂停"} onClick={togglePlay}>
          {paused ? <Play /> : <Pause />}
        </button>
        <button className="aq-roundAction" type="button" aria-label="复制链接" onClick={onCopyLink}>
          <Link2 />
        </button>
      </div>
      <span className="aq-slideProgress" style={{ transform: `scaleX(${active ? progress : 0})` }} />
    </article>
  );
}

/** Full-screen vertical feed: one film per screen, swipe or scroll to move on. */
export function VideoFeed({
  videos,
  startId,
  isLiked,
  onToggleLike,
  onToast,
  onClose,
}: {
  videos: Video[];
  startId: string | null;
  isLiked: (id: string) => boolean;
  onToggleLike: (id: string) => void;
  onToast: (message: string) => void;
  onClose: () => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, videos.findIndex((video) => video.id === startId)),
  );
  // Browsers only autoplay muted video; sound turns on after the first tap.
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const list = listRef.current;
    const start = list?.children[activeIndex] as HTMLElement | undefined;
    start?.scrollIntoView({ block: "start", behavior: "instant" });
    return () => {
      document.body.style.overflow = previous;
    };
    // Only on open: jump to the film that was chosen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Array.prototype.indexOf.call(list.children, entry.target);
            if (index >= 0) setActiveIndex(index);
          }
        }
      },
      { root: list, threshold: 0.7 },
    );
    Array.from(list.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [videos]);

  const scrollTo = useCallback(
    (index: number) => {
      const target = listRef.current?.children[Math.max(0, Math.min(videos.length - 1, index))] as
        | HTMLElement
        | undefined;
      target?.scrollIntoView({ block: "start", behavior: "smooth" });
    },
    [videos.length],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowDown" || event.key === "j") {
        event.preventDefault();
        scrollTo(activeIndex + 1);
      } else if (event.key === "ArrowUp" || event.key === "k") {
        event.preventDefault();
        scrollTo(activeIndex - 1);
      } else if (event.key === "m") setMuted((value) => !value);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, onClose, scrollTo]);

  const copyLink = async (video: Video) => {
    try {
      await navigator.clipboard.writeText(video.sourcePage);
      onToast("链接已复制");
    } catch {
      onToast("复制链接失败");
    }
  };

  return (
    <div className="aq-feed" role="dialog" aria-modal="true" aria-label="短片滑动观看">
      <button className="aq-iconButton aq-feedClose" type="button" aria-label="返回列表" onClick={onClose}>
        <X size={20} />
      </button>
      <span className="aq-feedCounter">
        {activeIndex + 1} / {videos.length}
      </span>
      <div className="aq-feedList" ref={listRef}>
        {videos.map((video, index) => (
          <FeedSlide
            key={video.id}
            video={video}
            active={index === activeIndex}
            near={Math.abs(index - activeIndex) <= 1}
            muted={muted}
            liked={isLiked(video.id)}
            onToggleMute={() => setMuted((value) => !value)}
            onToggleLike={() => onToggleLike(video.id)}
            onCopyLink={() => copyLink(video)}
          />
        ))}
      </div>
    </div>
  );
}
