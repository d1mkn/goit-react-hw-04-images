import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    modalImg: '',
    modalTags: '',
    showModal: false,
  };

  handleSubmit = searchQuery => {
    this.setState({ query: searchQuery });
  };

  handleImgClick = (url, alt) => {
    this.setState({ modalImg: url, modalTags: alt, showModal: true });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { modalImg, modalTags, showModal } = this.state;

    return (
      <main className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          query={this.state.query}
          dataForModal={this.handleImgClick}
        />
        {showModal && (
          <Modal url={modalImg} tags={modalTags} onClose={this.toggleModal} />
        )}
      </main>
    );
  }
}
