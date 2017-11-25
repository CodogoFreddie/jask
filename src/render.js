import columnify from "columnify";
import R from "ramda";
import { formatDistanceWithOptions, format } from "date-fns/fp";

import store from "./redux";
import config from "./config";

export default () => {
	const {
		ids,
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
		R.map(id => ({
			//uuid: id,
			created: created[id],
			depends: depends[id],
			description: description[id],
			due: due[id],
			priority: priority[id],
			recur: recur[id],
			wait: wait[id],
			tags: R.pipe(
				R.filter(({ task }) => task === id),
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
	)(ids);

	console.log(
		columnify(data, {
			columns: config.columns,
		}),
	);
};
