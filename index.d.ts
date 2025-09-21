/* eslint-disable @typescript-eslint/no-explicit-any */
// https://webpack.bootcss.com/guides/webpack-and-typescript/#importing-non-code-assets
declare module '*.svg' {
	const value: any;
	export = value;
}

declare module '*.png' {
	const value: any;
	export = value;
}

declare module '*.json' {
	const value: any;
	export = value;
}
