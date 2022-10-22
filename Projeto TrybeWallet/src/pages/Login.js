import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { actionUser } from '../redux/actions';
import '../App.css';

class Login extends React.Component {
  state ={
    email: '',
    habilitar: true,
  }

   valiSenha = (event) => {
     const { value } = event.target;
     const { email } = this.state;
     const limit = 6;
     const re = /\S+@\S+\.\S+/;
     console.log(re.test(email));
     if (value.length >= limit && email.match(re)) {
       this.setState({
         habilitar: false,
       });
     } else {
       this.setState({
         habilitar: true,
       });
     }
   }

   valiEmail = (event) => {
     const { value } = event.target;
     this.setState({
       email: value,
     });
   }

   render() {
     const { habilitar, email } = this.state;
     const { loginDispatch } = this.props;
     return (
       <div className="div-login">
         <form>
           <h2 className="h2">Faça seu Login</h2>
           <label className="name-email" htmlFor="inputs">
             <input
               //  id="email-input"
               className="input-email"
               data-testid="email-input"
               placeholder="Digite seu email"
               name="email"
               type="email"
               onChange={ this.valiEmail }
             />
           </label>
           <label className="name-senha" htmlFor="inputs">
             <input
               className="input-senha"
               data-testid="password-input"
               //  id="senha-input"
               placeholder="Digite sua senha"
               name="senha"
               type="text"
               onChange={ this.valiSenha }
             />
           </label>
           <Link to="/carteira">
             <button
               className="btn-entrar"
               type="button"
               disabled={ habilitar }
               onClick={ () => loginDispatch(email) }
             >
               Entrar
             </button>
           </Link>
         </form>
       </div>
     );
   }
}

const mapDispatchToProps = (dispatch) => ({
  // ele faz o email ir la p redux
  loginDispatch: (email) => dispatch(actionUser(email)),
});

Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
