import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, status, onLoadMore, dataForModal }) => {
  const handleLoadMore = () => {
    onLoadMore();
  };

  const onImgClick = ({ url, alt }) => {
    dataForModal(url, alt);
  };

  return (
    <>
      <ul className={css.ImageGallery}>
        {status === 'pending' && <Loader />}
        {images !== null &&
          images.map(({ id, webformatURL, largeImageURL, tags }) => (
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
      <div className={css.ButtonContainer}>
        {images && status === 'resolved' && <Button onClick={handleLoadMore} />}
      </div>
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
  status: PropTypes.oneOf(['idle', 'pending', 'resolved', 'rejected'])
    .isRequired,
  onLoadMore: PropTypes.func.isRequired,
  dataForModal: PropTypes.func.isRequired,
};
