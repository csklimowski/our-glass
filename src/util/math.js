export function glassWidth(t) {
	return 200*(Math.cos(t*2.5) + 1.15);
}

export function glassHeight(t) {
	return 50*(Math.cos(t*2.5) + 1.15);
}

export function sandPos(t) {
	return 350 + t*400;
}