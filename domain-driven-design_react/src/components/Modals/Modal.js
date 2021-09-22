import React from 'react';
import './Modal.css';

const Modal = ({handleClose, onSubmit, show, data}) => {

    const showHideClassName = show ? 'my-modal d-block' : 'my-modal d-none';

    const [formData, updateFormData] = React.useState({
        value: ''
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const value = formData.value !== "" ? formData.value : data.value;
        onSubmit(value);
    }

    return (
        <div className={showHideClassName} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className={"modal-content"}>
                    <form onSubmit={onFormSubmit}>
                        <div className={"modal-header"}>
                            <h5 className={"modal-title"} id="exampleModalLongTitle">{data?.title}</h5>
                            <button type={"button"} className={"close"} onClick={handleClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={"modal-body"}>
                            <div className="form-group">
                                <label htmlFor="username">{data?.label}</label>
                                <input type={data.type}
                                       className="form-control"
                                       id="value"
                                       name="value"
                                       onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={"modal-footer"}>
                            <button id="submit" type="submit" className={"btn btn-primary float-right"}
                                    onClick={handleClose}>Submit
                            </button>
                            <button type={"button"} className={"btn btn-secondary"} data-dismiss="modal"
                                    onClick={handleClose}>Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Modal;