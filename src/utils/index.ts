interface IndexedType {
	id: number
}

export const updateArray = {
	singleChange: <T extends IndexedType>(array: T[], compareWith: number, changeSet: { [K in keyof T]?: T[K] }) => {
		return array.map(element => element.id === compareWith ? Object.assign({}, element, changeSet) : element);
	},

	multiChange: <T extends IndexedType>(array: T[], compareWith: number[], changeSet: { [K in keyof T]?: T[K] }[]) => {
		return array.map(element => {
			for (let [index, value] of compareWith.entries()) {
				if (element.id === value) return Object.assign({}, element, changeSet[index]);
			}
			return element;
		})
	}
}