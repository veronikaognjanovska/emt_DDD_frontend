import React from 'react';
import {Link} from 'react-router-dom';
import UserService from "../../../Service/UserService";

const BookComponent = (props) => {

    let username = UserService.getLoggedInUser();

    return (
        <tr>
            <td>{props.term.id.id}</td>
            <td>{props.term.bookTitle}</td>
            <td>{props.term.bookAuthor}</td>
            <td>{props.term.bookQuantity}</td>
            <td>{props.term.bookPrice.amount + " " + props.term.bookPrice.currency}</td>
            <td className={"text-right actions"}>
                <Link className={"btn btn-outline-warning ml-2 view-btn"}
                      onClick={() => props.onView(props.term.id.id)}
                      to={`/books/view/${props.term.id.id}`}>
                    View
                </Link>
                {
                    username !== undefined &&
                    <Link className={"btn btn-outline-info ml-2 edit-btn"}
                          onClick={() => props.onEdit(props.term.id.id)}
                          to={`/books/edit/${props.term.id.id}`}>
                        Edit
                    </Link>
                }
                {
                    username !== undefined &&
                    <a title={"Delete"} className={"btn btn-outline-danger ml-2"}
                       onClick={() => props.onDeleteBook(props.term.id.id)}>
                        Delete
                    </a>
                }
            </td>
        </tr>
    )
}

export default BookComponent;
