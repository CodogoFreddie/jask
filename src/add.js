import R from "ramda";

import Consts from "./consts";
import { genUUID } from "./lib";
import store from "./redux";

export default ({ props, tags, strings }) => {
	console.log("before", store.getState());

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
		depends,
		description,
		due,
		priority,
		project,
		props: rest,
		recur,
		tags: tagsList,
		wait,
	};

	console.log(action);

	store.dispatch(action);

	console.log("after", store.getState());
};
