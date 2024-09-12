export type SvgObject =
	| {
			attributes: {
				xmlns: string;
				viewBox: string;
			};
			paths: Array<{
				attributes: {
					fill?: string;
					d: string;
				};
			}>;
	  }
	| undefined;

export const parseSvg = (svgString: string): SvgObject => {
	const svgMatch = svgString.match(
		/<svg[^>]+(xmlns="[^"]+")[^>]+(viewBox="[^"]+")[^>]*>/,
	);
	if (!svgMatch) {
		return undefined;
	}

	const [, xmlns, viewBox] = svgMatch;

	const getAttributeValue = (attribute: string) =>
		attribute.split('=')[1].replace(/"/g, '');

	const pathRegex = /<path([^>]+)\/>/g;
	let match;
	const paths = [];

	while ((match = pathRegex.exec(svgString)) !== null) {
		const pathAttributes = match[1];
		const fillMatch = pathAttributes.match(/fill="([^"]+)"/);
		const dMatch = pathAttributes.match(/d="([^"]+)"/);

		if (dMatch) {
			paths.push({
				attributes: {
					fill: fillMatch ? fillMatch[1] : undefined,
					d: dMatch[1],
				},
			});
		}
	}
	return {
		attributes: {
			xmlns: getAttributeValue(xmlns),
			viewBox: getAttributeValue(viewBox),
		},
		paths,
	};
};
