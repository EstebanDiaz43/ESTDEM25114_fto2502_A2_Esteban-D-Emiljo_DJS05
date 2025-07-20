import React, { useState, useEffect } from "react";
import "./Series.css"; // Assuming you have a CSS file for styling

const Modalseries = ({ seriesId }) => {
  const [seriesData, setSeriesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch series data with episodes from API based on specific seriesId
  const fetchSeriesData = async (id) => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch data from the specific API endpoint for this series
      const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Fetched data for series ${id}:`, data); // Debug log
      setSeriesData(data);
    } catch (err) {
      setError(`Failed to load data for series ${id}: ${err.message}`);
      console.error("Error fetching series data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when seriesId changes
  useEffect(() => {
    if (seriesId) {
      console.log(`Fetching data for series ID: ${seriesId}`); // Debug log
      fetchSeriesData(seriesId);
    }
  }, [seriesId]);

  // Return loading state
  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading episodes for series {seriesId}...</p>
        <div className="spinner">⏳</div>
      </div>
    );
  }

  // Return error state
  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => fetchSeriesData(seriesId)}>
          Retry Loading Series {seriesId}
        </button>
      </div>
    );
  }

  // Return series data content
  if (seriesData) {
    return (
      <div className="series-details">
        {seriesData.seasons && seriesData.seasons.length > 0 ? (
          <div className="seasons-container">
            <h3>All Seasons & Episodes</h3>
            {seriesData.seasons.map((season, seasonIndex) => (
              <div
                key={`season-${seriesId}-${season.season || seasonIndex}`}
                className="season-section"
              >
                <div className="season-header">
                  <img
                    src={season.image}
                    alt={`Season ${season.season}`}
                    className="season-image"
                  />
                  <div className="season-info">
                    <h4>Season {season.season}</h4>
                    <p>{season.title}</p>
                    <p>
                      <strong>Episodes:</strong> {season.episodes?.length || 0}
                    </p>
                  </div>
                </div>

                {season.episodes && season.episodes.length > 0 ? (
                  <div className="episodes-list">
                    <h5>Episodes in Season {season.season}</h5>
                    {season.episodes.map((episode, episodeIndex) => (
                      <div
                        key={`episode-${seriesId}-${season.season}-${
                          episode.episode || episodeIndex
                        }`}
                        className="episode-item"
                      >
                        <div className="episode-number">
                          Ep. {episode.episode}
                        </div>
                        <div className="episode-content">
                          <h6 className="episode-title">{episode.title}</h6>
                          <p className="episode-description">
                            {episode.description}
                          </p>
                          <div className="episode-meta">
                            {episode.file && (
                              <span className="episode-file">
                                🎵 Audio Available
                              </span>
                            )}
                            <span className="episode-id">
                              Series: {seriesId} | Season: {season.season} |
                              Episode: {episode.episode}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-episodes">
                    <p>No episodes available for Season {season.season}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-seasons">
            <p>No seasons available for this series.</p>
          </div>
        )}
      </div>
    );
  }

  // Return null if no data
  return null;
};

export default Modalseries;
