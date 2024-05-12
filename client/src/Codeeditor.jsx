import { Editor } from '@monaco-editor/react';

function Codeeditor({ code }) {
	return (
		<Editor
			height='56.25vh'
			defaultLanguage='javascript'
			defaultValue='// some comment'
			value={code.content}
			theme='vs-dark'
		/>
	);
}

export default Codeeditor;
