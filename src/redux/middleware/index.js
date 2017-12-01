import jsonfile from "jsonfile";
import mkdir from "make-dir";

import config from "../../config";
import { genUUID, } from "../../lib";
import Consts from "../../consts";
import { parseFrom, } from "../../dateShortcuts";
import { selectSingleTask, } from "../../selectTask";

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

export const renewRecuring = store => next => action => {
	if (
		!action[Consts.Actions.RESTORING_FROM_CACHE] &&
		action.type === Consts.Actions.DONE &&
		store.getState().recur[action.uuid]
	) {
		const { uuid, } = action;
		const { due, recur, wait, } = store.getState();
		const thisTaskDue = due[uuid];
		const thisTaskWait = wait[uuid];
		const thisTaskRecur = recur[uuid];
		const newDueDate = parseFrom(thisTaskDue)(thisTaskRecur);
		const newWaitDate = parseFrom(thisTaskWait)(thisTaskRecur);

		const oldTask = selectSingleTask(uuid);
		const newInstanceAction = {
			...oldTask,
			tags: {
				add: oldTask.tags,
				remove: [],
			},
			due: newDueDate,
			wait: newWaitDate,
			uuid: genUUID(),
			type: Consts.Actions.CREATE,
		};

		next(newInstanceAction);
	}
	next(action);
};
