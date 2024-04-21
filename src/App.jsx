import * as React from 'react';
import axios from 'axios';


import { SearchForm } from './SearchForm';
import { List } from './List';




const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        // data: action.payload.list,
        data:
action.payload.page === 0
? action.payload.list
: state.data.concat(action.payload.list),

        page: action.payload.page,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';




// const extractSearchTerm = (url) => url.replace(API_ENDPOINT, '');
// const extractSearchTerm = (url) => url.substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'));
const extractSearchTerm = (url) => url.substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&')).replace(PARAM_SEARCH, '');

// const getLastSearches = (urls) => urls.slice(-5);
const getLastSearches = (urls) =>
  urls.slice(-5).map((url) => extractSearchTerm(url));


const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'React'
  );
  // const getUrl = (searchTerm) => `${API_ENDPOINT}${searchTerm}`;
  // const getUrl = (searchTerm) =>`${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}`;
  const getUrl = (searchTerm, page) =>{
    let u = `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;
    console.log("page: "  +u);
    return u;
  }
  
    ;


  // const extractSearchTerm = (url) => url.replace(API_ENDPOINT, '');
  const extractSearchTerm = (url) =>
  url
    .substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'))
    .replace(PARAM_SEARCH, '');
  const [urls, setUrls] = React.useState([getUrl(searchTerm, 0)]);

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], page: 0, isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });


    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);
      // console.log(result);
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: {
          list: result.data.hits,
          page: result.data.page,
        },

      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }

  }, [urls]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };
  /*   const handleSearch = (searchTerm) => {
      const url = getUrl(searchTerm);
      setUrls(urls.concat(url));
      }; */
  const handleSearch = (searchTerm, page) => {
    const url = getUrl(searchTerm, page);
    setUrls(urls.concat(url));
  };


  const handleSearchSubmit = (event) => {
    handleSearch(searchTerm, 0);
    event.preventDefault();
  };
  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm, 0);
  };

  const lastSearches = getLastSearches(urls);
  const handleMore = () => {
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl);
    console.log(searchTerm);
    handleSearch(searchTerm, stories.page + 1);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <hr />
      {lastSearches.map((searchTerm, index) => (
        <button
          key={searchTerm + index}
          type="button"
          onClick={() => handleLastSearch(searchTerm)}
        >
          {searchTerm}
        </button>
      ))}
      <hr />
      {stories.isError && <p>Something went wrong ...</p>}
      <List list={stories.data} onRemoveItem={handleRemoveStory} />
      {stories.isLoading ? (
<p>Loading ...</p>
) : (
<button type="button" onClick={handleMore}>
More
</button>
)}


    </div>
  );
};

export default App;
