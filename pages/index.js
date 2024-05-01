import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function Home() {
  const [getArtist, setGetArtist] = useState(0);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []); // Empty dependency array ensures it runs only once when component mounts
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  async function fetchData() {
    const response1 = await fetch("/api/stats/artists");
    const artistsData = await response1.json();
    setArtists(artistsData);
    const response2 = await fetch("/api/stats/tracks");
    const tracksData = await response2.json();
    setTracks(tracksData);
  }

  return (
    <>
      <div id="main">
        <Button
          key="1"
          type="button"
          onClick={() => setGetArtist((prev) => prev + 1)}
        >
          {getArtist % 2 === 0 ? "Show Tracks" : "Show Artists"}
        </Button>
        {getArtist % 2 === 0 ? (
          <section>
            <h2>My Favorite Artists</h2>

            {artists.map((artist, index) => (
              <div>
                <main>
                  <p>{artist.name}</p>
                  <p>{numberWithCommas(artist.followers)} Followers </p>
                  <a href={artist.url}>
                    Check this artist out! <span></span>
                  </a>
                </main>
                <img src={artist.coverImage} alt={artist.name} />
              </div>
            ))}
          </section>
        ) : (
          <section>
            <h2>My Favorite Tracks</h2>

            {tracks.map((track, index) => (
              <div>
                <main>
                  <p>{track.title}</p>
                  <p>by {track.artist}</p>
                  <a href={track.url} class="button">
                    Check this track out!
                  </a>
                </main>
                <img src={track.coverImage} alt={track.title} />
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  );
}
