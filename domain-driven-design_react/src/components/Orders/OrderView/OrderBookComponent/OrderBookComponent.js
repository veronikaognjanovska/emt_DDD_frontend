import React from 'react';

const OrderBookComponent = (props) => {
    return (
        <tr>
            <td>{props.term.id.id}</td>
            <td>{props.term.orderItemPrice.amount + ' ' + props.term.orderItemPrice.currency}</td>
            <td>{props.term.quantity}</td>
            <td>{props.term.bookId.id}</td>
        </tr>
    )
}

export default OrderBookComponent;
