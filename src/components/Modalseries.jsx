import React, { useState, useEffect } from "react";
import "./Series.css";
import SeasonScroller from "./SeasonScroller.jsx";

/**
 * Modalseries component that fetches and displays detailed series information
 * including seasons and episodes for a specific podcast series.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string|number} props.seriesId - The unique identifier for the podcast series
 * @returns {JSX.Element|null} The rendered series details component or null if no data
 *
 * @example
 * // Usage in a modal or container
 * <Modalseries seriesId="12345" />
 *
 * @example
 * // Inside a modal component
 * <Modal isOpen={isOpen} onClose={onClose}>
 *   <Modalseries seriesId={podcast.id} />
 * </Modal>
 */
const Modalseries = ({ seriesId }) => {
  /**
   * State to store the fetched series data including seasons and episodes
   * @type {[Object|null, Function]}
   */
  const [seriesData, setSeriesData] = useState(null);

  /**
   * State to track if data is currently being fetched
   * @type {[boolean, Function]}
   */
  const [loading, setLoading] = useState(false);

  /**
   * State to store any error messages that occur during data fetching
   * @type {[string|null, Function]}
   */
  const [error, setError] = useState(null);

  /**
   * Fetches series data with episodes from the podcast API based on the provided series ID.
   * Makes an HTTP request to the podcast API and updates component state accordingly.
   *
   * @async
   * @function fetchSeriesData
   * @param {string|number} id - The series ID to fetch data for
   * @returns {Promise<void>} A promise that resolves when the fetch operation completes
   *
   * @throws {Error} Throws an error if the HTTP request fails or returns non-ok status
   *
   * @example
   * // Fetch data for series with ID "12345"
   * await fetchSeriesData("12345");
   */
  const fetchSeriesData = async (id) => {
    // Exit early if no ID is provided
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

  /**
   * Effect hook that triggers data fetching when the seriesId prop changes.
   * Automatically fetches series data whenever a new seriesId is provided.
   *
   * @effect
   * @dependency {string|number} seriesId - The series ID that triggers the effect
   */
  useEffect(() => {
    if (seriesId) {
      console.log(`Fetching data for series ID: ${seriesId}`); // Debug log
      fetchSeriesData(seriesId);
    }
  }, [seriesId]);

  /**
   * Renders loading state with spinner and series ID
   * @returns {JSX.Element} Loading component with progress indicator
   */
  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading episodes for series {seriesId}...</p>
        <div className="spinner">⏳</div>
      </div>
    );
  }

  /**
   * Renders error state with error message and retry button
   * @returns {JSX.Element} Error component with retry functionality
   */
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

  /**
   * Renders the main series data content including seasons and episodes
   * @returns {JSX.Element} Complete series details with seasons and episodes
   */
  if (seriesData) {
    return (
      <div className="series-details">
        {seriesData.seasons && seriesData.seasons.length > 0 ? (
          <div className="seasons-container">
            <h3>Current season</h3>
            <SeasonScroller seasons={seriesData.seasons} />
            <div className="seasons-list"></div>
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

                    {/* Map through all episodes in the season */}
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
                            {/* Audio availability indicator */}
                            {episode.file && (
                              <span className="episode-file">
                                🎵 Audio Available
                              </span>
                            )}
                            <span className="episode-id">
                              Episode: {episode.episode}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* No episodes message */
                  <div className="no-episodes">
                    <p>No episodes available for Season {season.season}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* No seasons message */
          <div className="no-seasons">
            <p>No seasons available for this series.</p>
          </div>
        )}
      </div>
    );
  }

  /**
   * Returns null when no data is available (initial state)
   * @returns {null} Null component
   */
  return null;
};

export default Modalseries;
