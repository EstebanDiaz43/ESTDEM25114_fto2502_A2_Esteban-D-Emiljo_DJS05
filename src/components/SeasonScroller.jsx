import React, { useState, useEffect } from "react";
import "./SeasonScroller.css";

/**
 * SeasonScroller component that provides navigation controls for scrolling between
 * different seasons of a podcast series. Includes dropdown selection and previous/next buttons.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Array<Object>} props.seasons - Array of season objects containing season data
 * @param {Function} [props.onSeasonSelect] - Optional callback function called when a season is selected
 * @returns {JSX.Element|null} The rendered season navigation component or null if no seasons
 *
 * @example
 * // Basic usage with seasons array
 * <SeasonScroller
 *   seasons={seriesData.seasons}
 *   onSeasonSelect={(seasonNumber) => console.log(`Selected season ${seasonNumber}`)}
 * />
 *
 * @example
 * // Usage without callback
 * <SeasonScroller seasons={seasons} />
 */
const SeasonScroller = ({ seasons, onSeasonSelect }) => {
  /**
   * State to track the currently selected season number as a string
   * @type {[string, Function]}
   */
  const [selectedSeason, setSelectedSeason] = useState("");

  /**
   * State to track the current season index in the seasons array
   * @type {[number, Function]}
   */
  const [currentSeasonIndex, setCurrentSeasonIndex] = useState(0);

  /**
   * Scrolls to a specific season section on the page using smooth scrolling behavior.
   * Looks for an element with ID pattern `season-${seasonNumber}`.
   *
   * @function scrollToSeason
   * @param {string|number} seasonNumber - The season number to scroll to
   * @returns {void}
   *
   * @example
   * // Scroll to season 3
   * scrollToSeason(3);
   */
  const scrollToSeason = (seasonNumber) => {
    const seasonElement = document.getElementById(`season-${seasonNumber}`);
    if (seasonElement) {
      seasonElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /**
   * Moves navigation to the next season in the list.
   * Updates state and scrolls to the next season if one exists.
   * Calls onSeasonSelect callback if provided.
   *
   * @function moveToNextSeason
   * @returns {void}
   *
   * @example
   * // Move to next season (called by Next button)
   * moveToNextSeason();
   */
  const moveToNextSeason = () => {
    if (!seasons || seasons.length === 0) return;

    const nextIndex = currentSeasonIndex + 1;
    if (nextIndex < seasons.length) {
      const nextSeason = seasons[nextIndex];
      const nextSeasonNumber = nextSeason.season || nextIndex + 1;

      setCurrentSeasonIndex(nextIndex);
      setSelectedSeason(nextSeasonNumber.toString());
      scrollToSeason(nextSeasonNumber);

      if (onSeasonSelect) {
        onSeasonSelect(nextSeasonNumber);
      }
    }
  };

  /**
   * Moves navigation to the previous season in the list.
   * Updates state and scrolls to the previous season if one exists.
   * Calls onSeasonSelect callback if provided.
   *
   * @function moveToPreviousSeason
   * @returns {void}
   *
   * @example
   * // Move to previous season (called by Previous button)
   * moveToPreviousSeason();
   */
  const moveToPreviousSeason = () => {
    if (!seasons || seasons.length === 0) return;

    const prevIndex = currentSeasonIndex - 1;
    if (prevIndex >= 0) {
      const prevSeason = seasons[prevIndex];
      const prevSeasonNumber = prevSeason.season || prevIndex + 1;

      setCurrentSeasonIndex(prevIndex);
      setSelectedSeason(prevSeasonNumber.toString());
      scrollToSeason(prevSeasonNumber);

      if (onSeasonSelect) {
        onSeasonSelect(prevSeasonNumber);
      }
    }
  };

  /**
   * Handles dropdown selection change events.
   * Updates state based on selected season and scrolls to the selected season.
   *
   * @function handleSeasonChange
   * @param {Event} event - The change event from the select element
   * @param {string} event.target.value - The selected season number as string
   * @returns {void}
   *
   * @example
   * // Called automatically when dropdown selection changes
   * handleSeasonChange(event);
   */
  const handleSeasonChange = (event) => {
    const seasonNumber = event.target.value;
    setSelectedSeason(seasonNumber);

    if (seasonNumber) {
      // Find the index of the selected season in the seasons array
      const seasonIndex = seasons.findIndex(
        (season) =>
          (season.season || seasons.indexOf(season) + 1).toString() ===
          seasonNumber
      );

      if (seasonIndex !== -1) {
        setCurrentSeasonIndex(seasonIndex);
      }

      scrollToSeason(seasonNumber);

      if (onSeasonSelect) {
        onSeasonSelect(seasonNumber);
      }
    }
  };

  /**
   * Effect hook that resets the component state when seasons data changes.
   * Clears selected season and resets current index to 0.
   *
   * @effect
   * @dependency {Array<Object>} seasons - The seasons array that triggers the reset
   */
  useEffect(() => {
    setSelectedSeason("");
    setCurrentSeasonIndex(0);
  }, [seasons]);

  /**
   * Early return if no seasons are provided
   * @returns {null} Null component when no seasons available
   */
  if (!seasons || seasons.length === 0) {
    return null;
  }

  /**
   * Boolean flag indicating if currently viewing the first season
   * @type {boolean}
   */
  const isFirstSeason = currentSeasonIndex === 0;

  /**
   * Boolean flag indicating if currently viewing the last season
   * @type {boolean}
   */
  const isLastSeason = currentSeasonIndex === seasons.length - 1;

  /**
   * Renders the complete season navigation interface
   * @returns {JSX.Element} The season scroller component with navigation controls
   */
  return (
    <div className="season-scroller">
      {/* Navigation controls section */}
      <div className="season-navigation">
        <label htmlFor="season-select" className="season-select-label">
          Jump to Season:
        </label>

        <div className="season-controls">
          {/* Previous season button */}
          <button
            onClick={moveToPreviousSeason}
            disabled={isFirstSeason}
            className="season-nav-button prev-button"
            title="Previous Season"
          >
            ← Previous
          </button>

          {/* Season selection dropdown */}
          <select
            id="season-select"
            value={selectedSeason}
            onChange={handleSeasonChange}
            className="season-select-dropdown"
          >
            <option value="">Select a season...</option>
            {seasons.map((season, index) => (
              <option
                key={season.season || index}
                value={season.season || index + 1}
              >
                Season {season.season || index + 1} - {season.title}
              </option>
            ))}
          </select>

          {/* Next season button */}
          <button
            onClick={moveToNextSeason}
            disabled={isLastSeason}
            className="season-nav-button next-button"
            title="Next Season"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Current season information display */}
      <div className="season-info">
        {selectedSeason && (
          <p className="current-season-info">
            Currently viewing: Season {selectedSeason} ({currentSeasonIndex + 1}{" "}
            of {seasons.length})
          </p>
        )}
      </div>
    </div>
  );
};

export default SeasonScroller;
