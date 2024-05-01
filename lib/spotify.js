const clientID = "939d86d660f84ae2bc778edb98bc9b7f";
const clientSecret = "bdfbd3d4a70248d785f5a369e67b9198";
const getAccessToken = async () => {
  const refresh_token = "AQAUbKbrUB54LMo160dpMwoHKwadGcSWp-nPPQnh3uF_v7OTzUihuv207unTQ8cGsUtokOh37WpXYndRUmHWCAw3ZKqQ6r6TYO8b8BV24S0oGnqjC0WiS0YYe0H03hwYoqs";

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  return response.json();
};
// async function getAccessToken() {
//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization: "Basic " + btoa(clientID + ":" + clientSecret),
//     },
//     body: "grant_type=client_credentials",
//   });

//   const data = await response.json();
//   return data.access_token;
// }

export { getAccessToken };

export const topTracks = async () => {
  const { access_token } = await getAccessToken();
  return fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
export const topArtists = async () => {
  const { access_token } = await getAccessToken();
  return fetch("https://api.spotify.com/v1/me/top/artists", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
export const currentlyPlayingSong = async () => {
  const { access_token } = await getAccessToken();

  return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
