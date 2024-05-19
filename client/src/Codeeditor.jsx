import { Editor } from '@monaco-editor/react';
import PropTypes from 'prop-types';

function Codeeditor({ code }) {
	console.log('CODE', code);
	return (
		<Editor
			height='56.25vh'
			defaultLanguage='javascript'
			defaultValue='// some comment'
			value={code.content}
			theme='vs-dark'
			language={code.language}
		/>
	);
}

Codeeditor.propTypes = {
	code: PropTypes.shape({
		content: PropTypes.string.isRequired,
		fileExtension: PropTypes.string.isRequired,
		language: PropTypes.string.isRequired,
	}).isRequired,
};

export default Codeeditor;
