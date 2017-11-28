import R from "ramda";

import Consts from "./consts";
import store from "./redux";
import getIDsSatisfyingFilter from "./getIDsSatisfyingFilter";

export default ({ filter, }) => {
	getIDsSatisfyingFilter(filter).map(uuid => {
		store.dispatch({
			type: Consts.Actions.DONE,
			uuid,
			done: new Date().toISOString(),
		});

		console.log(
			`Marked task "${store.getState().description[uuid]}" (${
				uuid
			}) as done`,
		);
	});
};
