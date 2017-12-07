import R from "ramda";

import { parse, } from "./dateShortcuts";

const parseTags = R.pipe(
	R.partition(R.test(/^\+/)),

	R.map(R.map(R.slice(1, Infinity))),

	([add, remove,]) => ({
		add,
		remove,
	}),
);

const parseDue = R.when(Boolean, due => parse(due).toISOString());

const parsePriority = R.when(Boolean, priority =>
	priority.slice(0, 1).toLowerCase(),
);

const parseStrings = R.join(" ");
const renameStringsToDescription = ({ strings, ...rest }) => ({
	description: strings,
	...rest,
});

export default R.pipe(
	R.evolve({
		due: parseDue,
		priority: parsePriority,
		tags: parseTags,
		strings: parseStrings,
	}),
	renameStringsToDescription,
	R.unless(R.path(["description", "length",]), R.dissoc("description")),
);
