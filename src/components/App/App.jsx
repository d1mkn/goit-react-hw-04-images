import { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    data: null,
  };

  handleSubmit = searchQuery => {
    this.setState({ query: searchQuery });
    const APIKEY = '33877406-e4b4107cd4df69d9ba05d00a1';
    const URL = 'https://pixabay.com/api/?q=';
    fetch(
      `${URL}${searchQuery}&page=1&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(r => r.json())
      .then(data => this.setState({ data }));
  };

  render() {
    return (
      <main className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery data={this.state.data} />
      </main>
    );
  }
}
