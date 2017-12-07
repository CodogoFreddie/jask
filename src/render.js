import columnify from "columnify";
import chalk from "chalk";
import R from "ramda";
import { formatDistanceWithOptions, } from "date-fns/fp";

import store from "./redux";
import config from "./config";
import getIDsSatisfyingFilter from "./getIDsSatisfyingFilter";
import { selectSingleTask, } from "./selectTask";

const map = R.addIndex(R.map);

const formatTimes = R.when(
	Boolean,
	R.pipe(
		formatDistanceWithOptions({ addSuffix: true, })(new Date()),
		R.replace("about ", ""),
	),
);

export default ({ filter, }) => {
	const { done, } = store.getState();

	const data = R.pipe(
		R.reject(uuid => done[uuid]),
		R.sortBy(R.identity),

		map(selectSingleTask),

		R.map(props => ({
			...props,
			score: config.scoreFunction(props),
		})),

		R.sortBy(R.prop("score")),

		R.reverse,

		R.map(
			R.evolve({
				score: x => x.toPrecision(3),
				created: formatTimes,
				due: formatTimes,
				done: formatTimes,
				tags: R.join(" "),
			}),
		),

		R.map(R.omit(["wait",])),
	)(getIDsSatisfyingFilter(filter));

	console.log(
		columnify(data, {
			columns: config.columns,
		})
			.split("\n")
			.map((row, i) => (i % 2 ? row : chalk.bgBlackBright(row)))
			.map(row => (row.includes("ago") ? chalk.red(row) : row))
			.join("\n"),
	);
};
