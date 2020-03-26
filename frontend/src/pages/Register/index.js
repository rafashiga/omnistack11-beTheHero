import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [whatsapp, setWhatsapp] = useState('');
	const [city, setCity] = useState('');
	const [uf, setUf] = useState('');

	const history = useHistory();

	async function handleRegister(e) {
		e.preventDefault();

		const data = {
			name,
			email,
			whatsapp,
			city,
			uf
		};

		try {
			const res = await api.post('/ongs', data);

			alert(`Seu ID de acesso: ${res.data.id}`);

			history.push('/');
		} catch (error) {
			alert('Erro no cadastro, tente novamente.');
		}
	}

	return (
		<div className='register-container'>
			<div className='content'>
				<section>
					<img src={logoImg} alt='Be The Hero' />

					<h1>Cadastro</h1>
					<p>
						Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
						os casos da sua ONG.
					</p>

					<Link className='back-link' to='/'>
						{' '}
						<FiArrowLeft size={16} color='#e02041' />
						Não tenho cadastro
					</Link>
				</section>
				<form onSubmit={handleRegister}>
					<input
						type='text'
						placeholder='Nome da ONG'
						onChange={e => setName(e.target.value)}
					/>
					<input
						type='email'
						placeholder='E-mail'
						onChange={e => setEmail(e.target.value)}
					/>
					<input
						type='text'
						placeholder='Whatsapp'
						onChange={e => setWhatsapp(e.target.value)}
					/>

					<div className='input-group'>
						<input
							type='text'
							placeholder='Cidade'
							onChange={e => setCity(e.target.value)}
						/>
						<input
							type='text'
							placeholder='UF'
							style={{ width: 80 }}
							onChange={e => setUf(e.target.value)}
						/>
					</div>

					<button type='submit' className='button'>
						Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
}
