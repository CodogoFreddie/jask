import columnify from "columnify";
import R from "ramda";
import { formatDistanceWithOptions, format } from "date-fns/fp";

import store from "./redux";
import config from "./config";
import getIDsSatisfyingFilter from "./getIDsSatisfyingFilter";

const map = R.addIndex(R.map);

export default ({ filter, }) => {

	console.log( getIDsSatisfyingFilter(filter) );

	const {
		uuids,
		created,
		depends,
		description,
		due,
		priority,
		recur,
		wait,
		tags,
	} = store.getState();

	const data = R.pipe(
		R.sortBy(R.identity),

		map((uuid, i) => ({
			i: i + 1,
			uuid,
			created: created[uuid],
			depends: depends[uuid],
			description: description[uuid],
			due: due[uuid],
			priority: priority[uuid],
			recur: recur[uuid],
			wait: wait[uuid],
			tags: R.pipe(
				R.filter(({ task }) => task === uuid),
				R.map(R.prop("tag")),
			)(tags),
		})),

		R.map(props => ({
			...props,
			score: config.scoreFunction(props),
		})),

		R.sortBy(R.prop("score")),

		R.reverse,

		R.map(
			R.evolve({
				score: x => x.toPrecision(3),
				created: formatDistanceWithOptions({ addSuffix: true })(
					new Date(),
				),
				due: formatDistanceWithOptions({ addSuffix: true })(new Date()),
				tags: R.pipe(R.map(x => "+" + x), R.join(", ")),
			}),
		),

		R.map(R.omit(["wait"])),
	)(uuids);

	console.log(
		columnify(data, {
			columns: config.columns,
		}),
	);
};
