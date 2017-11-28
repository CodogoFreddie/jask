const differenceInMinutes = require("date-fns/differenceInMinutes");
const differenceInDays = require("date-fns/differenceInDays");
const R = require("ramda");

module.exports = {
	dataFolder: "/home/freddie/Sync/Files/Todo",

	columns: [
		"score",
		"i",
		"description",
		"due",
		"tags",
		"priority",
		"project",
		"depends",
		"recur",
		"created",
	],

	scoreFunction: ({ description, created, depends, due, project, priority, recur, wait, tags, }) => {
		const ageScore = differenceInDays(new Date(), created);
		const tagsCountScore = tags.length;
		const dueInScore = due ? 10 * Math.exp( differenceInMinutes(new Date(), due) / 36000 ) : 0 ;
		const projectScore = project ? 3 : 0;

		const priorityScore =
			{
				h: 10,
				m: 5,
				l: -2,
			}[priority] || 0;

		return R.sum([
			ageScore,
			tagsCountScore,
			dueInScore,
			priorityScore,
			projectScore,
		]);
	},
};
