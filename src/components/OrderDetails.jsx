import React from "react";

export default function OrderDetails(props)
{
      const [detailsOpen, setDetailsOpen] = React.useState(false);
    return(
        <>

        <div className="order-main-part" > 
            <div><strong>Order ID: </strong>{props.order.id}</div>
            <div><strong>Status:  </strong>{props.order.status}</div>
            <div><strong>Date: </strong>{props.order.date}</div>
            <div><strong>Email: </strong>{props.order.email}</div>
            <button onClick={()=>setDetailsOpen(prevState => !prevState)}> {detailsOpen ? "Close " : "Open " } Details </button>
        </div>
             {detailsOpen && 
            <>
        <div className="shipping-payment-info">
            <div><strong>Adress:</strong> {props.order.address} </div>
            <div><strong>City:</strong> {props.order.city} </div>
            <div><strong>Zip Code:</strong> {props.order.zipCode} </div>
            <div><strong>Fullname:</strong> {props.order.fullName} </div>
            <div><strong>Payment Method:</strong> {props.order.paymentMethod} </div>
        </div>

        <div className="order-items-list-container">
            <h4>Items in this order:</h4>
            <ol className="order-items-list">
                {props.parsedItems.map((item) => (
                    <li key={item.id}>
                    Product ID: {item.id} — Quantity: {item.quantity}
                    </li>
                ))}
            </ol>
        </div>
        <div><strong>Total: </strong>{props.order.total}$</div>
        </>
            }
        </>
    )
}