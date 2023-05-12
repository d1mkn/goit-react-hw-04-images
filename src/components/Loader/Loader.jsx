import { TailSpin } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <TailSpin
      wrapperClass={css.Loader}
      height="100"
      width="100"
      color="#3f51b5"
      ariaLabel="tail-spin-loading"
      radius="1"
      visible={true}
    />
  );
};
