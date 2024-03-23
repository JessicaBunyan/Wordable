export default function getFlipDuration() {
	// const toCheck = name.substring(0, 2) === "--" ? name : "--" + name;

	return parseInt(
		getComputedStyle(document.documentElement)
			.getPropertyValue("--flip-duration")
			.slice(0, length - 1),
	);
}
