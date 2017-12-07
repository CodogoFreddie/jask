import R from "ramda";
import Consts from "../../consts";
import createReducer from "./createReducer";

export default createReducer(
	{},
	{
		[Consts.Actions.CREATE]: ({ uuid, created, }) => R.assoc(uuid, created),
	},
);
//(state = {}, action) =>
//((action.type === Consts.Actions.CREATE &&
//R.assoc(action.uuid, new Date(action.created))) ||
//R.identity)(state);
