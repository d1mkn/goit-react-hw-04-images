import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, dataForModal }) => {
  const onImgClick = ({ url, alt }) => {
    dataForModal(url, alt);
  };

  return (
    <>
      <ul className={css.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            smallUrl={webformatURL}
            url={largeImageURL}
            alt={tags}
            key={id}
            id={id}
            onClick={onImgClick}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  dataForModal: PropTypes.func.isRequired,
};
