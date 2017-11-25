const differenceInMinutes = require("date-fns/differenceInMinutes");
const differenceInDays = require("date-fns/differenceInDays");

module.exports = {
	dataFolder: "/home/freddie/Sync/Files/Todo",

	columns: [
		"score",
		"i",
		"description",
		"due",
		"tags",
		"priority",
		"depends",
		"recur",
		"created",
	],

	scoreFunction: ({ created, depends, due, priority, recur, wait, tags }) => {
		const age = differenceInDays(new Date(), created);
		const tagsCount = tags.length;
		const dueIn = differenceInMinutes(due, new Date()) / 360;

		const priorityScore = ({
			h: 10,
			m: 5,
			l: -2,
		}[priority] || 0);

		return age + tagsCount + priorityScore + ( 10 * Math.exp(-dueIn) );
	},
};
