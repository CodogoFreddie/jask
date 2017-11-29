import { parse, } from "./dateShortcuts";

export default ({ due, wait, depends, project, priority, recur, ...rest }) => ({
	depends,
	due: due ? parse(due).toISOString() : null,
	priority: priority ? priority.slice(0, 1).toLowerCase() : null,
	project,
	recur,
	...rest,
});
