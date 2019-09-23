import {
  SONG_FAVORITE,
  SONG_UNFAVORITE,
  GET_SONG,
  GET_ALL_SONGS,
  GET_FAVORITES
} from "./types";
import axios from "axios";

export const getSongs = () => dispatch => {
  axios.get("https://songs-api-ubiwhere.now.sh/api/songs").then(res =>
    dispatch({
      type: GET_ALL_SONGS,
      payload: res.data
    })
  );
};

export const getSong = id => {
  return dispatch => {
    axios.get(`https://songs-api-ubiwhere.now.sh/api/songs/${id}`).then(res =>
      dispatch({
        type: GET_SONG,
        payload: res.data
      })
    );
  };
};

export const getSongFavorites = () => {
  return dispatch => {
    const token = localStorage.token;
    if (token) {
      return axios
        .get(`https://songs-api-ubiwhere.now.sh/api/user-favorites/`, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          console.log(res);
          if (res.message) {
            localStorage.removeItem("token");
          } else {
            const result = res.data;
            const getFavorite = async result => {
              const promises = result.map(fav => {
                return axios
                  .get(
                    `https://songs-api-ubiwhere.now.sh/api/songs/${fav.songId}`
                  )
                  .then(({ data }) => {
                    return data;
                  });
              });

              const favorites = await Promise.all(promises)
                .then(values => {
                  return values;
                })
                .catch(error => {
                  //error;
                });
              dispatch({
                type: GET_FAVORITES,
                payload: favorites.flat()
              });
            };
            getFavorite(result);
          }
        });
    }
  };
};

export const addToFavorites = iden => {
  return dispatch => {
    const token = localStorage.token;
    if (token) {
      axios
        .request({
          method: "POST",
          url: `https://songs-api-ubiwhere.now.sh/api/user-favorites/`,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          },
          data: {
            songId: iden
          }
        })
        .then(res => {
          
          getSongFavorites();
          dispatch({
            type: SONG_FAVORITE
          });
          
        });
    }
  };
};

export const removeFavorite = id => {
  return dispatch => {
    const token = localStorage.token;
    if (token) {
      axios
        .request({
          method: "DELETE",
          url: `https://songs-api-ubiwhere.now.sh/api/user-favorites/`, 
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          },
          data: {
            songId: id
          }
        })
        .then(res => {
          if (res.message) {
            localStorage.removeItem("token");
          } else {
            const result = res.data;
            dispatch({
              type: SONG_UNFAVORITE,
              payload: result
            });
          }
        });
    }
  };
};
