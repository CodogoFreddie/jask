import R from "ramda";
import Consts from "../../consts";
import createReducer from "./createReducer";

export default createReducer(
	{},
	{
		[Consts.Actions.CREATE]: ({ uuid, }) => R.assoc(uuid, null),
		[Consts.Actions.DONE]: ({ uuid, done, }) => R.assoc(uuid, done),
	},
);
