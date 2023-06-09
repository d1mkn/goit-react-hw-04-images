import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ url, tags, onClose }) => {
  useEffect(() => {
    const clickEsc = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', clickEsc);
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', clickEsc);
      document.documentElement.style.overflow = 'auto';
    };
  }, [onClose]);

  const clickBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={clickBackdrop}>
      <div className={css.Modal}>
        <img src={url} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
