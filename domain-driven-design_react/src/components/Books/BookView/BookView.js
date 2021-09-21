import React from 'react';
import {Link} from "react-router-dom";

class BookView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 5
        }
    }


    render() {
        return (
            <div className="row book-view">
                <div className={"button-right"}>
                    <a title={"Delete"} className={"btn btn-outline-success ml-2"}
                       onClick={() => this.props.onAddToShoppingCartBook(this.props.book)}>
                        Add To Shopping Cart
                    </a>
                </div>
                <div className={"button-left"}>
                    <Link className={"btn btn-outline-primary"} to={"/books"}>Back</Link>
                </div>
                <div className={"col-sm-12 m-4"}>
                    <h1>Book Info</h1>
                </div>
                <div className={"col-sm-12"}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="bookTitle">Book Title</label>
                            <input type="text"
                                   className="form-control"
                                   id="bookTitle"
                                   name="bookTitle"
                                   value={this.props.book?.bookTitle}
                                   disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Book Author</label>
                            <input type="text"
                                   className="form-control"
                                   id="bookAuthor"
                                   name="bookAuthor"
                                   value={this.props.book?.bookAuthor}
                                   disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Book Quantity</label>
                            <input type="text"
                                   className="form-control"
                                   id="bookQuantity"
                                   name="bookQuantity"
                                   value={this.props.book?.bookQuantity}
                                   disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Book Price</label>
                            <input type="text"
                                   className="form-control"
                                   id="bookPrice"
                                   name="bookPrice"
                                   value={this.props.book?.bookPrice?.amount + ' ' + this.props.book?.bookPrice?.currency}
                                   disabled
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }


    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }

}

export default BookView;
