import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';
import { formatPrice } from '../../util/format';

export default function Profile() {
	const ongId = localStorage.getItem('ongId');
	const ongName = localStorage.getItem('ongName');
	const [incidents, setIncidents] = useState([]);
	const history = useHistory();

	useEffect(() => {
		api
			.get('/profiles', {
				headers: { Authorization: ongId }
			})
			.then(res => {
				setIncidents(res.data);
			});
	}, [ongId]);

	async function handleDeleteIncident(id) {
		try {
			await api.delete(`incidents/${id}`, {
				headers: { Authorization: ongId }
			});

			setIncidents(incidents.filter(incident => incident.id !== id));
		} catch (error) {
			alert('');
		}
	}

	function handlelogout() {
		localStorage.clear();

		history.push('/');
	}

	return (
		<div className='profile-container'>
			<header>
				<img src={logoImg} alt='Be The Hero' />
				<span>Bem vinda, {ongName}</span>

				<Link className='button' to='/incident/new'>
					Cadastrar novo caso
				</Link>
				<button type='button' onClick={handlelogout} aria-label='logout'>
					<FiPower size={18} color='#02041' />
				</button>
			</header>

			<h1>Casos cadastrados</h1>

			<ul>
				{incidents.map(incident => (
					<li key={incident.id}>
						<strong>CASO: </strong>
						<p>{incident.title}</p>

						<strong>DESCRIÇÃO: </strong>
						<p>{incident.description}</p>

						<strong>VALOR:</strong>
						<p>{formatPrice(incident.value)}</p>

						<button
							type='button'
							onClick={() => handleDeleteIncident(incident.id)}
						>
							<FiTrash2 size={20} color='#a8a8b3' />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
