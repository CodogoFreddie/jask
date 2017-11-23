import R from "ramda";

export default ({ props, tags, strings, }) => {
	const description = strings.join(" ");

	const tagsList = R.pipe(
		R.filter(R.test(/^\+/)),
		R.map(R.replace(/^\+/, "")),
	)(tags);

	const propertiesMap = R.pipe(R.map(R.split(":")), R.fromPairs)(props);

	console.log(`Add a task with the description "${description}",
With the tags: [${tagsList}]
And the Properties: ${JSON.stringify(propertiesMap, null, 2)}`);
};
