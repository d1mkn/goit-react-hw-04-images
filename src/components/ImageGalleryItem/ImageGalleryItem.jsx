import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, url, smallUrl, alt, onClick }) => {
  const onImgClick = () => {
    onClick({ url, alt });
  };

  return (
    <li className={css.ImageGalleryItem} onClick={onImgClick}>
      <img
        className={css.ImageGalleryItemImage}
        key={id}
        src={smallUrl}
        alt={alt}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  smallUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
