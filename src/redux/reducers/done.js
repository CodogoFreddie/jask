import R from "ramda";
import Consts from "../../consts";

export default (state = {}, action) =>
	((action.type === Consts.Actions.CREATE && R.assoc(action.uuid, null)) ||
		(action.type === Consts.Actions.DONE &&
			R.assoc(action.uuid, new Date(action.done))) ||
		R.identity)(state);
