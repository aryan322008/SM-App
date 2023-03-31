import { combineReducers} from 'redux'
import posts from "./post";
import auth from "./auth";
import details from "./getDetails";

export default combineReducers({posts,auth,details})
