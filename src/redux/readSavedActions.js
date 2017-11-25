import jsonfile from "jsonfile";
import recursive from "recursive-readdir";
import R from "ramda";

import config from "../config";
import Consts from "../consts";

export default store =>
	new Promise(done => {
		recursive(config.dataFolder, (err, files) => {
			done(files || []);
		});
	})
		.then(files =>
			Promise.all(
				R.pipe(
					R.sortBy(
						R.pipe(R.replace(/.+\//, ""), x => parseInt(x, 10)),
					),
					R.map(
						filename =>
							new Promise(done =>
								jsonfile.readFile(filename, (err, dat) =>
									done(dat),
								),
							),
					),
				)(files),
			),
		)
		.then(R.map(R.assoc(Consts.Actions.RESTORING_FROM_CACHE, true)))
		.then(R.forEach(store.dispatch));
