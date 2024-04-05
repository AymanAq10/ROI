

import Home from "./Component/Home";
// import Footer from "./Component/Footer";
import Header from "./Component/Header"
import './App.css';




const App = () => {
    
    return (
            <div className="App" >
                <Header />
                <main className="container">
                    <Home />
                </main>
            </div>
    )
}
export default App;