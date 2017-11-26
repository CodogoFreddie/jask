import R from "ramda";

import Consts from "./consts";
import { genUUID, } from "./lib";
import store from "./redux";
import { parse, } from "./dateShortcuts";

export default ({ modifiers: { props, tags, strings, }, }) => {
	const description = strings.join(" ");

	const tagsList = R.pipe(
		R.filter(R.test(/^\+/)),
		R.map(R.replace(/^\+/, "")),
	)(tags);

	const { due, wait, depends, project, priority, recur, ...rest } = props;

	const action = {
		type: Consts.Actions.CREATE,
		uuid: genUUID(),
		created: new Date().toISOString(),
		depends,
		description,
		due: due ? parse(due).toISOString() : null,
		priority,
		project,
		props: rest,
		recur,
		tags: tagsList,
		wait: wait ? parse(wait).toISOString() : null,
	};

	store.dispatch(action);
};
