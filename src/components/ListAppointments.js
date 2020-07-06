import React, { Component } from 'react';

class ListAppointments extends Component {
    render() {
        const listItems = this.props.appointments.map(i => (
            <div>{i.petName}</div>
        ));

        return (
            <div>
                List Appointments
            </div>);
    }
}

export default ListAppointments;