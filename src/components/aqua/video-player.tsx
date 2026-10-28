"use client";

import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Heart,
  LoaderCircle,
  Maximize,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatDuration, genreLabel, type Video } from "./videos";

/** Glass dialog that plays one film with custom controls. */
export function VideoPlayer({
  video,
  liked,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onToggleLike,
  onClose,
}: {
  video: Video;
  liked: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleLike: () => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [buffering, setBuffering] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(video.duration);
  const [use4k, setUse4k] = useState(false);
  // Where to resume after switching quality, since changing src restarts the video.
  const resumeRef = useRef<{ time: number; play: boolean } | null>(null);

  const switchQuality = useCallback(() => {
    const el = videoRef.current;
    if (el) resumeRef.current = { time: el.currentTime, play: !el.paused };
    setBuffering(true);
    setUse4k((value) => !value);
  }, []);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  }, []);

  const seekBy = useCallback((delta: number) => {
    const el = videoRef.current;
    if (el) el.currentTime = Math.max(0, Math.min(el.duration || 0, el.currentTime + delta));
  }, []);

  const toggleMute = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }, []);

  const fullscreen = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else frame.requestFullscreen().catch(() => {});
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.tagName === "INPUT") return;
      if (event.key === "Escape") onClose();
      else if (event.key === " " || event.key === "k") {
        event.preventDefault();
        togglePlay();
      } else if (event.key === "ArrowRight") seekBy(5);
      else if (event.key === "ArrowLeft") seekBy(-5);
      else if (event.key === "m") toggleMute();
      else if (event.key === "f") fullscreen();
      else if (event.key === "n" && hasNext) onNext();
      else if (event.key === "p" && hasPrev) onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen, hasNext, hasPrev, onClose, onNext, onPrev, seekBy, toggleMute, togglePlay]);

  return (
    <div
      className="aq-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="aq-player" role="dialog" aria-modal="true" aria-labelledby="aq-player-title">
        <button className="aq-iconButton aq-playerClose" type="button" aria-label="关闭播放器" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="aq-playerFrame" ref={frameRef}>
          <video
            key={video.id}
            ref={videoRef}
            src={use4k && video.src4k ? video.src4k : video.srcHd}
            poster={video.still}
            autoPlay
            playsInline
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onWaiting={() => setBuffering(true)}
            onPlaying={() => setBuffering(false)}
            onCanPlay={() => setBuffering(false)}
            onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
            onLoadedMetadata={(event) => {
              const el = event.currentTarget;
              setDuration(el.duration || video.duration);
              const resume = resumeRef.current;
              if (resume) {
                resumeRef.current = null;
                el.currentTime = resume.time;
                if (!resume.play) el.pause();
              }
            }}
            onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
            onEnded={() => (hasNext ? onNext() : setPlaying(false))}
          />
          {buffering ? (
            <span className="aq-spinner" aria-label="加载中">
              <LoaderCircle />
            </span>
          ) : null}
          <div className="aq-controls">
            <input
              className="aq-seek"
              type="range"
              min={0}
              max={duration || 1}
              step={0.1}
              value={time}
              aria-label="播放进度"
              style={{ "--progress": `${(time / (duration || 1)) * 100}%` } as React.CSSProperties}
              onChange={(event) => {
                const el = videoRef.current;
                if (el) el.currentTime = Number(event.target.value);
              }}
            />
            <div className="aq-controlRow">
              <button type="button" aria-label={playing ? "暂停" : "播放"} onClick={togglePlay}>
                {playing ? <Pause /> : <Play />}
              </button>
              <button type="button" aria-label={muted ? "取消静音" : "静音"} onClick={toggleMute}>
                {muted ? <VolumeX /> : <Volume2 />}
              </button>
              <span className="aq-time">
                {formatDuration(time)} / {formatDuration(duration)}
              </span>
              {video.src4k ? (
                <button
                  type="button"
                  className="aq-pushRight aq-qualityButton"
                  aria-label={use4k ? "切换到 1080p" : "切换到 4K"}
                  title="4K 原片需要较快的网络"
                  onClick={switchQuality}
                >
                  {use4k ? "4K" : "1080p"}
                </button>
              ) : null}
              <button type="button" aria-label="全屏" onClick={fullscreen} className={video.src4k ? undefined : "aq-pushRight"}>
                <Maximize />
              </button>
            </div>
          </div>
        </div>
        <div className="aq-playerInfo">
          <div className="aq-playerHead">
            <div>
              <span className="aq-genreChip">{genreLabel(video.genre)}</span>
              <h2 id="aq-player-title">{video.title}</h2>
              <p className="aq-playerMeta">
                {video.studio} · {formatDuration(video.duration)}
              </p>
            </div>
            <div className="aq-playerActions">
              <button
                className={liked ? "aq-roundAction active" : "aq-roundAction"}
                type="button"
                aria-pressed={liked}
                aria-label={liked ? "取消喜欢" : "喜欢"}
                onClick={onToggleLike}
              >
                <Heart />
              </button>
              <button className="aq-roundAction" type="button" aria-label="上一部" disabled={!hasPrev} onClick={onPrev}>
                <ChevronLeft />
              </button>
              <button className="aq-roundAction" type="button" aria-label="下一部" disabled={!hasNext} onClick={onNext}>
                <ChevronRight />
              </button>
            </div>
          </div>
          <p className="aq-playerDesc">{video.description}</p>
          <a className="aq-credit" href={video.sourcePage} target="_blank" rel="noreferrer">
            © {video.studio} · {video.license} · 维基共享资源
            <ExternalLink size={13} />
          </a>
        </div>
      </section>
    </div>
  );
}
