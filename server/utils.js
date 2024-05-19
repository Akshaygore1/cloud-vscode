import fs from 'fs/promises';
import path from 'path';

async function generateFileTree(directory) {
	console.log('Dire', directory);
	const tree = await buildTree(directory);
	const directoryStructure = convertToDirectoryStructure(tree);
	console.log('first', directoryStructure);
	return directoryStructure;
}

async function buildTree(currentDir) {
	const tree = {};
	if (!currentDir.includes('node_modules')) {
		const files = await fs.readdir(currentDir);
		await Promise.all(
			files.map(async (file) => {
				const filePath = path.join(currentDir, file);
				const stat = await fs.stat(filePath);
				if (stat.isDirectory()) {
					if (file === 'node_modules') return;
					tree[file] = await buildTree(filePath);
				} else {
					tree[file] = null;
				}
			})
		);
	}

	return tree;
}

function convertToDirectoryStructure(data, name = 'user') {
	const directory = {
		name,
		type: 'folder',
		children: {},
	};

	for (const [key, value] of Object.entries(data)) {
		if (value === null) {
			directory.children[key] = { name: key, type: 'file' };
		} else {
			directory.children[key] = convertToDirectoryStructure(value, key);
		}
	}

	return directory;
}

export { generateFileTree };
