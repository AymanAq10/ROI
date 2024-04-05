import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { legacy_createStore as createStore} from 'redux'
import { Provider } from 'react-redux';
// import { CookiesProvider } from 'react-cookie';

// import App from './App';
// import App from '../src/Components/App';
// import Routers from './Components/Routers';
// import './index.css';
// import Routers from './Components/Routers';
// import App from './Components/App';
// import 'bootstrap/dist/js/bootstrap.js';    
import Routers from './Components/Routers';
import Login_reducer from './Components/redux_setting/reducer';
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(Login_reducer)
root.render(
    // <App/>
    // <CookiesProvider>
        <BrowserRouter>
            <Provider store={store}>
                <Routers />
            </Provider>
        </BrowserRouter>
    /* </CookiesProvider> */
);

