import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewIncident() {
	const ongId = localStorage.getItem('ongId');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [value, setValue] = useState('');
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		const data = {
			title,
			description,
			value
		};

		try {
			await api.post('/incidents', data, {
				headers: { Authorization: ongId }
			});

			history.push('/profile');
		} catch (error) {
			alert('Erro no cadastro, tente novamente.');
		}
	}

	return (
		<div className='new-incident-container'>
			<div className='content'>
				<section>
					<img src={logoImg} alt='Be The Hero' />

					<h1>Cadastro novo caso</h1>
					<p>
						Descreva o caso detalhadamente para encontrar um herói para resolver
						isso.
					</p>

					<Link className='back-link' to='/profile'>
						{' '}
						<FiArrowLeft size={16} color='#e02041' />
						Voltar para o início
					</Link>
				</section>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='Título do caso'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<textarea
						placeholder='Descrição'
						value={description}
						onChange={e => setDescription(e.target.value)}
					></textarea>
					<input
						type='text'
						placeholder='Valor em reais'
						value={value}
						onChange={e => setValue(e.target.value)}
					/>

					<button type='submit' className='button'>
						Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
}
