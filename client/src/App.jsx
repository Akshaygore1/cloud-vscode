import Codeeditor from './Codeeditor';
import FileExplorer from './FileExpo';
// import XTerminal from "./Xterminal"
import Xterminalsocket from './Xterminalsocket';

const directoryStructure = {
	root: {
		name: 'root',
		type: 'folder',
		children: {
			folder1: {
				name: 'Folder 1',
				type: 'folder',
				children: {
					file1: { name: 'File 1', type: 'file' },
					file2: { name: 'File 2', type: 'file' },
				},
			},
			folder2: {
				name: 'Folder 2',
				type: 'folder',
				children: {
					file3: { name: 'File 3', type: 'file' },
				},
			},
			file4: { name: 'File 4', type: 'file' },
		},
	},
};

function App() {
	return (
		<>
			{/* <XTerminal /> */}

			<div style={{ display: 'flex' }}>
				<FileExplorer data={directoryStructure.root} />
				<Codeeditor />
			</div>
			<div>
				<Xterminalsocket />
			</div>
		</>
	);
}

export default App;
