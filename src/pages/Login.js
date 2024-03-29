import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { receiveUserInfo } from '../actions';
import '../styles/Login.css';

import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.validate = this.validate.bind(this);
    this.validateEmail = this.validateEmail.bind(this);

    this.state = {
      email: '',
      senha: '',
      loading: false,
      disableLoginButton: true,
      saved: false,
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  validate() {
    const { email, senha } = this.state;

    const minCharacters = 6;

    this.setState({
      disableLoginButton: !(email
        && this.validateEmail(email)
        && senha.length >= minCharacters
      ),
    });
  }

  validateEmail(email) {
    // Consultei essa forma de validação para o campo de e-mail no site abaixo:
    // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  login() {
    this.setState(
      { loading: true },
      () => {
        const { email } = this.state;
        const { enviaInfo } = this.props;

        enviaInfo(email);

        this.setState({
          loading: false,
          saved: true,
        });
      },
    );
  }

  render() {
    const {
      email, senha, loading, disableLoginButton, saved,
    } = this.state;

    return (
      <>
        { loading ? <Loading /> : (
          <main data-testid="page-login" className="page">
            <section className="login-section">
              <h1 className="title">TrybeWallet</h1>

              <div className="login-container">
                <h3 className="sub-title">Login</h3>

                <input
                  type="email"
                  name="email"
                  placeholder="e-mail"
                  autoComplete="off"
                  className="login-input"
                  data-testid="email-input"
                  value={ email }
                  onChange={ this.handleChange }
                />

                <input
                  type="password"
                  name="senha"
                  placeholder="senha"
                  className="login-input"
                  data-testid="password-input"
                  value={ senha }
                  onChange={ this.handleChange }
                />

                <button
                  type="button"
                  className="login-btn"
                  disabled={ disableLoginButton }
                  onClick={ this.login }
                >
                  Entrar
                </button>
              </div>
            </section>
          </main>
        )}
        { saved ? <Redirect to="/carteira" /> : '' }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  enviaInfo: (state) => dispatch(receiveUserInfo(state)),
});

Login.propTypes = {
  enviaInfo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
