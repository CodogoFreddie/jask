import R from "ramda";
import Consts from "../../consts";
import createReducer from "./createReducer";

export default createReducer(
	{},
	{
		[Consts.Actions.CREATE]: ({ uuid, wait, }) => R.assoc(uuid, wait),
		[Consts.Actions.MODIFY]: ({ uuid, wait, }) =>
			wait ? R.assoc(uuid, wait) : R.identity,
	},
);
