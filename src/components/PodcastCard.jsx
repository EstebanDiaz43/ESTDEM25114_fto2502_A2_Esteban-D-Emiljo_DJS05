import { formatDate } from "../utils/formatDate";
import styles from "./PodcastCard.module.css";
import React, { useState } from "react";
import Modal from "./Modal";

/**
 * Renders a single podcast preview card with image, title, number of seasons,
 * genres (as styled tags), and the last updated date.
 *
 * @param {Object} props
 * @param {Object} props.podcast - The podcast data object to display.
 * @param {string} props.podcast.id - Unique ID of the podcast.
 * @param {string} props.podcast.title - Title of the podcast.
 * @param {string} props.podcast.image - URL of the podcast image.
 * @param {number} props.podcast.seasons - Number of seasons available.
 * @param {string} props.podcast.updated - ISO date string for the last update.
 * @param {Array<Object>} props.genres - Array of genre objects for mapping IDs to titles.
 *
 * @returns {JSX.Element} The rendered podcast card component.
 */
export default function PodcastCard({ podcast, genres }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const genreSpans = podcast.genres.map((id) => {
    const match = genres.find((genre) => genre.id === id);
    return (
      <span key={id} className={styles.tag}>
        {match ? match.title : `Unknown (${id})`}
      </span>
    );
  });

  return (
    <>
      <div className={styles.card} onClick={handleCardClick}>
        <img src={podcast.image} alt={podcast.title} />
        <h3>{podcast.title}</h3>
        <p className={styles.seasons}>{podcast.seasons} seasons</p>
        <div className={styles.tags}>{genreSpans}</div>
        <p className={styles.updatedText}>
          Updated {formatDate(podcast.updated)}
        </p>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <img className="modalImage" src={podcast.image} alt={podcast.title} />
        </div>
        <div>
          <h3 className="Modalheader">{podcast.title}</h3>
          <p className="ModalDescription">{podcast.description}</p>
          <div className="modalDetails">
            <p className={styles.seasons}>{podcast.seasons} seasons</p>
            <div className={styles.tags}>{genreSpans}</div>
            <p className="ModalUpdatedText">
              Updated {formatDate(podcast.updated)}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
