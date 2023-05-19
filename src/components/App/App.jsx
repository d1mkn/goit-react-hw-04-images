import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { searchApi } from 'services/imageAPI';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import css from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [error, setError] = useState(null);
  const [modalImg, setModalImg] = useState('');
  const [modalTags, setModalTags] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (query === '') {
      return;
    }

    setStatus('pending');

    searchApi(query, page)
      .then(({ hits, totalHits }) => {
        if (totalHits === 0) {
          notify();
          setStatus('rejected');
          return;
        }

        setImages([...images, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 12));
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
        notify();
      });
  }, [query, page]);

  const handleSubmit = searchQuery => {
    if (query === searchQuery) {
      return;
    }
    resetState();
    setQuery(searchQuery);
  };

  const handleImgClick = (url, alt) => {
    setModalImg(url);
    setModalTags(alt);
    setShowModal(true);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const resetState = () => {
    setQuery('');
    setPage(1);
    setImages([]);
    setTotalHits(null);
    setError(null);
    setShowBtn(false);
    setModalImg('');
    setModalTags('');
    setShowModal(false);
    setStatus('idle');
  };

  const notify = () => {
    toast.error('No images were found for your request.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <main className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      <ToastContainer />
      {status === 'pending' && <Loader />}
      <ImageGallery images={images} dataForModal={handleImgClick} />
      {showBtn && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal url={modalImg} tags={modalTags} onClose={toggleModal} />
      )}
    </main>
  );
};
