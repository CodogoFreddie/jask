import R from "ramda";

export default (initialState, transformers) => (state = initialState, action) =>
	R.pipe(
		R.cond([
			...R.pipe(
				R.toPairs,
				R.map(([actionType, transform,]) => [
					R.pathEq(["action", "type",], actionType),
					({ action, state, }) => transform(action)(state),
				]),
			)(transformers),
			[R.T, R.prop("state"),],
		]),
	)({ state, action, });
