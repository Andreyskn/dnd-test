interface IndexedType {
	id: number
}

export function updateArray<T extends IndexedType>(array: T[], compareWith: number | number[], changeSet: { [K in keyof T]?: T[K] } | { [K in keyof T]?: T[K] }[]): T[] {
	if (Array.isArray(compareWith)){
		return array.map(element => {
			for (let [index, value] of compareWith.entries()) {
				if (element.id === value) return Object.assign({}, element, changeSet[index]);
			}
			return element;
		})
	} else {
		return array.map(element => element.id === compareWith ? Object.assign({}, element, changeSet) : element);
	}
}