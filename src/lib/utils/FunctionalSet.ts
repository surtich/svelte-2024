class FuncionalSet<T> {
	private fn: (x: T, y: T) => boolean;
	private elements: T[];

	static sameElements<T>(
		xs: T[],
		ys: T[],
		fn = (x: T, y: T) => x === y
	) {
		return new FuncionalSet(fn).add(...xs).equals(ys);
	}

	constructor(
		equalsFunction = (x: T, y: T) => x === y
	) {
		this.fn = equalsFunction;
		this.elements = [];
	}

	get(element: T) {
		return this.elements.find((e) =>
			this.fn(e, element)
		);
	}

	has(element: T) {
		return this.get(element) != undefined;
	}

	add(...elements: T[]) {
		const set = new FuncionalSet(this.fn);
		set.elements = [...this.elements];
		for (const element of elements) {
			if (!set.get(element)) {
				set.elements.push(element);
			}
		}
		return set;
	}

	remove(...elements: T[]) {
		const set = new FuncionalSet(this.fn);
		set.elements = [...this.elements];
		for (const element of elements) {
			const index = set.elements.findIndex((e) =>
				set.fn(e, element)
			);
			if (index != -1) {
				set.elements.splice(index, 1);
			}
		}
		return set;
	}

	size() {
		return this.elements.length;
	}

	toArray() {
		return [...this.elements];
	}

	union(
		elements: FuncionalSet<T> | Array<T>
	): FuncionalSet<T> {
		if (elements instanceof FuncionalSet) {
			return this.union(elements.toArray());
		}
		return this.add(...elements);
	}

	difference(
		elements: FuncionalSet<T> | Array<T>
	): FuncionalSet<T> {
		if (elements instanceof FuncionalSet) {
			return this.difference(elements.toArray());
		}
		return this.remove(...elements);
	}

	intersection(
		elements: FuncionalSet<T> | Array<T>
	): FuncionalSet<T> {
		elements =
			elements instanceof FuncionalSet
				? elements.toArray()
				: elements;

		const diffLeft = this.difference(elements);
		const diffRight = new FuncionalSet(this.fn)
			.add(...elements)
			.difference(this.elements);

		return this.union(elements).difference(
			diffLeft.union(diffRight)
		);
	}

	equals(
		elements: FuncionalSet<T> | Array<T>
	): boolean {
		if (Array.isArray(elements)) {
			return this.equals(
				new FuncionalSet(this.fn).add(...elements)
			);
		}

		return (
			this.size() === elements.size() &&
			this.union(elements).size() === this.size()
		);
	}

	includes(
		elements: FuncionalSet<T> | Array<T>
	): boolean {
		return this.equals(this.union(elements));
	}
}

export default FuncionalSet;
