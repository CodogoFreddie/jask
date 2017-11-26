import R from "ramda";
import Consts from "../../consts";

export default (state = {}, action) =>
	((action.type === Consts.Actions.CREATE &&
		R.assoc(action.uuid, action.wait ? new Date(action.wait) : null)) ||
		R.identity)(state);
