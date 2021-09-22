import React from 'react';
import ReactPaginate from 'react-paginate'
import OrderComponent from "./OrderComponent/OrderComponent";
import './Orders.css';

class OrdersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 2
        }
    }

    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.orders.length / this.state.size);
        const orderList = this.getOrdersPage(offset, nextPageOffset);

        return (
            <div className={"row books"}>
                <div className={"col-sm-12 m-4"}>
                    <h1>List of Orders</h1>
                </div>

                <div className={"col-sm-12"}>
                    <div className={"row"}>
                        <div className={"table-responsive mt"}>
                            <table className={"table table-striped"}>
                                <thead>
                                <tr>
                                    <th scope={"col"}>ID</th>
                                    <th scope={"col"}>Ordered On Date</th>
                                    <th scope={"col"}>OrderState</th>
                                    <th scope={"col"}>Currency</th>
                                    <th scope={"col"}>Address</th>
                                    <th scope={"col"}></th>
                                </tr>
                                </thead>
                                <tbody>
                                {orderList}
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

    getOrdersPage = (offset, nextPageOffset) => {
        return this.props.orders.map((term, index) => {
            return (
                <OrderComponent key={index} term={term} onView={this.props.onView}/>
            );
        }).filter((order, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }

}

export default OrdersList;
