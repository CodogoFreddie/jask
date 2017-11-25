import R from "ramda";

import Consts from "./consts";
import { genUUID } from "./lib";
import store from "./redux";
import { parse } from "./dateShortcuts";

export default ({ props, tags, strings }) => {
	const description = strings.join(" ");

	const tagsList = R.pipe(
		R.filter(R.test(/^\+/)),
		R.map(R.replace(/^\+/, "")),
	)(tags);

	const { due, wait, depends, project, priority, recur, ...rest } = R.pipe(
		R.map(R.split(":")),
		R.fromPairs,
	)(props);

	const action = {
		type: Consts.Actions.CREATE,
		id: genUUID(),
		created: new Date().toISOString(),
		depends,
		description,
		due: parse(due).toISOString(),
		priority,
		project,
		props: rest,
		recur,
		tags: tagsList,
		wait: parse(wait).toISOString(),
	};

	store.dispatch(action);
};
