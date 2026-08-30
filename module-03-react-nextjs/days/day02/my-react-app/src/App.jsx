import Card from "./components/Card"
import './App.css'
import Dish from "./components/Dish"

const menu =[
  { id: 1, name: "dorowet", price: 2400, category: "main-dish", isSpicy: true },
  {id: 2, name: "tibs", price: 1400, category: "side-dish", isSpicy: true },
  { id: 3, name: "shiro", price: 400, category: "main-dish", isSpicy: false },
  {id: 4, name: "firfer", price: 400, category: "side-dish", isSpicy: true },
  {id: 5, name: "burger", price: 400, category: "main-dish", isSpicy: false }
]

let mainCat =menu.filter((item =>  item.category === "main-dish"))
function App() {
 let sideCat =menu.filter((item =>  item.category === "side-dish"))
 let bevCat = menu.filter((item => item.category === "bevCat"))
  return (
    <>
    <h1>My first react app</h1>
     <p>this is my first react</p>
     <h2>Main course</h2>
    <div className = "card-container">
     
     {mainCat.map((item)=> (
      <Dish key= {item.id}  {...item}/>
     ))}
     </div>
     <h2>side course</h2>
    <div className = "card-container">
     
     {sideCat.map((item)=> (
      <Dish key= {item.id}  {...item}/>
     ))}
     </div>

     <h2>beverage</h2>
    <div className = "card-container">
     {bevCat.length === 0 ? (
      <p>No beverage avaliable at the moment.</p>
     ) : (
      bevCat.map((item)=> <Dish key= {item.id}  {...item}/> )
     )}
     </div>
     
     <Card>
      <p>Abel alemayehu</p>
      <p>contact: AA</p>
     </Card>
    </>
  );
}

export default App