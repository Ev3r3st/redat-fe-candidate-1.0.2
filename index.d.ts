/* eslint-disable @typescript-eslint/no-explicit-any */
// https://webpack.bootcss.com/guides/webpack-and-typescript/#importing-non-code-assets
declare module '*.svg' {
	const value: string;
	export = value;
}

declare module '*.png' {
	const value: string;
	export = value;
}
