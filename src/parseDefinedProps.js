import { parse, } from "./dateShortcuts";

export default ({ due, wait, depends, project, priority, recur, ...rest }) => ({
	depends,
	due: due ? parse(due).toISOString() : null,
	priority,
	project,
	recur,
	...rest,
});
