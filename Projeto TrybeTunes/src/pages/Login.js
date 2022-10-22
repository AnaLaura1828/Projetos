import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Mensagem from './Mensagem';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      btnDisabled: true,
      // desabilitado
      loading: false,
      redirecionar: false,
    };
  }

  buttonApi = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ loading: true }); // mudo para true quando carregar
    await createUser({ name });
    this.setState({ loading: false, redirecionar: true });
  }

  change = (event) => {
    // console.log(event.target.value);
    this.valideForm(event);
    this.setState({ name: event.target.value });
  }

   valideForm = (event) => {
     const valor = event.target.value;
     const max = 3;
     if (valor.length >= max) {
       this.setState({
         btnDisabled: false,
       });
     } else {
       this.setState({
         btnDisabled: true,
       });
     }
   }

   render() {
     const { btnDisabled, loading, redirecionar } = this.state;
     return (
       <div data-testid="page-login">
         {/* <Header /> */}
         { loading && <Mensagem />}
         {redirecionar && <Redirect to="/search" />}
         <form>
           <label htmlFor="name">
             Nome
             <input
               type="text"
               name="name"
               onChange={ this.change }
               data-testid="login-name-input"
               placeholder="userName"
             />
           </label>
           <button
             type="button"
             data-testid="login-submit-button"
             value="name"
             onClick={ this.buttonApi }
             disabled={ btnDisabled } // se for false o botao fica habilitado
           >
             Entrar
           </button>
         </form>
       </div>
     );
   }
}

export default Login;

// ajuda do mauricio
