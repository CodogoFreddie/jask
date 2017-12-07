import R from "ramda";
import Consts from "../../consts";
import createReducer from "./createReducer";

export default createReducer([], {
	[Consts.Actions.CREATE]: ({ uuid, }) => R.append(uuid),
});
