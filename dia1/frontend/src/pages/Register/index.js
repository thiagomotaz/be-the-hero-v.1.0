import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom'; //useHistory para 
import { FiArrowLeft } from 'react-icons/fi'; 
import api from '../../services/api';

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister (e){ //disparada quando o formulário recebe ação de submit
        
        e.preventDefault(); //prevenir a página de atualizar(comportamento padrão)

        //buscar dados dos inputs e enviar pra api  //console.log(name, whatsapp);
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try{
            const response = await api.post('ongs', data); //axios ja envia em json
            alert("Seu id de acesso: " + response.data.id);
            history.push('/'); //retornar pra rota raiz (sem recarregar)
        }
        catch(err){
            alert('Erro no cadastro' + err);
        }
        
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem casos abertos de sua ONG!</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da Ong" 
                    value={name}
                    onChange={e => setName(e.target.value)}/> {/*recebe e e depois atualiza a função com o valor do e*/}

                    <input type="email" placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />

                    <input placeholder="Whatsapp" 
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}/>

                    <div className="input-group">
                        <input placeholder="Cidade" 
                        value={city}
                        onChange={e => setCity(e.target.value)}/>

                        <input placeholder="UF"
                        value={uf}
                        onChange={e => setUf(e.target.value)} 
                        style={ {width: 80} }/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}