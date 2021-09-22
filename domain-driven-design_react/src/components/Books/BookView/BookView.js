import React from 'react';
import {Link} from "react-router-dom";
import UserService from "../../../Service/UserService";
import Modal from "../../Modals/Modal";

class BookView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 5,
            username: UserService.getLoggedInUser(),
            data: {
                label: 'Quantity',
                title: 'Choose quantity',
                type: 'number'
            },
            show: false,
            showModal: false,
        }
    }


    render() {
        return (
            <div className="row book-view">
                {
                    this.state.username !== undefined &&
                    this.props.book?.bookQuantity > 0 &&
                    <div className={"button-right"}>
                        <a title={"Delete"} className={"btn btn-outline-success ml-2"}
                           onClick={() => this.chooseQuantity()}>
                            Add To Shopping Cart
                        </a>
                    </div>
                }
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
                <div className={'row m-2'} style={{backgroundColor: 'blue'}}>
                    <div className={'col-sm-3 d-flex justify-content-center'}>
                        <Modal show={this.state.showModal} handleClose={this.hideModal}
                               data={this.state.data} onSubmit={this.onAddToShoppingCartBook}>
                        </Modal>
                    </div>

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

    showModal = () => {
        this.setState({show: true});
    }

    hideModal = () => {
        this.setState({show: false, showModal: false});
    }

    chooseQuantity = () => {
        this.setState({showModal: true});
    }

    onAddToShoppingCartBook = (qty) => {
        this.props.onAddToShoppingCartBook(this.props.book, qty);
    }

}

export default BookView;
