import React from 'react';

const ShoppingCartItemComponent = (props) => {
    return (
        <tr>
            <td>{props.term.bookId.id}</td>
            <td>{props.term.quantity}</td>
            <td>{props.term.orderItemPrice.amount + " " + props.term.orderItemPrice.currency}</td>
            <td className={"text-right actions"}>
                <a title={"Delete"} className={"btn btn-outline-danger ml-2"}
                   onClick={() => props.onRemoveItem(props.term.id.id)}>
                    Remove Item
                </a>
            </td>
        </tr>
    )
}

export default ShoppingCartItemComponent;
