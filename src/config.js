const differenceInMinutes = require("date-fns/differenceInMinutes");
const differenceInDays = require("date-fns/differenceInDays");

module.exports = {
	dataFolder: "~/Sync/Files/Todo",

	columns: [
		"score",
		"description",
		"created",
		"depends",
		"due",
		"priority",
		"recur",
		"tags",
	],

	scoreFunction: ({ created, depends, due, priority, recur, wait, tags }) => {
		const age = differenceInDays(new Date(), created);
		const tagsCount = tags.length;
		const dueIn = differenceInMinutes(due, new Date()) / 360 ;

		const priorityScore = {
			h: 10,
			m: 5,
			l: -2,
		}[priority];

		return age + tagsCount + priorityScore + Math.exp(-dueIn);
	},
};
