import { SONG_FAVORITE, SONG_UNFAVORITE, GET_SONG, GET_ALL_SONGS, GET_FAVORITES } from "../actions/types";

const initialState = {
    items: [],
    item: []
  };

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SONGS:
        return  {
          ...state,
          items: action.payload
        }
    case GET_SONG:
      
        return  {
          ...state,
          item: action.payload
        } 
    case GET_FAVORITES:
        return {
          item: action.payload
        }
    default:
      return { ...state
      }
  }
}

export default songReducer
