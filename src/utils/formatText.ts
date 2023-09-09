export function formatText(text: string) {
	const formattedText = text
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	return formattedText;
}
