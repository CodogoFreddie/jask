export default {
	dataFolder: "/tmp/todoData",

	columns: [
		"description",
		"created",
		"depends",
		"due",
		"priority",
		"recur",
		"wait",
		"tags",
		"updated",
	],

	scoreFunction: ({
		created,
		depends,
		due,
		priority,
		recur,
		wait,
		tags,
		updated,
	}) => (

	),
};
