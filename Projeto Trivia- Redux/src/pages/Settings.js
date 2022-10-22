import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import {
  getApiThunkToken,
  responseCategoriesAction,
  timerStatusAction,
  userDataAction,
  getApiQuestions,
} from '../redux/action';

const NUMBER_SORT = -1;
const DIFFICULTIES = ['Aleatory', 'easy', 'medium', 'hard'];
const TYPES_QUESTIONS = ['Aleatory', 'Multiple choice', 'True / False'];
const ALEATORY_CATEGORY = {
  name: 'Aleatory',
};
class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      category: 'Aleatory',
      difficulty: 'Aleatory',
      type: 'Aleatory',
    };
  }

  componentDidMount() {
    const { thunkCategories } = this.props;

    thunkCategories();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit = async () => {
    const {
      dispatchToken,
      userData,
      history,
      timerStatus,
      name,
      gravatarEmail,
      getQuestions,
      categories,
    } = this.props;

    const code = md5(gravatarEmail).toString();
    const profilePic = `https://www.gravatar.com/avatar/${code}`;

    userData({ name, gravatarEmail, profilePic });
    await dispatchToken();
    if (!localStorage.getItem('ranking')) {
      localStorage
        .setItem('ranking', JSON.stringify([]));
    }
    await getQuestions(this.state, categories);
    history.push('/game');
    await timerStatus(true);
  }

  render() {
    const { categories, loadingResponse, loading } = this.props;
    const { category, difficulty, type } = this.state;
    categories.push(ALEATORY_CATEGORY);
    return (
      <div>
        {
          loadingResponse
            ? (<h1>Carregando...</h1>)
            : (
              <div>
                <header>
                  <h1
                    data-testid="settings-title"
                  >
                    Settings
                  </h1>
                </header>
                <form>
                  <label
                    htmlFor="select-categories"
                  >
                    Category:
                    <select
                      id="select-categories"
                      name="category"
                      value={ category }
                      onChange={ (event) => this.handleChange(event) }
                    >
                      {loading
                        ? <option>Carregando...</option>
                        : categories.sort((a, b) => {
                          if (a.name < b.name) {
                            return NUMBER_SORT;
                          }
                          if (a.name > b.name) {
                            return 1;
                          }
                          return 0;
                        }).map((categoria) => (
                          <option key={ categoria.id }>{categoria.name}</option>
                        ))}
                    </select>
                  </label>
                  <label
                    htmlFor="select-difficult"
                  >

                    Difficulty:
                    <select
                      id="select-difficult"
                      name="difficulty"
                      value={ difficulty }
                      onChange={ (event) => this.handleChange(event) }
                    >
                      {DIFFICULTIES.map((dificuldade) => (
                        <option
                          key={ dificuldade }
                        >
                          {dificuldade}

                        </option>
                      ))}
                    </select>
                  </label>
                  <label
                    htmlFor="select-type"
                  >
                    {' '}
                    Type:
                    <select
                      id="select-type"
                      name="type"
                      value={ type }
                      onChange={ (event) => this.handleChange(event) }
                    >
                      {TYPES_QUESTIONS.map((tipo) => (
                        <option
                          key={ tipo }
                        >
                          {tipo}

                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    className="redirect-button"
                    onClick={ () => this.handleSubmit() }
                    data-testid="btn-play"
                  >

                    Play

                  </button>
                </form>
              </div>
            )
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  thunkCategories: () => dispatch(responseCategoriesAction()),
  dispatchToken: () => dispatch(getApiThunkToken()),
  userData: (userInfo) => dispatch(userDataAction(userInfo)),
  timerStatus: (bool) => dispatch(timerStatusAction(bool)),
  getQuestions: (payload, categories) => dispatch(getApiQuestions(payload, categories)),
});

const mapStateToProps = (state) => ({
  categories: state.settings.categories,
  loading: state.settings.loading,
  name: state.settings.name,
  gravatarEmail: state.settings.gravatarEmail,
  loadingResponse: state.questions.loadingResponseLoading,
});

Settings.propTypes = {
  thunkCategories: PropTypes.func,
  categories: PropTypes.arrayOf(),
  loading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
