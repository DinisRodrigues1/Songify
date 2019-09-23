import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import songReducer from "./songReducer";

const rootReducer = combineReducers({
  auth: loginReducer,
  songs: songReducer,
});

export default rootReducer