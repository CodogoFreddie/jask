import R from "ramda";
import Consts from "../../consts";
import createReducer from "./createReducer";

export default createReducer(
	{},
	{
		[Consts.Actions.CREATE]: ({ uuid, priority, }) =>
			R.assoc(uuid, priority),
		[Consts.Actions.MODIFY]: ({ uuid, priority, }) =>
			priority ? R.assoc(uuid, priority) : R.identity,
	},
);
