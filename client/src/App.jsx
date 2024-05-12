import { useEffect, useState } from 'react';
import Codeeditor from './Codeeditor';
import FileExplorer from './FileExpo';
// import XTerminal from "./Xterminal"
import Xterminalsocket from './Xterminalsocket';

// const directoryStructure = {
// 	root: {
// 		name: 'root',
// 		type: 'folder',
// 		children: {
// 			folder1: {
// 				name: 'folder1',
// 				type: 'folder',
// 				children: {
// 					folder2: {
// 						name: 'folder2',
// 						type: 'folder',
// 						children: {
// 							folder3: {
// 								name: 'folder3',
// 								type: 'folder',
// 								children: {
// 									'index.js': { name: 'index.js', type: 'file' },
// 									'index1.js': { name: 'index1.js', type: 'file' },
// 								},
// 							},
// 						},
// 					},
// 					'u.js': { name: 'u.js', type: 'file' },
// 				},
// 			},
// 			'index.js': { name: 'index.js', type: 'file' },
// 		},
// 	},
// };

function App() {
	const [directoryStructure, setDirectoryStructure] = useState({});
	const [code, setCode] = useState('');

	useEffect(() => {
		async function fetchData() {
			const res = await fetch('http://localhost:3000/files');
			const data = await res.json();
			setDirectoryStructure(data);
		}

		fetchData();
	}, []);

	function fetchCode(path) {
		fetch(`http://localhost:3000/files/content?path=${path}`)
			.then((res) => res.json())
			.then((data) => setCode(data));
	}

	function onSelectFile(path) {
		console.log(path);
		fetchCode(path);
	}
	console.log('code', code);
	return (
		<>
			{/* <XTerminal /> */}
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<div>
					<FileExplorer data={directoryStructure} onSelectFile={onSelectFile} />
				</div>
				<div
					style={{ display: 'flex', width: '100%', flexDirection: 'column' }}
				>
					<div>
						<Codeeditor code={code} />
					</div>
					<div>
						<Xterminalsocket />
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
