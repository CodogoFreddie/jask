import R from "ramda";
import Consts from "../../consts";
import createReducer from "./createReducer";

export default createReducer(
	{},
	{
		[Consts.Actions.CREATE]: ({ uuid, project, }) => R.assoc(uuid, project),
		[Consts.Actions.MODIFY]: ({ uuid, project, }) => R.assoc(uuid, project),
	},
);

(state = {}, action) =>
	((action.type === Consts.Actions.CREATE &&
		R.assoc(action.uuid, action.project)) ||
		R.identity)(state);
