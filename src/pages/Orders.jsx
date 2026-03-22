import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../components/context/user";
import "../styles/OrderStyle.css"
import OrderDetails from "../components/OrderDetails";


export default function Orders()
{   //make a fetch request with GET method, select all orders display em here!
    //JSON.parse on oder.items!!! -no?
    const {user, setUser} = useContext(UserContext);

    const [orders, setOrders] = React.useState([]);

    async function requestOrders() {
        try{
          const res = await fetch('http://localhost/react-commerce/orders.php', {
              method: 'GET'

            });
            setOrders(await res.json());
        
        } catch (error) {
            console.error(error.message);
          }
    }

    React.useEffect(() => {
    requestOrders();
  }, []);
  console.log(orders)
    return(
        <>
        <Navbar user={user} setUser={setUser} />
         <div id="oder-list" /*className="main-content"*/>
         <h1>List of all orders</h1>
          
                {orders.map((order, index) => {
                    const parsedItems = JSON.parse(order.items);
                    return(
                    <div key={index} className="single-order-tile">

                   {<OrderDetails parsedItems={parsedItems} order={order}/> }

                       
                        {/*  <div>{order.user_id}</div> <div>{order.items}</div>*/}
                    </div>
                    
                    )})}
            
         </div>
        </>
       
    )
}