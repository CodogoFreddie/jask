import R from "ramda";
import Consts from "../../consts";
import createReducer from "./createReducer";

export default createReducer(
	{},
	{
		[Consts.Actions.CREATE]: ({ uuid, depends, }) => R.assoc(uuid, depends),
		[Consts.Actions.MODIFY]: ({ uuid, depends, }) =>
			depends ? R.assoc(uuid, depends) : R.identity,
	},
);
