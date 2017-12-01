import R from "ramda";
import store from "./redux";

export const selectSingleTask = uuid => {
	const {
		created,
		depends,
		description,
		done,
		due,
		priority,
		project,
		recur,
		tags,
		uuids,
		wait,
	} = store.getState();

	return {
		i: uuids.indexOf(uuid),
		uuid,
		created: created[uuid],
		depends: depends[uuid],
		description: description[uuid],
		due: due[uuid],
		priority: priority[uuid],
		project: project[uuid],
		recur: recur[uuid],
		wait: wait[uuid],
		tags: R.pipe(
			R.filter(({ task, }) => task === uuid),
			R.map(R.prop("tag")),
		)(tags),
	};
};
