const API_KEY = import.meta.env.VITE_TVDB_API_KEY;
let cachedToken = null;

async function getToken() {
  if (cachedToken) return cachedToken;

  const res = await fetch("https://api4.thetvdb.com/v4/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apikey: API_KEY }),
  });
  const { data } = await res.json();
  cachedToken = data.token;
  return cachedToken;
}

export async function getSopranosCharacters() {
  const token = await getToken();

  const seriesRes = await fetch(
    "https://api4.thetvdb.com/v4/series/slug/the-sopranos",
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const { data: series } = await seriesRes.json();

  const extRes = await fetch(
    `https://api4.thetvdb.com/v4/series/${series.id}/extended`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const { data: ext } = await extRes.json();

  return ext.characters
    .filter((c) => c.image)
    .slice(0, 14)
    .map((c) => ({
      name: c.name,
      imageUrl: c.image.startsWith("http")
        ? c.image
        : `https://artworks.thetvdb.com/banners/${c.image}`,
    }));
}
