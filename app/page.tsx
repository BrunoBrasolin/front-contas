'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
	const [percentageValue, setPercentageValue] = useState<number | ''>('');
	const [resultPercentage, setResultPercentage] = useState<{ Leticia: number; Bruno: number } | null>(null);
	const [salary, setSalary] = useState<number | ''>('');
	const [selectedPerson, setSelectedPerson] = useState('');

	const handlePercentageSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (percentageValue == '') {
			alert('Favor insira um valor válido!');
			return;
		}

		try {
			const response = await fetch(`http://168.75.82.21:81/api/conta?valor=${percentageValue}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			let data = await response.json();

			setResultPercentage(data);
		} catch (error) {
			alert(`Erro, fazor entrar em contato com o suporte: ${error}`);
		}
	};

	const handleClear = () => {
		setResultPercentage(null);
		setPercentageValue('');
	};

	return (
		<main>
			<div className="max-w-md mx-auto mt-8">
				<form className="mb-6" onSubmit={handlePercentageSubmit}>
					<label className="block text-sm font-medium">
						Cálculo porcentagem:
						<input type="number" value={percentageValue} onChange={e => setPercentageValue(parseInt(e.target.value, 10) || '')} className="mt-1 p-2 border rounded-md w-full text-green-950" />
					</label>

					<div className="flex justify-between mt-5">
						<button type="submit" className="px-4 py-2 rounded-md bg-teal-500 text-white">
							Calcular
						</button>
						<button type="button" onClick={handleClear} className="ml-2 px-4 py-2 border rounded-md text-teal-500 border-teal-500">
							Limpar
						</button>
					</div>
				</form>

				<div className="mb-12">
					<h2>Valor de cada um:</h2>
					<pre>Letícia: R${resultPercentage?.Leticia || '0,00'}</pre>
					<pre>Bruno: R${resultPercentage?.Bruno || '0,00'}</pre>
				</div>
			</div>
		</main>
	);
}
