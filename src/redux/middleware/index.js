import jsonfile from "jsonfile";
import mkdir from "make-dir";

import config from "../../config";
import Consts from "../../consts";

export const actionSaver = store => next => action => {
	if (!action[Consts.Actions.RESTORING_FROM_CACHE]) {
		const folder = config.dataFolder.replace(/\/?$/, "/") + action.id;
		const filename = folder + "/" + new Date().getTime();

		mkdir(folder).then(() =>
			jsonfile.writeFile(filename, action, {
				spaces: 2,
			}),
		);
	}

	next(action);
};
