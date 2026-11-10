import { createClient } from "npm:@supabase/supabase-js@2";

// Publieke, read-only feed voor bellacampoamor.com
// GET ?mode=home&lang=es|en  -> 4 willekeurige producten
// GET ?mode=bali&lang=es|en  -> per categorie 4 willekeurige producten
// Geeft GEEN inkoopprijs, voorraad of ruwe data door.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

const CATEGORIES = [
  { key: "furniture", en: "Furniture", es: "Muebles", handles: ["furniture-1"] },
  { key: "lighting", en: "Lighting", es: "Iluminación", handles: ["lighting", "pendant-lamps", "wall-lighting"] },
  { key: "mirrors", en: "Mirrors", es: "Espejos", handles: ["mirrors"] },
  { key: "wall", en: "Wall decoration", es: "Decoración de pared", handles: ["table-decoration-kopie"] },
  { key: "vases", en: "Vases & baskets", es: "Jarrones y cestas", handles: ["vases"] },
  { key: "table", en: "Table decoration", es: "Decoración de mesa", handles: ["table-decoration"] },
  { key: "bowls", en: "Plates & bowls", es: "Platos y cuencos", handles: ["bowls"] },
  { key: "kitchen", en: "Kitchen", es: "Cocina", handles: ["kitchen"] },
  { key: "pillows", en: "Pillow covers", es: "Fundas de cojín", handles: ["pillow-covers", "pillow-covers-macrame"] },
  { key: "sticks", en: "Deco sticks", es: "Palitos decorativos", handles: ["deco-sticks"] },
  { key: "statues", en: "Statues & masks", es: "Estatuas y máscaras", handles: ["statues", "masks"] },
];

const ETA_ES: Record<string, string> = { January: "enero", February: "febrero", March: "marzo", April: "abril", May: "mayo", June: "junio", July: "julio", August: "agosto", September: "septiembre", October: "octubre", November: "noviembre", December: "diciembre" };

function pick<T>(arr: T[], n: number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

function tr(v: any, lang: string): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  return v[lang] || v.en || "";
}

function shape(r: any, lang: string) {
  const a = r.attributes || {};
  const d = a.dimensions_cm || {};
  const dims = [d.width, d.depth, d.height].filter((x) => x).join(" × ");
  let eta = r.preorder_eta || "";
  if (lang === "es" && eta) eta = eta.replace(/[A-Z][a-z]+/, (m: string) => ETA_ES[m] || m);
  return {
    id: r.id,
    sku: r.supplier_sku,
    name: tr(r.title, lang) || r.name,
    variant: r.variant_title || "",
    image: r.image_url,
    material: tr(a.material, lang),
    colors: a.colors || "",
    dimensions_cm: dims,
    price: r.price !== null ? Number(r.price) : null,
    compare_at_price: r.compare_at_price !== null ? Number(r.compare_at_price) : null,
    currency: r.currency || "EUR",
    preorder: !!r.is_preorder,
    preorder_eta: r.is_preorder ? eta : "",
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const u = new URL(req.url);
  const mode = u.searchParams.get("mode") === "bali" ? "bali" : "home";
  const lang = u.searchParams.get("lang") === "en" ? "en" : "es";

  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data, error } = await sb
    .from("supplier_hdb_items")
    .select("id,supplier_sku,name,variant_title,title,image_url,attributes,price,compare_at_price,currency,is_preorder,preorder_eta,collections")
    .eq("active", true)
    .is("removed_at", null)
    .not("image_url", "is", null)
    .gt("price", 0);

  if (error) return new Response(JSON.stringify({ error: "unavailable" }), { status: 500, headers: { ...CORS, "Content-Type": "application/json" } });
  const rows = data || [];

  let body: any;
  if (mode === "home") {
    body = { products: pick(rows, 4).map((r) => shape(r, lang)) };
  } else {
    body = {
      categories: CATEGORIES.map((c) => {
        const inCat = rows.filter((r: any) => Array.isArray(r.collections) && r.collections.some((x: any) => c.handles.includes(x?.handle)));
        return { key: c.key, title: lang === "en" ? c.en : c.es, products: pick(inCat, 4).map((r) => shape(r, lang)) };
      }).filter((c) => c.products.length > 0),
    };
  }

  return new Response(JSON.stringify(body), {
    headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
});
