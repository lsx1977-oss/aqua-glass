// Loads the films and homepage copy from Supabase (server only).
// Without SUPABASE_URL / SUPABASE_ANON_KEY, or if Supabase is unreachable, the site falls back
// to the built-in list in videos.ts so it never goes blank.
import { VIDEOS, type Video } from "./videos";

export interface SiteSettings {
  tagline: string;
  promoTitle: string[];
  /** Banner paragraph; {count} becomes the number of films. */
  promoText: string;
  featuredVideoId: string | null;
}

export interface SiteContent {
  videos: Video[];
  settings: SiteSettings;
}

const FALLBACK_SETTINGS: SiteSettings = {
  tagline: "好看的短片 · 一划就有",
  promoTitle: [],
  promoText: "共 {count} 部高清影片，来自 Blender 工作室和 NASA，全部免费观看，像刷短视频一样一部接一部。",
  featuredVideoId: null,
};

/** How long a page render reuses the fetched content before checking Supabase again. */
export const CONTENT_REVALIDATE_SECONDS = 60;

interface VideoRow {
  id: string;
  title: string;
  genre: string;
  description: string;
  studio: string;
  duration: number;
  width: number;
  height: number;
  license: string;
  src: string;
  src_hd: string;
  src_4k: string | null;
  poster: string;
  poster_width: number | null;
  poster_height: number | null;
  poster_credit: string | null;
  still: string;
  source_page: string;
}

interface SettingsRow {
  tagline: string;
  promo_title_line1: string;
  promo_title_line2: string;
  promo_text: string;
  featured_video_id: string | null;
}

function toVideo(row: VideoRow): Video {
  return {
    id: row.id,
    title: row.title,
    genre: row.genre,
    description: row.description,
    studio: row.studio,
    duration: row.duration,
    width: row.width,
    height: row.height,
    license: row.license,
    src: row.src,
    srcHd: row.src_hd,
    src4k: row.src_4k ?? undefined,
    poster: row.poster,
    posterWidth: row.poster_width ?? undefined,
    posterHeight: row.poster_height ?? undefined,
    posterCredit: row.poster_credit ?? undefined,
    still: row.still,
    sourcePage: row.source_page,
  };
}

async function query<T>(baseUrl: string, key: string, path: string): Promise<T> {
  const response = await fetch(`${baseUrl}/rest/v1/${path}`, {
    // New sb_publishable_ keys go only in `apikey`; legacy anon JWTs (eyJ...) also need the Bearer header.
    headers: key.startsWith("eyJ") ? { apikey: key, Authorization: `Bearer ${key}` } : { apikey: key },
    next: { revalidate: CONTENT_REVALIDATE_SECONDS },
  });
  if (!response.ok) throw new Error(`Supabase ${path} returned ${response.status}`);
  return response.json() as Promise<T>;
}

export async function getSiteContent(): Promise<SiteContent> {
  const baseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_ANON_KEY;
  if (!baseUrl || !key) return { videos: VIDEOS, settings: FALLBACK_SETTINGS };

  try {
    const [rows, settingsRows] = await Promise.all([
      // Row-level security hides hidden films too; the filter keeps that true for any key.
      query<VideoRow[]>(baseUrl, key, "videos?select=*&visible=eq.true&order=sort_order.asc,title.asc"),
      query<SettingsRow[]>(baseUrl, key, "site_settings?select=*&id=eq.1"),
    ]);
    const settingsRow = settingsRows[0];
    return {
      videos: rows.map(toVideo),
      settings: settingsRow
        ? {
            tagline: settingsRow.tagline,
            promoTitle: [settingsRow.promo_title_line1, settingsRow.promo_title_line2].filter(Boolean),
            promoText: settingsRow.promo_text,
            featuredVideoId: settingsRow.featured_video_id,
          }
        : FALLBACK_SETTINGS,
    };
  } catch (error) {
    console.error("Falling back to built-in films:", error);
    return { videos: VIDEOS, settings: FALLBACK_SETTINGS };
  }
}
