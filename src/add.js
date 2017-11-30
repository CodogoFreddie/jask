import R from "ramda";

import Consts from "./consts";
import { genUUID, } from "./lib";
import store from "./redux";
import parseDefinedProps from "./parseDefinedProps";

export default ({ modifiers: { props, tags, strings, }, }) => {
	const description = strings.join(" ");

	const action = {
		created: new Date().toISOString(),
		description,
		type: Consts.Actions.CREATE,
		uuid: genUUID(),
		...parseDefinedProps({
			strings,
			tags,
			...props,
		}),
	};

	//console.log(action);

	store.dispatch(action);
};
