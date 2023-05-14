export const searchApi = (searchQuery, page) => {
  const APIKEY = '33877406-e4b4107cd4df69d9ba05d00a1';
  const URL = 'https://pixabay.com/api/?q=';
  return fetch(
    `${URL}${searchQuery}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(r => r.json());
};
