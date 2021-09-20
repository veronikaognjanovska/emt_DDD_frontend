import React from 'react';
import {Link} from 'react-router-dom';

const OrderComponent = (props) => {
    return (
        <tr>
            <td>{props.term.id.id}</td>
            <td>{props.term.orderedOnDate}</td>
            <td>{props.term.orderState}</td>
            <td>{props.term.currency}</td>
            <td className={"text-right actions"}>
                <Link className={"btn btn-outline-warning ml-2 view-btn"}
                      onClick={() => props.onView(props.term.id.id)}
                      to={`/orders/view/${props.term.id.id}`}>
                    View
                </Link>
            </td>
        </tr>
    )
}

export default OrderComponent;
