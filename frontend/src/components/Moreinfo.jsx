import { useEffect, useState } from "react";
import "../style/info.css";
import { useLocation, useNavigate } from "react-router-dom";

function Moreinfo(){

    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    const [quote,setQuote] = useState("");

    const quotes = [
        "Buy when others are fearful.",
        "The trend is your friend.",
        "Cut losses quickly, let winners run.",
        "Markets reward patience.",
        "Price is truth.",
        "Risk management is everything.",
        "Trade the chart, not the news."
    ];

    useEffect(()=>{
        console.log(data);

        const interval = setInterval(()=>{
            const random = Math.floor(Math.random()*quotes.length);
            setQuote(quotes[random]);
        },3000);

        return ()=> clearInterval(interval);

    },[data]);

    const getdata = ()=>{
        navigate("/history/",{state:data.STOCK_NAME});
    }

    const home = ()=>{
        navigate("/home/");
    }

    const back = ()=>{
        navigate("/fetch/");
    }

    return(
        <div className="info">

            <h1>STOCK INFORMATION</h1>

            <p>STOCK NAME <span>{data.STOCK_NAME}</span></p>
            <p>PRICE <span>{data.PRICE}</span></p>
            <p>DECISION <span>{data.DECISON}</span></p>

            <div className="quote_box">
                <p className="quote">"{quote}"</p>
            </div>

            <div className="btn">
                <button onClick={getdata}>PREVIOUS HISTORY</button>
                <button onClick={back}>BACK</button>
                <button onClick={home}>HOME</button>
            </div>

        </div>
    );
}

export default Moreinfo;