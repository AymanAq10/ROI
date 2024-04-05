
let i = localStorage.getItem('state')



const initialstate = {
    logged:i?i:false,
    theme:localStorage.getItem('mode') !== 'dark' ? false : true
}
const Login_reducer = (state=initialstate,action)=>{
    switch(action.type){
        case "Login":return{
            ...state,
            logged:true
        };
        
        
        case 'themeSwitcher':
            return {...state, theme: !state.theme}

        default:
            return state;
    }
    
}
export default Login_reducer;