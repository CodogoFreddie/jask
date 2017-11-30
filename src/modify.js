import R from "ramda";

import Consts from "./consts";
import getIDsSatisfyingFilter from "./getIDsSatisfyingFilter";
import store from "./redux";
import parseDefinedProps from "./parseDefinedProps";

export default ({
	filter,
	filterPresent,
	modifiersPresent,
	modifiers: { props, tags, strings, },
}) => {
	if (!filterPresent) {
		return console.log(`
modify requires a filter:
	jask [filter] done [modifiers]
`);
	}

	if (!modifiersPresent) {
		return console.log(`
modify requires modifiers:
	jask [filter] done [modifiers]
`);
	}

	const uuids = getIDsSatisfyingFilter(filter);

	uuids.forEach(uuid => {
		const action = {
			type: Consts.Actions.MODIFY,
			uuid,
			...parseDefinedProps({
				strings,
				tags,
				...props,
			}),
		};

		store.dispatch(action);
	});
};
