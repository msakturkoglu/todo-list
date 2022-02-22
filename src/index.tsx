import { render } from "react-dom";
import {Provider} from 'react-redux';
import {store} from './redux/store';

import App from "./App";

const TodoApp = () => <Provider store={store}><App /></Provider>

const rootElement = document.getElementById("root");
render(<TodoApp />, rootElement);
