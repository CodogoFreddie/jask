import R from "ramda";

import Consts from "./consts";
import store from "./redux";

export default (filter) => {
	console.log("filter", filter);

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

	return R.pipe(
		//check uuids
		R.when( 
			() => filter.uuids.length,
			R.filter( R.contains(R.__, filter.uuids)),
		),

		R.identity,
	)(uuids);
}
