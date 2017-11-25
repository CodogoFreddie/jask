import R from "ramda";
import Consts from "../../consts";

export default (state = {}, action) => (
	(action.type === Consts.Actions.CREATE &&
		R.assoc(action.uuid, false))
		||
		R.identity)(state);
