import { createClient } from "npm:@supabase/supabase-js@2";

// Publieke, read-only feed voor het social-lint "Síganos" op bellacampoamor.com.
// Data: tabel website_social_feed (key = 'main'), elk uur gevuld door de n8n-workflow
// "BellaCampoamor.com: Instagram feed → website".
// GET -> { instagram: {handle,url,followers}, facebook: {name,url,followers}, posts: [{id,type,image,url,caption,date}], updated_at }

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
});

function json(body: unknown, status = 200, cache = "public, max-age=600, s-maxage=600") {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json; charset=utf-8", "Cache-Control": cache },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "GET") return json({ error: "method" }, 405, "no-store");

  const { data, error } = await sb.from("website_social_feed").select("payload, updated_at").eq("key", "main").maybeSingle();
  if (error || !data) return json({ posts: [] }, 200, "public, max-age=60");

  const p = data.payload || {};
  const posts = (Array.isArray(p.posts) ? p.posts : [])
    .filter((x: any) => x && typeof x.image === "string" && /^https:\/\//.test(x.image) && typeof x.url === "string" && /^https:\/\/www\.instagram\.com\//.test(x.url))
    .slice(0, 12)
    .map((x: any) => ({
      id: String(x.id || ""),
      type: ["video", "carousel"].includes(x.type) ? x.type : "image",
      image: x.image,
      url: x.url,
      caption: String(x.caption || "").slice(0, 160),
      date: x.date || null,
    }));

  const num = (v: unknown) => (typeof v === "number" && isFinite(v) ? v : null);
  return json({
    instagram: {
      handle: p.instagram?.handle || "bellacampoamor_official",
      url: p.instagram?.url || "https://www.instagram.com/bellacampoamor_official/",
      followers: num(p.instagram?.followers),
    },
    facebook: {
      name: p.facebook?.name || "BellaCampoamor",
      url: p.facebook?.url || "https://www.facebook.com/1512834005237951",
      followers: num(p.facebook?.followers),
    },
    posts,
    updated_at: data.updated_at,
  });
});
