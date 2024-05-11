import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const FileExplorer = ({ data }) => {
	const [expandedFolders, setExpandedFolders] = useState([]);

	const toggleFolder = (folderName) => {
		if (expandedFolders.includes(folderName)) {
			setExpandedFolders(expandedFolders.filter((f) => f !== folderName));
		} else {
			setExpandedFolders([...expandedFolders, folderName]);
		}
	};

	const renderNode = (node, path) => {
		const fullPath = path ? `${path}.${node.name}` : node.name;
		const isFolder = node.type === 'folder';
		const isExpanded = expandedFolders.includes(fullPath);

		return (
			<div key={fullPath}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						cursor: isFolder ? 'pointer' : 'default',
						padding: '8px',
						marginLeft: isFolder ? '0px' : '16px',
						backgroundColor: isFolder ? '#f0f0f0' : 'transparent',
						border: '1px solid #ccc',
						borderRadius: '4px',
						marginBottom: '4px',
					}}
					onClick={() => isFolder && toggleFolder(fullPath)}
				>
					{isFolder ? (
						<span
							style={{
								display: 'inline-block',
								width: '8px',
								height: '8px',
								marginRight: '8px',
								border: 'solid',
								borderWidth: '0 2px 2px 0',
								transform: isExpanded ? 'rotate(-135deg)' : 'rotate(-45deg)',
								borderColor: '#555',
								transition: 'transform 0.2s',
							}}
						></span>
					) : (
						<span
							style={{
								display: 'inline-block',
								width: '8px',
								height: '8px',
								marginRight: '8px',
								border: 'solid',
								borderWidth: '2px 2px 0 0',
								transform: 'rotate(45deg)',
								borderColor: '#555',
								transition: 'transform 0.2s',
							}}
						></span>
					)}
					<span>{node.name}</span>
				</div>
				{isFolder && isExpanded && (
					<div style={{ marginLeft: '16px' }}>
						{Object.values(node.children).map((childNode) =>
							renderNode(childNode, fullPath)
						)}
					</div>
				)}
			</div>
		);
	};

	return (
		<div>
			<div
				style={{
					backgroundColor: '#ffffff',
					borderRadius: '8px',
					padding: '8px',
					boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
				}}
			>
				{renderNode(data)}
			</div>
		</div>
	);
};

export default FileExplorer;
