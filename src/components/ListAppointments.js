import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';

class ListAppointments extends Component {
    render() {
        return (
            <div className="appointment-list item-list mb-3">
                {this.props.appointments.map(i => (
                    <div className="pet-item col media py-3" id={i.aptId}>
                        <div className="mr-3">
                            <button className="pet-delete btn btn-sm btn-danger" onClick={() => this.props.deleteAppointment(i)} >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="pet-info media-body">
                            <div className="pet-head d-flex">
                                <span className="pet-name">Name: {i.petName}</span>
                                <span className="apt-date ml-auto">
                                    <Moment date={i.aptDate} parse="YYYY-MM-DD hh:mm" format="DD-MM-YYYY h:mma" />
                                </span>
                            </div>

                            <div className="owner-name">
                                <span className="label-item">Owner: </span>
                                <span>{i.ownerName}</span>
                            </div>
                            <div className="apt-notes">Notes: {i.aptNotes}</div>
                        </div>
                    </div>))
                }
            </div>);
    }
}

export default ListAppointments;