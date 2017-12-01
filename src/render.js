import columnify from "columnify";
import chalk from "chalk";
import R from "ramda";
import { formatDistanceWithOptions, } from "date-fns/fp";

import store from "./redux";
import config from "./config";
import getIDsSatisfyingFilter from "./getIDsSatisfyingFilter";
import { selectSingleTask, } from "./selectTask";

const map = R.addIndex(R.map);

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
				created: formatDistanceWithOptions({ addSuffix: true, })(
					new Date(),
				),
				due: R.when(
					Boolean,
					formatDistanceWithOptions({ addSuffix: true, })(new Date()),
				),
				done: R.when(
					Boolean,
					formatDistanceWithOptions({ addSuffix: true, })(new Date()),
				),
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
			.map((row, i) => (i % 2 ? chalk.bgBlack(row) : row))
			.join("\n"),
	);
};
