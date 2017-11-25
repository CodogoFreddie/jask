// @preval

const Consts = {
	Actions: {
		CREATE: "",

		RESTORING_FROM_CACHE: "",
	},
};

function recursiveSpecification(o, s) {
	for (var key in o) {
		const sWithKey = s + "_" + key.toUpperCase();
		if (key === "Magic") {
			continue;
		}
		if (typeof o[key] === "object") {
			recursiveSpecification(o[key], sWithKey);
		} else if (typeof o[key] === "string") {
			o[key] = sWithKey;
		} else if (typeof o[key] === "number") {
			o[key] = o[key];
		}
	}
}

recursiveSpecification(Consts, "CONST");

module.exports = Consts;
