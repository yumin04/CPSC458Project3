import { topArtists } from "../../../lib/spotify";

export default async function handler(req, res) {
  try {
    const response = await topArtists();
    const data = await response.json();

    if (!data || !data.items || data.items.length === 0) {
      return res.status(404).json({ message: "No artists found." });
    }

    const artists = data.items.slice(0, 5).map((artist) => ({
      name: artist.name,
      url: artist.external_urls.spotify,
      coverImage: artist.images[1].url,
      followers: artist.followers.total,
    }));

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200"
    );

    return res.status(200).json(artists);
  } catch (error) {
    console.error("Error fetching top artists:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

// export default async function handler(req, res) {
//   const response = await topArtists();
//   const { items } = await response.json();

//   const artists = items.slice(0, 5).map((artist) => ({
//     name: artist.name,
//     url: artist.external_urls.spotify,
//     coverImage: artist.images[1],
//     followers: artist.followers.total,
//   }));

//   res.setHeader(
//     "Cache-Control",
//     "public, s-maxage=86400, stale-while-revalidate=43200"
//   );

//   return res.status(200).json(artists);
// }
