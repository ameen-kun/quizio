import { useNavigate } from "react-router-dom"

export default function Navbar(){
    const nav=useNavigate();
    return(
        <div className="terminal-nav" onClick={e=>nav("/dashboard")}>
            <div>
                Dashboard
            </div>
        </div>
    )
}