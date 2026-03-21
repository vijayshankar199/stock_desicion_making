
import "../style/fetch.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Fetch(){
    let navigate = useNavigate();
    let dataref = useRef();
    let[history,setHistory] = useState([]);
     useEffect(() => {
        axios.get("http://127.0.0.1:8000/stock/history/").then((resp) => {
                let last = resp.data.slice(-5).reverse();
                setHistory(last);
            })
    }, []);
    let getdata=()=>{
    let url1 = "http://127.0.0.1:8000/stock/stock/"+dataref.current.value+"/";
    axios.get(url1).then((resp)=>{
        console.log(resp.data);
        navigate("/info/",{state:resp.data})
    }).catch((err)=>{
        alert("STOCK NOT FOUND OR ADD .NS CHECK IT ONCE BOSS...!")
        console.log(err);

    });
    dataref.current.value="";
}
    return(
        <div className="fetch">
            <label htmlFor="">ENTER YOUR STOCK HERE:
                <input ref={dataref} type="text"/>
            </label>
            <button onClick={getdata}>CHECK</button>
        <div className="previous_data">
    <h3>Recent Searches</h3>

    {history.length === 0 ? (
        <p>No History Available</p>
    ) : (
        <table border="1" cellPadding="10">
            <thead>
                <tr>
                    <th>STOCK_NAME</th>
                    <th>PRICE</th>
                    <th>DECISION</th>
                </tr>
            </thead>
            <tbody>
                {history.map((i) => {
                    return (
                        <tr key={i.id}>
                            <td>{i.name}</td>
                            <td>{i.price}</td>
                            <td>{i.signal}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )}
</div>
        </div>
    );
}
export default Fetch;