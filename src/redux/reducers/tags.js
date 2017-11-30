import R from "ramda";
import Consts from "../../consts";
import createReducer from "./createReducer";

const reducer = createReducer([], {
	[Consts.Actions.CREATE]: ({ tags: { add, remove, }, uuid, }) =>
		R.pipe(
			R.concat(
				add.map(tag => ({
					tag,
					task: uuid,
				})),
			),
			R.difference(
				R.__,
				remove.map(tag => ({
					tag,
					task: uuid,
				})),
			),
		),

	[Consts.Actions.MODIFY]: ({ tags: { add, remove, }, uuid, }) =>
		R.pipe(
			R.concat(
				add.map(tag => ({
					tag,
					task: uuid,
				})),
			),
			R.difference(
				R.__,
				remove.map(tag => ({
					tag,
					task: uuid,
				})),
			),
		),
});

export default reducer;
