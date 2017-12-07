import R from "ramda";

//import Consts from "./consts";
import store from "./redux";

export default filter => {
	const {
		uuids,
		//created,
		//depends,
		//description,
		//due,
		//priority,
		//recur,
		//wait,
		project,
		tags,
	} = store.getState();

	const [includeTags, excludeTags,] = R.partition(R.test(/^\+/), filter.tags);

	const includeForTagUUIDSSet = new Set();
	const excludeForTagUUIDSSet = new Set();

	tags.forEach(({ tag, task, }) => {
		if (includeTags.includes("+" + tag)) {
			includeForTagUUIDSSet.add(task);
		}
		if (excludeTags.includes("-" + tag)) {
			excludeForTagUUIDSSet.add(task);
		}
	});

	return R.pipe(
		//check uuids
		R.when(
			() => filter.uuids.length,
			R.filter(R.contains(R.__, filter.uuids)),
		),

		//check indexs
		R.when(() => filter.ids.length, () => filter.ids.map(i => uuids[i])),

		//check tags
		R.when(
			() => filter.tags.length,
			R.pipe(
				R.filter(uuid => includeForTagUUIDSSet.has(uuid)),
				R.reject(uuid => excludeForTagUUIDSSet.has(uuid)),
			),
		),

		//check project
		R.when(
			() => filter.props.project,
			R.filter(uuid =>
				(project[uuid] || "").includes(filter.props.project),
			),
		),
	)(uuids);
};
