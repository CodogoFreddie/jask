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

	const description = strings.join(" ");

	const tagsList = R.pipe(
		R.filter(R.test(/^\+/)),
		R.map(R.replace(/^\+/, "")),
	)(tags);

	uuids.forEach(uuid => {
		const action = {
			description,
			tags: tagsList,
			type: Consts.Actions.MODIFY,
			uuid,
			...parseDefinedProps(props),
		};

		console.log("would modify", action);
		//store.dispatch(action);
	});
};
