export const removeUndefinedKeys = (object: object) => {
	Object.keys(object).forEach((key) => (object as any)[key] === undefined && delete (object as any)[key]);
};
