import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, url, alt }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItemImage} key={id} src={url} alt={alt} />
    </li>
  );
};
