import React, { useState, useEffect } from "react";
import "./SeasonScroller.css";

const SeasonScroller = ({ seasons, onSeasonSelect }) => {
  const [selectedSeason, setSelectedSeason] = useState("");
  const [currentSeasonIndex, setCurrentSeasonIndex] = useState(0);

  const scrollToSeason = (seasonNumber) => {
    const seasonElement = document.getElementById(`season-${seasonNumber}`);
    if (seasonElement) {
      seasonElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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

  const handleSeasonChange = (event) => {
    const seasonNumber = event.target.value;
    setSelectedSeason(seasonNumber);

    if (seasonNumber) {
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

  useEffect(() => {
    setSelectedSeason("");
    setCurrentSeasonIndex(0);
  }, [seasons]);

  if (!seasons || seasons.length === 0) {
    return null;
  }

  const isFirstSeason = currentSeasonIndex === 0;
  const isLastSeason = currentSeasonIndex === seasons.length - 1;

  return (
    <div className="season-scroller">
      <div className="season-navigation">
        <label htmlFor="season-select" className="season-select-label">
          Jump to Season:
        </label>

        <div className="season-controls">
          <button
            onClick={moveToPreviousSeason}
            disabled={isFirstSeason}
            className="season-nav-button prev-button"
            title="Previous Season"
          >
            ← Previous
          </button>

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

      <div className="season-info">
        {selectedSeason && (
          <p className="current-season-info">
            Currently viewing: Season {selectedSeason}({currentSeasonIndex + 1}{" "}
            of {seasons.length})
          </p>
        )}
      </div>
    </div>
  );
};

export default SeasonScroller;
