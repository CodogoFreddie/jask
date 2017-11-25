import R from "ramda";
import { addDays, addWeeks, addMonths, addYears } from "date-fns";

const extractNumber = adder =>
	R.pipe(
		R.match(/\d+/),
		R.head,
		x => parseInt(x, 10),
		x => adder(new Date(), x),
	);

export const parse = R.cond([
	[R.test(/\d+d/), extractNumber(addDays)],
	[R.test(/\d+w/), extractNumber(addWeeks)],
	[R.test(/\d+m/), extractNumber(addMonths)],
	[R.test(/\d+y/), extractNumber(addYears)],
]);
