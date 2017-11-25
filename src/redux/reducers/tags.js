import R from "ramda";
import Consts from "../../consts";

export default (state = [], action) =>
	((action.type === Consts.Actions.CREATE &&
		R.concat(
			action.tags.map(tag => ({
				tag,
				task: action.uuid,
			})),
		)) ||
		R.identity)(state);
