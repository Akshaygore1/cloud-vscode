import { Editor } from '@monaco-editor/react';

function Codeeditor() {
	return (
		<Editor
			height='52vh'
			defaultLanguage='javascript'
			defaultValue='// some comment'
			theme='vs-dark'
		/>
	);
}

export default Codeeditor;
