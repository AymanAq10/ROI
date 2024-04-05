import { Routes, Route }        from 'react-router-dom';
import { useSelector }          from 'react-redux';

import './App.css';
// Welcome Section START
import WelcomeP                 from './Component/welcomePage/WelcomeP';
import WelcomePProfileSettings  from './Component/welcomePage/WelcomeP_Profile_settings';
import WelcomePProfilePage      from './Component/welcomePage/WelcomeP_Profile_page';
import UpdatePost               from './Component/Posts/UpdatePost';
// Welcome Section END
import NotFound                 from './Component/NotFound'
import CreatePost               from "./Component/Posts/CreatePost";
import Postdetails              from "./Component/Posts/Postdetails";
import Update                   from './Component/Posts/Update';
import ProfilePost              from './Component/Posts/ProfilePage';

function Routers() {
    const Logged = useSelector(state=>state.logged)
    const globalStateTheme = useSelector(state => state.theme)

    return (
                <div id={globalStateTheme ? 'dark' : 'light'}>

                    <div className='body'>
                        <Routes>

                            <Route path='/'                 element={<WelcomeP />} />
                            <Route path='/Details/:id'      element={<Postdetails />} />
                            <Route path='/Update/:id'       element={<Update />} />
                            <Route path='/Post/Profile/:id'  element={<ProfilePost/>}/> 
                           {/* ------------------Security------------------ */}
                           {Logged &&
                           <>
                                <Route path='/Create'           element={<CreatePost />} /> 
                                <Route path='/Settings/Tab=Your_ROI_Information/' element={<WelcomePProfileSettings />}/>
                                <Route path='/Profile/Tab=Your_ROI_Information/'  element={<WelcomePProfilePage />}/>
                                <Route path='/Post/ModifyPost/:id'                element={<UpdatePost />} />
                            </>
                           } 
                            {/* ---------------Not Found Page-------------------- */}
                           <Route path='*'                 element={<NotFound/>}/>
                        </Routes>
                    </div>

                </div>


    )
}
export default Routers;
