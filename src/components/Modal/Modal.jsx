import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.clickEsc);
    document.documentElement.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.clickEsc);
    document.documentElement.style.overflow = 'auto';
  }

  clickBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  clickEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { url, tags } = this.props;

    return (
      <div className={css.Overlay} onClick={this.clickBackdrop}>
        <div className={css.Modal}>
          <img src={url} alt={tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
