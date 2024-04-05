import './Home_page/login_signup/style.css'
import Home from "./Home_page/Home";
import LoginsignUp from "./Home_page/login_signup/login_Signup";
import Login from './Home_page/login_signup/SignUp';
import Signup from './Home_page/login_signup/Login';
import { Routes, Route, Link } from 'react-router-dom';
const App = (props)=>{

    return (
        <>
            <div>
                <Routes>
                    <Route path='/Home' element={<Home/>}/>
                    <Route path='/Signup' element={<LoginsignUp/>}/>
                    <Route path='/Login' element={<LoginsignUp/>}/>
                </Routes>
            </div>
        </>
    )
}
export default App;
