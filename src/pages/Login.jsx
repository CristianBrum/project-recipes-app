import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';
import cibspacex from '../images/cib-spacex.png';

function Login() {
  const [user, setUser] = useState(['']);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  const history = useHistory();

  /* aqui faço a minha validação de email usando regex */
  function handleEmail(e) {
    const Email = e;
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(Email);
    setUser(Email);
    return setEmail(regex);
  }

  useEffect(() => {
    alert('Visualize em 360x640 ou no celular para uma melhor experiência! Email: test@gmail.com senha: 1234567');
  }, []);

  /* aqui faço a minha validação do tamanho da senha */
  function handlePassword(e) {
    const Password = e;
    const minLength = 6;
    let validPass = false;
    if (Password.length > minLength) {
      validPass = true;
    }
    return setPassword(validPass);
  }
  /* aqui salvo o token no local store */
  function setLocalStorage() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user }));
  }

  function loginToApp(target) {
    setUser(target.value);
    setLocalStorage();
    history.push('/comidas');
  }

  return (
    <div className="container-login">
      <div className="name-project">
      <h1>Recipe</h1>
      <img src={cibspacex} alt="x"></img>
      </div>
      <section className="btn-login">
        <input
          className="email"
          type="email"
          data-testid="email-input"
          placeholder="Digite seu Email"
          onChange={ ({ target }) => handleEmail(target.value) }
        />
        <input
          className="password"
          type="password"
          data-testid="password-input"
          placeholder="Digite sua Senha"
          onChange={ ({ target }) => handlePassword(target.value) }
        />
        <button
          className="login"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !email + !password }
          value={ user }
          onClick={ ({ target }) => loginToApp(target) }
        >
          Entrar
        </button>
      </section>
    </div>
  );
}
export default Login;
