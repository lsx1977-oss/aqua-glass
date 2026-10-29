"use client";

import { ChevronDown, Compass, GalleryVerticalEnd, Heart, Moon, Play, Search, Sun, WandSparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLiked } from "./use-video-prefs";
import { VideoCard } from "./video-card";
import { VideoFeed } from "./video-feed";
import { VideoPlayer } from "./video-player";
import { GENRES, VIDEOS, genreLabel, type Video } from "./videos";
import "./aqua-glass.css";

type Theme = "light" | "dark";

function useColumnCount() {
  const [count, setCount] = useState(4);
  useEffect(() => {
    const update = () => setCount(window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

function readTheme(): Theme {
  try {
    return localStorage.getItem("aq-theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function AquaGlassApp() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [tab, setTab] = useState<"explore" | "liked">("explore");
  const [genre, setGenre] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [feedStart, setFeedStart] = useState<string | null | undefined>(undefined);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const columns = useColumnCount();
  const { liked, toggle: toggleLike, isLiked } = useLiked();

  useEffect(() => {
    const stored = readTheme();
    const frame = requestAnimationFrame(() => setTheme(stored));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      if (y < last - 3 || y <= 4) setOffscreen(false);
      else if (y > last + 3 && toolbarRef.current && toolbarRef.current.getBoundingClientRect().top <= 82) {
        setOffscreen(true);
      }
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast((current) => (current === message ? "" : current)), 2400);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("aq-theme", next);
    } catch {
      // Ignore storage failures.
    }
  };

  const visible = useMemo(() => {
    if (tab === "liked") return liked.map((id) => VIDEOS.find((video) => video.id === id)).filter(Boolean) as Video[];
    const needle = query.trim().toLowerCase();
    return VIDEOS.filter(
      (video) =>
        (genre === "All" || video.genre === genre) &&
        (!needle || `${video.title} ${video.genre} ${genreLabel(video.genre)} ${video.studio} ${video.description}`.toLowerCase().includes(needle)),
    );
  }, [genre, liked, query, tab]);

  const playingIndex = visible.findIndex((video) => video.id === playingId);
  const playing = playingIndex >= 0 ? visible[playingIndex] : VIDEOS.find((video) => video.id === playingId);
  const openFeed = (startId: string | null = null) => {
    setMenuOpen(false);
    setPlayingId(null);
    setFeedStart(startId);
  };

  return (
    <div className="aq-root" data-theme={theme} lang="zh-CN">
      <header className={offscreen ? "aq-header offscreen" : "aq-header"}>
        <div className={scrolled ? "aq-bar scrolled" : "aq-bar"}>
          <div className="aq-menuWrap" ref={menuRef}>
            <button
              className="aq-iconButton"
              type="button"
              aria-label="菜单"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className={menuOpen ? "aq-burger open" : "aq-burger"}>
                <span />
                <span />
                <span />
              </span>
            </button>
            {menuOpen ? (
              <div className="aq-menu" role="menu">
                <button type="button" role="menuitem" onClick={() => { setTab("explore"); setMenuOpen(false); }}>
                  <Compass /> 发现
                </button>
                <button type="button" role="menuitem" onClick={() => openFeed()}>
                  <GalleryVerticalEnd /> 滑动观看
                </button>
                <button type="button" role="menuitem" onClick={() => { setTab("liked"); setMenuOpen(false); }}>
                  <Heart /> 我喜欢 <small>{liked.length}</small>
                </button>
                <button type="button" role="menuitem" aria-label="切换深色模式" onClick={toggleTheme}>
                  {theme === "dark" ? <Sun /> : <Moon />} {theme === "dark" ? "浅色" : "深色"}模式
                </button>
              </div>
            ) : null}
          </div>
          <a className="aq-logo" href="#" aria-label="Aqua 短片首页">
            <span className="aq-wordmark">
              <WandSparkles aria-hidden="true" />
              Aqua
            </span>
            <span className="aq-tagline">好看的短片 · 一划就有</span>
          </a>
          <button className="aq-loginButton" type="button" onClick={() => openFeed()}>
            观看
          </button>
        </div>
      </header>

      <main className="aq-main">
        <h1 className="aq-srOnly">Aqua 短片：观看开源动画短片和 NASA 高清太空影像</h1>

        <section className="aq-promo" aria-labelledby="aq-promo-title">
          <div className="aq-promoCard">
            <video
              className="aq-promoVideo"
              src={VIDEOS[0].src}
              poster={VIDEOS[0].still}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
            <div className="aq-promoCopy">
              <h2 className="aq-promoTitle" id="aq-promo-title">
                <span>开源动画短片 · NASA 4K 太空影像</span>
                <span>上下一划，一部接一部 🎬</span>
              </h2>
              <p className="aq-promoText">共 {VIDEOS.length} 部高清影片，来自 Blender 工作室和 NASA，全部免费观看，像刷短视频一样一部接一部。</p>
              <button className="aq-promoButton" type="button" onClick={() => openFeed()}>
                <Play aria-hidden="true" />
                开始观看
              </button>
            </div>
          </div>
        </section>

        <div className="aq-toolbar" ref={toolbarRef}>
          <div className="aq-tabsRow">
            <nav className="aq-tabs" aria-label="栏目">
              <span
                className="aq-tabIndicator"
                aria-hidden="true"
                style={{ transform: `translateX(${tab === "explore" ? 0 : columns === 2 ? 106 : 124}px)` }}
              />
              <button
                className={tab === "explore" ? "aq-tab active" : "aq-tab"}
                type="button"
                onClick={() => setTab("explore")}
              >
                <Compass aria-hidden="true" />
                发现
              </button>
              <button
                className={tab === "liked" ? "aq-tab active" : "aq-tab"}
                type="button"
                onClick={() => setTab("liked")}
              >
                <Heart aria-hidden="true" />
                我喜欢
              </button>
            </nav>
            <button
              className="aq-iconButton aq-feedToggle"
              type="button"
              aria-label="进入滑动观看"
              title="滑动观看"
              disabled={!visible.length}
              onClick={() => openFeed(visible[0]?.id ?? null)}
            >
              <GalleryVerticalEnd size={20} />
            </button>
          </div>
          {tab === "explore" ? (
            <div className="aq-filterRow">
              <div className="aq-chips" role="tablist" aria-label="类型">
                {GENRES.map((name) => (
                  <button
                    key={name}
                    className={genre === name ? "aq-chip active" : "aq-chip"}
                    type="button"
                    role="tab"
                    aria-selected={genre === name}
                    onClick={() => setGenre(name)}
                  >
                    {genreLabel(name)}
                  </button>
                ))}
              </div>
              <div className={searchOpen ? "aq-search open" : "aq-search"}>
                <button
                  type="button"
                  aria-label="搜索短片"
                  onClick={() => {
                    setSearchOpen((open) => !open);
                    window.setTimeout(() => searchRef.current?.focus(), 50);
                  }}
                >
                  <Search />
                </button>
                <input
                  ref={searchRef}
                  value={query}
                  placeholder="搜索短片"
                  tabIndex={searchOpen ? 0 : -1}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="aq-gridWrap">
          {visible.length ? (
            <div className="aq-grid">
              {Array.from({ length: columns }, (_, column) => (
                <div className="aq-column" key={column}>
                  {visible
                    .filter((_, index) => index % columns === column)
                    .map((video, row) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        liked={isLiked(video.id)}
                        preload={row === 0}
                        onOpen={(item) => setPlayingId(item.id)}
                      />
                    ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="aq-empty">
              {tab === "liked" ? "点一下短片上的爱心，它就会出现在这里。" : "没有找到符合条件的短片。"}
            </p>
          )}
        </div>

        <div className="aq-pagination" />

        <section className="aq-info">
          {[
            {
              id: "about",
              title: "关于 Aqua 短片",
              body: (
                <>
                  <p>
                    一个观看开源电影和 NASA 太空影像的小站。鼠标移到卡片上可以预览，点击即可观看；也可以进入滑动观看模式，一屏一部地往下刷。
                  </p>
                  <h3>快捷键</h3>
                  <p>
                    播放器：空格 播放/暂停，←/→ 快退/快进 5 秒，M 静音，F 全屏，N/P 下一部/上一部。滑动观看：↑/↓ 切换短片，M 静音，Esc 退出。
                  </p>
                </>
              ),
            },
            {
              id: "credits",
              title: "版权与致谢",
              body: (
                <ul className="aq-creditList">
                  {VIDEOS.map((video) => (
                    <li key={video.id}>
                      <a href={video.sourcePage} target="_blank" rel="noreferrer">
                        {video.title}
                      </a>{" "}
                      — 影片 © {video.studio}，{video.license}
                      {video.posterCredit ? `；海报 © ${video.posterCredit}` : null}
                    </li>
                  ))}
                </ul>
              ),
            },
          ].map((panel) => (
            <div key={panel.id} className={openPanel === panel.id ? "aq-panel open" : "aq-panel"}>
              <button
                className="aq-panelHead"
                type="button"
                aria-expanded={openPanel === panel.id}
                onClick={() => setOpenPanel((open) => (open === panel.id ? null : panel.id))}
              >
                <span>{panel.title}</span>
                <span>
                  <ChevronDown size={20} />
                </span>
              </button>
              {openPanel === panel.id ? <div className="aq-panelBody">{panel.body}</div> : null}
            </div>
          ))}
        </section>

        <footer className="aq-footer">
          <a href="https://studio.blender.org/films/" target="_blank" rel="noreferrer">
            Blender 工作室作品
          </a>
          <a href="https://images.nasa.gov/" target="_blank" rel="noreferrer">
            NASA 影像库
          </a>
          <a href="https://commons.wikimedia.org/" target="_blank" rel="noreferrer">
            视频由维基共享资源提供
          </a>
        </footer>
      </main>

      {playing ? (
        <VideoPlayer
          key={playing.id}
          video={playing}
          liked={isLiked(playing.id)}
          hasPrev={playingIndex > 0}
          hasNext={playingIndex >= 0 && playingIndex < visible.length - 1}
          onPrev={() => setPlayingId(visible[playingIndex - 1].id)}
          onNext={() => setPlayingId(visible[playingIndex + 1].id)}
          onToggleLike={() => toggleLike(playing.id)}
          onClose={() => setPlayingId(null)}
        />
      ) : null}
      {feedStart !== undefined ? (
        <VideoFeed
          videos={visible.length ? visible : VIDEOS}
          startId={feedStart}
          isLiked={isLiked}
          onToggleLike={toggleLike}
          onToast={showToast}
          onClose={() => setFeedStart(undefined)}
        />
      ) : null}
      {toast ? <div className="aq-toast">{toast}</div> : null}
    </div>
  );
}
