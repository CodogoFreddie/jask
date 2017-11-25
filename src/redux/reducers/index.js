import R from "ramda";

import Consts from "../../consts";

export const ids = (state = [], action) =>
	((action.type === Consts.Actions.CREATE && R.append(action.id)) ||
		R.identity)(state);

export const created = (state = {}, action) =>
	((action.type === Consts.Actions.CREATE &&
		R.assoc(action.id, new Date().toISOString())) ||
		R.identity)(state);

export const depends = (state = {}, action) =>
	((action.type === Consts.Actions.CREATE &&
		R.assoc(action.id, action.depends)) ||
		R.identity)(state);

export const description = (state = {}, action) =>
	((action.type === Consts.Actions.CREATE &&
		R.assoc(action.id, action.description)) ||
		R.identity)(state);

export const due = (state = {}, action) =>
	((action.type === Consts.Actions.CREATE &&
		R.assoc(action.id, action.due)) ||
		R.identity)(state);

export const priority = (state = {}, action) =>
	((action.type === Consts.Actions.CREATE &&
		R.assoc(action.id, action.priority)) ||
		R.identity)(state);

export const recur = (state = {}, action) =>
	((action.type === Consts.Actions.CREATE &&
		R.assoc(action.id, action.recur)) ||
		R.identity)(state);

export const wait = (state = {}, action) =>
	((action.type === Consts.Actions.CREATE &&
		R.assoc(action.id, action.wait)) ||
		R.identity)(state);

export const tags = (state = [], action) =>
	((action.type === Consts.Actions.CREATE &&
		R.concat(
			action.tags.map(tag => ({
				tag,
				task: action.id,
			})),
		)) ||
		R.identity)(state);

export const updated = (state = {}, action) =>
	R.assoc(action.id, new Date().toISOString(), state);
