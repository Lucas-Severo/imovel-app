import { Outlet } from "react-router-dom";
import { Header } from "../header";


export function Layout(){
  return(
    <>
      <div className="bg-secondary-subtle">
        <Header/>
        <div data-testid="body" style={{ minHeight: 'calc(100vh - 130px)', height: 'calc(100vh - 130px)', overflowY: 'scroll', scrollbarWidth: 'none', paddingBottom: '20px' }}>
          <Outlet/>
        </div>
        <footer data-testid="footer" className="card-footer bg-black border-success" style={{ height: '50px' }}>
          <p data-testid="footer-text" className="text-white text-center pt-2">Imóvel APP</p>
        </footer>
      </div>
    </>
  )
}
