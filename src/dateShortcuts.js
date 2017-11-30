import R from "ramda";
import {
	addDays,
	addMonths,
	addWeeks,
	addYears,
	endOfDay,
	endOfMonth,
	endOfWeek,
	endOfYear,
	startOfDay,
	startOfMonth,
	startOfWeek,
	startOfYear,
} from "date-fns";

const extractNumber = adder =>
	R.pipe(
		R.match(/\d+/),
		R.head,
		x => parseInt(x, 10),
		x => adder(new Date(), x),
	);

export const parse = R.cond([
	[R.test(/\d+d/), extractNumber(addDays),],
	[R.test(/\d+w/), extractNumber(addWeeks),],
	[R.test(/\d+m/), extractNumber(addMonths),],
	[R.test(/\d+y/), extractNumber(addYears),],
	[R.test(/^eod$/), () => endOfDay(new Date()),],
	[R.test(/^eom$/), () => endOfMonth(new Date()),],
	[R.test(/^eow$/), () => endOfWeek(new Date()),],
	[R.test(/^eoy$/), () => endOfYear(new Date()),],
	[R.test(/^sod$/), () => startOfDay(new Date()),],
	[R.test(/^som$/), () => startOfMonth(new Date()),],
	[R.test(/^sow$/), () => startOfWeek(new Date()),],
	[R.test(/^soy$/), () => startOfYear(new Date()),],
	[R.test(/^now$/), () => new Date(),],
]);
