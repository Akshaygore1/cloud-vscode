import { ChevronDown, ChevronRight, Folder } from 'lucide-react';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const FileExplorer = ({ data, onSelectFile }) => {
	const [expandedFolders, setExpandedFolders] = useState([]);

	const toggleFolder = (folderName) => {
		if (expandedFolders.includes(folderName)) {
			setExpandedFolders(expandedFolders.filter((f) => f !== folderName));
		} else {
			setExpandedFolders([...expandedFolders, folderName]);
		}
	};

	const renderNode = (node, path) => {
		console.log('---', path);
		const fullPath = path ? `${path}/${node.name}` : node.name;
		const filePath = path ? `${path}/${node.name}` : node.name;
		const isFolder = node.type === 'folder';
		const isExpanded = expandedFolders.includes(fullPath);
		return (
			<div key={fullPath}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						cursor: isFolder ? 'pointer' : 'default',
						marginLeft: isFolder ? '0px' : '16px',
						color: 'white',
						padding: '8px',
						borderRadius: '4px',
						transition: 'background-color 0.3s ease',
					}}
					onClick={() =>
						isFolder ? toggleFolder(fullPath) : onSelectFile(filePath)
					}
				>
					{isFolder && (
						<div style={{ display: 'flex', alignItems: 'center' }}>
							{isExpanded ? (
								<ChevronDown width={16} height={16} />
							) : (
								<ChevronRight width={16} height={16} />
							)}
						</div>
					)}
					<span
						style={{
							fontSize: '16px',
							marginLeft: '4px',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						{isFolder ? (
							<Folder width={16} height={16} style={{ marginRight: '8px' }} />
						) : null}
						{node.name}
					</span>
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
		<div
			style={{
				height: '99vh',
				overflow: 'auto',
				backgroundColor: '#0E1117',
				maxWidth: '250px',
				minWidth: '250px',
			}}
		>
			<div style={{ padding: '10px', color: 'white' }}>File Explorer</div>
			<div>{renderNode(data)}</div>
		</div>
	);
};

export default FileExplorer;
