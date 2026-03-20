import { Route, Routes } from "react-router"
import { Header } from "./components/Header/Header"
import { Home } from "./Pages/Home/Home"
import { Dish } from "./Pages/Dish/Dish"
import { AddDish } from "./Pages/Add-dish/AddDish"
import { Container } from "@mui/material"

function App() {
  
  return (
    <>
      <Header/>
      <Container style={{
        padding:'20px'
      }}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dish/:id" element={<Dish/>}/>
          <Route path="/dish/create" element={<AddDish/>}/>
      </Routes>
      </Container>
    </>
  )
}

export default App
