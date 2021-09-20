import React from 'react';
import {Link, useHistory} from 'react-router-dom';

const BookAdd = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: -1,
        author: -1,
        availableCopies: 0
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const bookTitle = formData.bookTitle;
        const bookAuthor = formData.bookAuthor;
        const bookQuantity = formData.bookQuantity;
        const amount = formData.amount;
        const currency = formData.currency || 'EUR';
        console.log(bookTitle, bookAuthor, bookQuantity, amount, currency);
        props.addBook(bookTitle, bookAuthor, bookQuantity, amount, currency);
        history.push("/books");
    }

    return (
        <div className="row book-add">
            <div className={"button-left"}>
                <Link className={"btn btn-outline-primary"} to={"/books"}>Back</Link>
            </div>
            <div className={"col-sm-12 m-4"}>
                <h1>Add Book</h1>
            </div>
            <div className={"col-sm-12"}>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="bookTitle">Book Title</label>
                        <input type="text"
                               className="form-control"
                               id="bookTitle"
                               name="bookTitle"
                               required
                               placeholder="Enter book title"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bookAuthor">Book Author</label>
                        <input type="text"
                               className="form-control"
                               id="bookAuthor"
                               name="bookAuthor"
                               required
                               placeholder="Enter book author"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bookQuantity">Book Quantity</label>
                        <input type="number"
                               className="form-control"
                               id="bookQuantity"
                               name="bookQuantity"
                               required
                               placeholder="Enter book quantity"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bookQuantity">Book Price Amount</label>
                        <input type="number"
                               className="form-control"
                               id="amount"
                               name="amount"
                               required
                               placeholder="Enter book price amount"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Currency</label>
                        <select name="currency" id="currency" className="form-control" onChange={handleChange}>
                            <option key={'EUR'} value={'EUR'}>{'EUR'}</option>
                            <option key={'USD'} value={'USD'}>{'USD'}</option>
                            <option key={'MKD'} value={'MKD'}>{'MKD'}</option>
                        </select>
                    </div>
                    <button id="submit" type="submit" className={"btn btn-primary float-right"}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookAdd;
