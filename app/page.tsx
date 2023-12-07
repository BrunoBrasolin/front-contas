'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
	const [percentageValue, setPercentageValue] = useState<number | ''>('');
	const [salary, setSalary] = useState<number | ''>('');
	const [selectedPerson, setSelectedPerson] = useState('');

	const handlePercentageSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			console.log(percentageValue);
			const response = await fetch('https://localhost:32770/api/conta?valor=123', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			console.log(response);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleUpdateSalarySubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:4430/api/save', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ value: salary, person: selectedPerson }),
			});

			console.log(response);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<main>
			<div className="max-w-md mx-auto mt-8">
				<form className="mb-8" onSubmit={handlePercentageSubmit}>
					<label className="block text-sm font-medium">
						Cálculo porcentagem:
						<input type="number" value={percentageValue} onChange={e => setPercentageValue(parseInt(e.target.value, 10) || '')} className="mt-1 p-2 border rounded-md w-full text-green-950" />
					</label>
					<button type="submit" className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-md">
						Submit
					</button>
				</form>

				<form onSubmit={handleUpdateSalarySubmit}>
					<label className="block text-sm font-medium">
						Atualizar salário:
						<input type="number" value={salary} onChange={e => setSalary(parseInt(e.target.value, 10) || '')} className="mt-1 p-2 border rounded-md w-full text-green-950" />
					</label>
					<label className="block mt-4 text-sm font-medium text-green-950">
						<select value={selectedPerson} onChange={e => setSelectedPerson(e.target.value)} className="mt-1 p-2 border rounded-md w-full">
							<option value="0">Leticia</option>
							<option value="1">Bruno</option>
						</select>
					</label>
					<button type="submit" className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md">
						Submit
					</button>
				</form>
			</div>
		</main>
	);
}
