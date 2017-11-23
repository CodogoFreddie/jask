import R from "ramda";

import add from "./add";

const stubbed = () => console.log("stubbed");

const delete_ = stubbed;
const done = stubbed;
const modify = stubbed;

const noop = ({ command, }) =>
	console.log(`
invalid command "${command}".

valid commands are:
	+ add
	+ delete
	+ done
	+ modify
`);

const [_, __, command, ...rest] = process.argv;

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const grouped = R.groupBy(
	x =>
		(R.test(/^[0-9]+$/, x) && "ids") ||
		(R.test(uuidRegex, x) && "uuids") ||
		(R.test(/^[a-zA-Z0-9]+:[a-zA-Z0-9]+$/, x) && "props") ||
		(R.test(/^[+-][a-zA-Z0-9]+$/, x) && "tags") ||
		"strings",
	rest,
);

(({
	add,
	delete: delete_,
	done,
	modify,
}[command] || noop)({
	...grouped,
	command,
}));
