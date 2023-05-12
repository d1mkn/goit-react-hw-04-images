import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ data }) => {
  return (
    <ul className={css.ImageGallery}>
      {data !== null &&
        data.hits.map(({ id, largeImageURL, tags }) => (
          <ImageGalleryItem url={largeImageURL} alt={tags} key={id} />
        ))}
    </ul>
  );
};
