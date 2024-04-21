export function filterEmptyStrings(obj: { [key: string]: any }): { [key: string]: any } {
	const filteredObj: { [key: string]: any } = {};
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const value = obj[key];
			if (value !== '') {
				filteredObj[key] = value;
			}
		}
	}
	return filteredObj;
}