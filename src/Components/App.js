

import Home from "./Component/Home";
// import Footer from "./Component/Footer";
import Header from "./Component/Header"
import './App.css';
import { SpeedInsights } from "@vercel/speed-insights/react"




const App = () => {
    
    return (
            <div className="App" >
                <Header />
                <main className="container">
                    <Home />
                    <SpeedInsights />
                </main>
            </div>
    )
}
export default App;