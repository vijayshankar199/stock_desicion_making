import "../style/header.css";

function Header(){
    return(
        <div className="header">

            <div className="logo">
                <span className="rupee">₹</span> MarketPulse
            </div>

            <div className="market-ticker">
                <span className="up">NIFTY ▲ 22450 +0.42%</span>
                <span className="down">RELIANCE ▼ -0.28%</span>
                <span className="up">TCS ▲ +1.12%</span>
                <span className="up">INFY ▲ +0.66%</span>
            </div>

            <div className="market-icons">
                <span>$</span>
                <span>₹</span>
                <span>€</span>
                <span>₿</span>
            </div>

        </div>
    );
}

export default Header;