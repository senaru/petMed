import React, { Component } from 'react';
import { without, findIndex } from 'lodash';
import '../css/App.css';

import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      formDisplay: false,
      orderBy: 'petName',
      orderDir: 'asc',
      query: '',
      lastIndex: 0
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeDir = this.changeDir.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.search = this.search.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  addAppointment(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    });
  }

  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({
      myAppointments: tempApts
    })
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 })
          return item;
        })
        this.setState({
          myAppointments: apts
        });
      });
  }

  changeDir(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  search(query) {
    this.setState({
      query: query
    })
  }

  updateInfo(name, value, id) {
    let tempApts = this.state.myAppointments;
    let index = findIndex(this.state.myAppointments, {
      aptId: id
    });
    tempApts[index][name] = value;
    this.setState({
      myAppointments: tempApts
    })
  }
  render() {

    let order;
    let filteredAppointments = this.state.myAppointments;
    if (this.state.orderDir == 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    filteredAppointments = filteredAppointments.sort((a, b) => {
      if (a[this.state.orderBy].toLowerCase() <
        b[this.state.orderBy].toLowerCase()
      ) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    }).filter(eachItem => {
      return (
        eachItem['petName']
          .toLowerCase()
          .includes(this.state.query.toLowerCase()) ||
        eachItem['ownerName']
          .toLowerCase()
          .includes(this.state.query.toLowerCase()) ||
        eachItem['aptNotes']
          .toLowerCase()
          .includes(this.state.query.toLowerCase())
      );
    });

    return (
      <main className="page bg-white" id="petratings" >
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointment={this.addAppointment} />
                <SearchAppointments
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder={this.changeOrder}
                  changeDir={this.changeDir}
                  search={this.search}
                />
                <ListAppointments
                  appointments={filteredAppointments}
                  deleteAppointment={this.deleteAppointment}
                  updateInfo={this.updateInfo} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  };
}

export default App;
