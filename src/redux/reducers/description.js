import R from "ramda";
import Consts from "../../consts";
import createReducer from "./createReducer";

export default createReducer(
	{},
	{
		[Consts.Actions.CREATE]: ({ uuid, description, }) =>
			R.assoc(uuid, description),
		[Consts.Actions.MODIFY]: ({ uuid, description, }) =>
			description && description.length
				? R.assoc(uuid, description)
				: R.identity,
	},
);
