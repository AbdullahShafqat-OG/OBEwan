import { useState } from 'react';

function App() {
	const [name, setName] = useState('');
	const [label, setLabel] = useState('');
	const [statement, setStatement] = useState('');
    const [degree, setDegree] = useState('');

	async function createPlo(event) {
		event.preventDefault();

		const response = await fetch('http://localhost:3000/api/create/plo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				label,
				statement,
                degree,
			}),
		});

		const data = await response.json();

        console.log(data);
		if (response.ok) {
			window.location.href = "/dashboard/admin";
		}
	};

	return (
		<div>
			<h1>Create PLO</h1>
			<form onSubmit={createPlo}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<br />
				<input
					value={label}
					onChange={(e) => setLabel(e.target.value)}
					type="text"
					placeholder="Label"
				/>
				<br />
				<input
					value={statement}
					onChange={(e) => setStatement(e.target.value)}
					type="text"
					placeholder="Statement"
				/>
				<br />
                <input
					value={degree}
					onChange={(e) => setDegree(e.target.value)}
					type="text"
					placeholder="Degree"
				/>
				<br />
				<input type="submit" value="Create" />
			</form>
		</div>
	);
};

export default App;