import columnify from "columnify";

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
		updated,
	} = store.getState();

	const data = ids.map(id => ({
		//uuid: id,
		created: created[id],
		depends: depends[id],
		description: description[id],
		due: due[id],
		priority: priority[id],
		recur: recur[id],
		wait: wait[id],
		//tags: tags[id],
		updated: updated[id],
	}));

	console.log(columnify(
		data,
		{
		columns: config.columns, 
		}
	));
};
