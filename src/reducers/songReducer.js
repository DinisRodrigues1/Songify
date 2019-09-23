import {
  SONG_FAVORITE,
  SONG_UNFAVORITE,
  GET_SONG,
  GET_ALL_SONGS,
  GET_FAVORITES
} from "../actions/types";

const initialState = {
  songs: [],
  items: [],
  item: [],
  favs: [],
  unfav: []
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SONGS:
      return {
        ...state,
        songs: action.payload
      };
    case GET_SONG:
      return {
        ...state,
        item: action.payload
      };
    case GET_FAVORITES:
      return {
        ...state,
        favs: action.payload
      };
    case SONG_FAVORITE:
      return {
        ...state,
        items: action.payload
      };
    case SONG_UNFAVORITE:
      return {
        ...state,
        unfav: action.payload
      };
    default:
      return { ...state };
  }
};

export default songReducer;
