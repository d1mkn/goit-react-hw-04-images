import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { searchApi } from 'services/imageAPI';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    dataForModal: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
    page: 1,
    images: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevProps.query !== this.props.query) {
      this.setState({ searchQuery: this.props.query, page: 1 });
    }

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ images: null }, () => {
        this.fetchImages();
      });
    }

    if (prevState.page < page) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page, images } = this.state;
    this.setState({ status: 'pending' });

    if (images !== null) {
      searchApi(searchQuery, page)
        .then(({ hits, total }) => {
          if (total === 0) {
            this.notify();
            this.setState({
              status: 'idle',
            });
          } else {
            this.setState(prevState => ({
              images: [...prevState.images, ...hits],
              status: 'resolved',
            }));
          }
        })
        .catch(error => {
          this.setState({ status: 'rejected', page: 1, error });
          this.notify();
        });
    } else {
      searchApi(searchQuery, page)
        .then(({ hits, total }) => {
          if (total === 0) {
            this.notify();
            this.setState({
              status: 'idle',
            });
          } else {
            this.setState({
              images: hits,
              status: 'resolved',
            });
          }
        })
        .catch(error => {
          this.setState({ status: 'rejected', page: 1, error });
          this.notify();
        });
    }
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

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onImgClick = ({ url, alt }) => {
    this.props.dataForModal(url, alt);
  };

  render() {
    const { images, status } = this.state;

    return (
      <>
        <ToastContainer />
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
                onClick={this.onImgClick}
              />
            ))}
        </ul>
        <div className={css.ButtonContainer}>
          {images && images.length % 12 === 0 && status === 'resolved' && (
            <Button onClick={this.onLoadMore} />
          )}
        </div>
      </>
    );
  }
}
