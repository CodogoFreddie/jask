import R from "ramda";
import Consts from "../../consts";
import createReducer from "./createReducer";

export default createReducer(
	{},
	{
		[Consts.Actions.CREATE]: ({ uuid, due, }) => R.assoc(uuid, due),
		[Consts.Actions.MODIFY]: ({ uuid, due, }) =>
			due ? R.assoc(uuid, due) : R.identity,
	},
);
