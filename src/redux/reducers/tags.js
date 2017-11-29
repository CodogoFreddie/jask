import R from "ramda";
import Consts from "../../consts";

export default (state = [], action) =>
	R.pipe(
		R.when(
			() => action.type === Consts.Actions.CREATE,
			R.concat(
				(action.tags || []).map(tag => ({
					tag,
					task: action.uuid,
				})),
			),
		),

		R.when(
			() => action.type === Consts.Actions.MODIFY,
			R.concat(
				(action.tags || []).map(tag => ({
					tag,
					task: action.uuid,
				})),
			),
		),
	)(state);
