import ReactDOM from 'react-dom';

import App from './components/App';
import './assets/bootstrap.min.css';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);