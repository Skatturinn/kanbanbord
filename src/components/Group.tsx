import React from 'react';

interface GroupProps {
	group: any;
}

function Group({ group }: GroupProps) {
	return (
		<div>
			<h3>{group.name}</h3>
			<p>Admin ID: {group.admin_id}</p>
		</div>
	);
}

export default Group;