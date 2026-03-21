import History from "./History";
import { Login } from "./Login";
import Home from "./Home";
import Moreinfo from "./Moreinfo";
import Chatbot from "./Chatbot";
import Fetch from "./Fetch";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "../style/Main_pg.css";

function Main_pg() {

    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="main">

            <Routes>
                <Route path="" element={<Login/>}></Route>
                <Route path="/home" element={<Home />} />
                <Route path="/history" element={<History />} />
                <Route path="/fetch" element={<Fetch />} />
                <Route path="/info" element={<Moreinfo />} />
            </Routes>

            {/* Chat button */}
            {!isChatOpen && (
                <button
                    className="chatbot-btn"
                    onClick={() => setIsChatOpen(true)}
                ></button>
            )}

            {/* Chatbot popup */}
            {isChatOpen && <Chatbot closeChat={() => setIsChatOpen(false)} />}

        </div>
    );
}

export default Main_pg;