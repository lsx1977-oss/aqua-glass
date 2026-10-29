import { AquaGlassApp } from "@/components/aqua/aqua-glass-app";
import { getSiteContent } from "@/components/aqua/content";

// Rebuild the page at most once a minute so edits made in Supabase show up without a redeploy.
export const revalidate = 60;

export default async function Home() {
  const { videos, settings } = await getSiteContent();
  return <AquaGlassApp videos={videos} settings={settings} />;
}
