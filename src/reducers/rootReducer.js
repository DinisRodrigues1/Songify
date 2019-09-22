import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import songReducer from "./songReducer";
import libraryReducer from "./libraryReducer"

const rootReducer = combineReducers({
  auth: loginReducer,
  songs: songReducer,
  library: libraryReducer
});

export default rootReducer