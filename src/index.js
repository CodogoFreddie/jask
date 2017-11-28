import R from "ramda";

import add from "./add";
import done from "./done";

import { storeIsReady, } from "./redux";
import render from "./render";

const [_, __, ...args] = process.argv;

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
const keyworkRegex = /(add|modify|delete|done)/;

const [filter, [keyword, ...modifiers],] = R.splitWhen(
	R.test(keyworkRegex),
	args,
);

const groupArgs = R.pipe(
	R.groupBy(
		x =>
			(R.test(/^[0-9]+$/, x) && "ids") ||
			(R.test(uuidRegex, x) && "uuids") ||
			(R.test(/^[a-zA-Z0-9]+:.+$/, x) && "props") ||
			(R.test(/^[+-][a-zA-Z0-9]+$/, x) && "tags") ||
			"strings",
	),

	R.over(R.lensProp("ids"), R.defaultTo([])),
	R.over(R.lensProp("uuids"), R.defaultTo([])),
	R.over(R.lensProp("props"), R.defaultTo([])),
	R.over(R.lensProp("tags"), R.defaultTo([])),
	R.over(R.lensProp("strings"), R.defaultTo([])),

	R.over(R.lensProp("props"), R.pipe(R.map(R.split(":")), R.fromPairs)),
);

const payload = R.pipe(
	R.evolve({
		filter: groupArgs,
		modifiers: groupArgs,
	}),
)({
	filter,
	keyword,
	modifiers,
});

storeIsReady().then(() => {
	(({
		add,
		//delete: delete_,
		done,
		//modify,
	}[keyword] || (() => {}))(payload));

	render(payload);
});
