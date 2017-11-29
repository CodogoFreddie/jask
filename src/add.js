import R from "ramda";

import Consts from "./consts";
import { genUUID, } from "./lib";
import store from "./redux";
import parseDefinedProps from "./parseDefinedProps";

export default ({ modifiers: { props, tags, strings, }, }) => {
	const description = strings.join(" ");

	const tagsList = R.pipe(
		R.filter(R.test(/^\+/)),
		R.map(R.replace(/^\+/, "")),
	)(tags);

	const action = {
		created: new Date().toISOString(),
		description,
		tags: tagsList,
		type: Consts.Actions.CREATE,
		uuid: genUUID(),
		...parseDefinedProps(props),
	};

	store.dispatch(action);
};
