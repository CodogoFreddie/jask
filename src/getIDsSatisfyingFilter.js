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
		//tags,
	} = store.getState();

	//const [includeTags, excludeTags,] = R.partition(R.test(/^\+/), filter.tags);

	//console.log( {includeTags, excludeTags,});

	return R.pipe(
		//check uuids
		R.when(
			() => filter.uuids.length,
			R.filter(R.contains(R.__, filter.uuids)),
		),

		//check indexs
		R.when(() => filter.ids.length, () => filter.ids.map(i => uuids[i])),

		//tags
		//R.when(
		//() => filter.tags.length,
		//),

		R.identity,
	)(uuids);
};
