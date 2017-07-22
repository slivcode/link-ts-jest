#!/usr/bin/env node
const {resolve, dirname} = require('path');
const {execSync} = require('child_process');
const {writeFileSync, existsSync} = require('fs');
const readPkgUp = require('read-pkg-up');

function CLI() {
	readPkgUp().then(({path, pkg}) => {
		const isLinked = existsSync(resolve(dirname(path), 'node_modules', 'ts-jest'));
		if (!isLinked) {
			const deps = [
				'ts-node',
				'ts-jest',
				'jest',
				'@types/jest'
			];
			execSync(`npm link ${deps.join(' ')}`);
		}
		if (pkg.jest) return;
		delete pkg['_id'];
		pkg.jest = {
			"transform": {
				".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
			},
			"testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
			"moduleFileExtensions": [
				"ts",
				"tsx",
				"js",
				"json"
			]
		};
		writeFileSync(path, JSON.stringify(pkg, null, 2));
	});
}

CLI();