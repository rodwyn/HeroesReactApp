import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui/components"
import { HeroPage, SearchPage, DCPage, MarvelPage } from "../pages"

export const HeroesRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="marvel" element={<MarvelPage />}></Route>
          <Route path="dc" element={<DCPage />}></Route>
          <Route path="search" element={<SearchPage />}></Route>
          <Route path="hero/:id" element={<HeroPage />}></Route>
          

          <Route path="/" element={<Navigate to="/marvel" />} />
        </Routes>
      </div>
    </>
  )
}
