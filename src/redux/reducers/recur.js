import R from "ramda";
import Consts from "../../consts";
import createReducer from "./createReducer";

export default createReducer(
	{},
	{
		[Consts.Actions.CREATE]: ({ uuid, recur, }) => R.assoc(uuid, recur),
		[Consts.Actions.MODIFY]: ({ uuid, recur, }) => R.assoc(uuid, recur),
	},
);
