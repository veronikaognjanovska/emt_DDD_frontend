import React from 'react';
import ReactPaginate from 'react-paginate'

import {Link} from "react-router-dom";
import OrderBookComponent from "./OrderBookComponent/OrderBookComponent";

class OrderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 5
        }
    }

    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.order?.orderItemList?.length / this.state.size);
        const orderBookList = this.getOrdersPage(offset, nextPageOffset);

        return (
            <div className="row book-view">
                <div className={"button-left"}>
                    <Link className={"btn btn-outline-primary"} to={"/orders"}>Back</Link>
                </div>
                <div className={"col-sm-12 m-4"}>
                    <h1>Order Info</h1>
                </div>
                <div className={"col-sm-12"}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input type="text"
                                   className="form-control"
                                   id="id"
                                   name="id"
                                   value={this.props.order?.id?.id}
                                   disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="orderedOnDate">Ordered On Date</label>
                            <input type="text"
                                   className="form-control"
                                   id="orderedOnDate"
                                   name="orderedOnDate"
                                   value={this.props.order?.orderedOnDate}
                                   disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>OrderState</label>
                            <input type="text"
                                   className="form-control"
                                   id="orderState"
                                   name="orderState"
                                   value={this.props.order?.orderState || undefined}
                                   disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Currency</label>
                            <input type="text"
                                   className="form-control"
                                   id="currency"
                                   name="currency"
                                   value={this.props.order?.currency}
                                   disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Currency</label>
                            <input type="text"
                                   className="form-control"
                                   id="address"
                                   name="address"
                                   value={this.props.order?.address}
                                   disabled
                            />
                        </div>
                    </form>
                </div>
                <div className={"col-sm-12 mt-5"}>
                    <div className={"row"}>
                        <div className={"table-responsive mt"}>
                            <table className={"table table-striped"}>
                                <thead>
                                <tr>
                                    <th scope={"col"}>ID</th>
                                    <th scope={"col"}>Order Item Price</th>
                                    <th scope={"col"}>Quantity</th>
                                    <th scope={"col"}>Book Id</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orderBookList}
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

    getOrdersPage = (offset, nextPageOffset) => {
        return this.props.order?.orderItemList?.map((term, index) => {
            return (
                <OrderBookComponent key={index} term={term}/>
            );
        }).filter((book, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }

}

export default OrderView;
