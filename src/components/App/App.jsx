import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { searchApi } from 'services/imageAPI';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalHits: null,
    error: null,
    modalImg: '',
    modalTags: '',
    showModal: false,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ status: 'pending' });

      searchApi(query, page)
        .then(({ hits, totalHits }) => {
          if (totalHits === 0) {
            this.notify();
            this.setState({ status: 'rejected' });
            return;
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            showBtn: page < Math.ceil(totalHits / 12),
            status: 'resolved',
          }));
        })
        .catch(error => {
          this.setState({ status: 'rejected', error });
          this.notify();
        });
    }
  }

  handleSubmit = searchQuery => {
    if (this.state.query === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ query: searchQuery });
  };

  handleImgClick = (url, alt) => {
    this.setState({ modalImg: url, modalTags: alt, showModal: true });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  resetState = () => {
    this.setState({
      query: '',
      page: 1,
      images: [],
      totalHits: null,
      error: null,
      showBtn: false,
      modalImg: '',
      modalTags: '',
      showModal: false,
      status: 'idle',
    });
  };

  notify = () => {
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

  render() {
    const { modalImg, modalTags, showModal, showBtn, status, images } =
      this.state;

    return (
      <main className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ToastContainer />
        {status === 'pending' && <Loader/>}
        <ImageGallery
          images={images}
          dataForModal={this.handleImgClick}
        />
        {showBtn && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal url={modalImg} tags={modalTags} onClose={this.toggleModal} />
        )}
      </main>
    );
  }
}
