import jsonfile from "jsonfile";
import mkdir from "make-dir";

import config from "../../config";
import Consts from "../../consts";

export const actionSaver = () => next => action => {
	if (
		!action[Consts.Actions.RESTORING_FROM_CACHE] &&
		!action.type.includes("@@redux")
	) {
		const folder = config.dataFolder.replace(/\/?$/, "/") + action.uuid;
		const filename = folder + "/" + new Date().getTime();

		mkdir(folder).then(() =>
			jsonfile.writeFile(filename, action, {
				spaces: 2,
			}),
		);
	}

	next(action);
};
