import React from 'react';
import ReactPaginate from 'react-paginate'
import './ShoppingCart.css';
import {Link} from "react-router-dom";
import ShoppingCartItemComponent from "./ShoppingCartItemComponent/ShoppingCartItemComponent";

class ShoppingCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 2
        }
    }

    calculateTotal = () => {
        if (this.props.items.orderItemList.length > 0) {
            return this.props.items.orderItemList.map(i => i.orderItemPrice.amount).reduce((prev, next) => prev + next);
        }
        return 0;
    }

    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.items.orderItemList.length / this.state.size);
        const ShoppingCartList = this.getShoppingCartPage(offset, nextPageOffset);

        return (
            <div className={"row books"}>
                <div className={"button-right"}>
                    <Link className={"btn btn-outline-warning ml-2 view-btn"}
                          onClick={() => this.props.onOrderAll()}
                          to={`/orders`}>
                        Make Order
                    </Link>
                </div>
                <div className={"col-sm-12 m-4"}>
                    <h1>Shopping Cart</h1>
                </div>
                <div className={"col-sm-12"}>
                    <div className={"row"}>
                        <form>
                            <div className="form-group">
                                <label>Currency</label>
                                <input type="text"
                                       className="form-control"
                                       id="currency"
                                       name="currency"
                                       value={this.props.items?.currency}
                                       disabled
                                />
                            </div>
                            <div className="form-group">
                                <label>Total</label>
                                <input type="text"
                                       className="form-control"
                                       id="price"
                                       name="price"
                                       value={this.calculateTotal()}
                                       disabled
                                />
                            </div>
                        </form>
                    </div>
                    <div className={"row"}>
                        <div className={"table-responsive mt"}>
                            <table className={"table table-striped"}>
                                <thead>
                                <tr>
                                    <th scope={"col"}>Book ID</th>
                                    <th scope={"col"}>Quantity</th>
                                    <th scope={"col"}>Price</th>
                                    <th scope={"col"}></th>
                                </tr>
                                </thead>
                                <tbody>
                                {ShoppingCartList}
                                </tbody>
                            </table>
                        </div>
                        <div className="col mb-3">
                            <div className="row">
                                <div className="col-sm-12 col-sm-12">
                                    <ReactPaginate previousLabel={"back"}
                                                   nextLabel={"next"}
                                                   breakLabel={<a href="/#">...</a>}
                                                   breakClassName={"break-me"}
                                                   pageClassName={"ml-1"}
                                                   pageCount={pageCount}
                                                   marginPagesDisplayed={2}
                                                   pageRangeDisplayed={5}
                                                   onPageChange={this.handlePageClick}
                                                   containerClassName={"pagination react-pagination-js-border-bottom mb-3 justify-content-center"}
                                                   activeClassName={"active"}/>
                                </div>
                            </div>
                        </div>
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

    getShoppingCartPage = (offset, nextPageOffset) => {
        return this.props.items.orderItemList?.map((term, index) => {
            return (
                <ShoppingCartItemComponent key={index} term={term} onRemoveItem={this.props.onRemoveItem}/>
            );
        }).filter((book, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }

}

export default ShoppingCart;
