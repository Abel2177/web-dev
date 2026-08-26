import Header from "./components/Header"
import './App.css'
import Dish from "./components/Dish"

const menu =[
  {name: "dorowet", price: 2400},
   {name: "tibs", price: 1400},
    {name: "kekel", price: 400}

]
function App() {
  
  return (
    <>
    <Header/>
    <h1>My first react app</h1>
     <p>this is my first react</p>
    <div className = "card-container">
     {menu.map((d, index)=> (
      <Dish key= {index} name= {d.name} price={d.price} />
     ))}
     </div>
    </>
  )
}

export default App
