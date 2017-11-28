import Consts from "./consts";
import store from "./redux";
import getIDsSatisfyingFilter from "./getIDsSatisfyingFilter";

export default ({ filter, filterPresent, }) => {
	if (!filterPresent) {
		return console.log(`
can not mark all tasks as done, please specify a filter:
	jask [filter] done
`);
	}

	getIDsSatisfyingFilter(filter).forEach(uuid => {
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
