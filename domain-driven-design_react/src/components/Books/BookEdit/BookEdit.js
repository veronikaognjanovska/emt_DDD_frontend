import React from 'react';
import {Link, useHistory} from 'react-router-dom';

const BookEdit = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        bookTitle: "",
        bookAuthor: "",
        bookQuantity: -1,
        amount: -1,
        currency: -1
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const bookTitle = formData.bookTitle !== "" ? formData.bookTitle : props.book.bookTitle;
        const bookAuthor = formData.bookAuthor !== "" ? formData.bookAuthor : props.book.bookAuthor;
        const bookQuantity = formData.bookQuantity !== -1 ? formData.bookQuantity : props.book.bookQuantity;
        const amount = formData.amount !== -1 ? formData.amount : props.book.bookPrice.amount;
        const currency = formData.currency !== -1 ? formData.currency : props.book.bookPrice.currency;
        props.onEditBook(props.book.id.id, bookTitle, bookAuthor, bookQuantity, amount, currency);
        history.push("/books");
    }

    return (
        <div className="row book-edit">
            <div className={"button-left"}>
                <Link className={"btn btn-outline-primary"} to={"/books"}>Back</Link>
            </div>
            <div className={"col-sm-12 m-4"}>
                <h1>Edit Book</h1>
            </div>
            <div className={"col-sm-12"}>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="bookTitle">Book Title</label>
                        <input type="text"
                               className="form-control"
                               id="bookTitle"
                               name="bookTitle"
                               placeholder={props.book?.bookTitle}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bookAuthor">Book Author</label>
                        <input type="text"
                               className="form-control"
                               id="bookAuthor"
                               name="bookAuthor"
                               placeholder={props.book?.bookAuthor}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bookQuantity">Book Quantity</label>
                        <input type="number"
                               className="form-control"
                               id="bookQuantity"
                               name="bookQuantity"
                               placeholder={props.book?.bookQuantity}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Book Price</label>
                        <input type="number"
                               className="form-control"
                               id="amount"
                               name="amount"
                               placeholder={props.book?.bookPrice?.amount}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Currency</label>
                        <select name="currency" id="currency" className="form-control" onChange={handleChange}
                                defaultValue={props.book?.bookPrice?.currency}>
                            <option key={'EUR'} value={'EUR'} selected={props.book.bookPrice?.currency}>{'EUR'}</option>
                            <option key={'USD'} value={'USD'} selected={props.book.bookPrice?.currency}>{'USD'}</option>
                            <option key={'MKD'} value={'MKD'} selected={props.book.bookPrice?.currency}>{'MKD'}</option>
                        </select>
                    </div>
                    <button id="submit" type="submit" className={"btn btn-primary float-right"}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookEdit;
