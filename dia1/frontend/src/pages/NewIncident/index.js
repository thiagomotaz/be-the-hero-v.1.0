import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; 
import '../../services/api';
import api from '../../services/api';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');


    async function handleNewIncident(){
        const data = {
            title,
            description,
            value
        };

        try{
            await api.post('incidents', data, {
                headers: {
                    authorization: ongId
                }
            })
            history.push('/profile');
        }catch(err){
            alert('erro ao cadastrar casod');
        }

    }

    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="logo"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um parceiro.</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Voltar para home
                </Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input placeholder="Título do caso" 
                value={title}
                onChange={e => setTitle(e.target.value)}/>
                <textarea placeholder="Descrição" 
                value={description}
                onChange={e => setDescription(e.target.value)}/>
                <input placeholder="Valor em reais" 
                value={value}
                onChange={e => setValue(e.target.value)}/>
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    )

}