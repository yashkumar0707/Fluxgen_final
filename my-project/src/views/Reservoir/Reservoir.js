import React, { Component, lazy } from 'react';

import NavBar from '../../NavBar/NavBar/NavBar'

import {
  Button,
  ButtonToolbar,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row
} from 'reactstrap';

import './dashboard.css'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// Step 2 - Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import charts from "fusioncharts/fusioncharts.charts";
import Cylinder from "fusioncharts/fusioncharts.widgets"
// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

//for the tank
ReactFC.fcRoot(FusionCharts, Cylinder, FusionTheme)




class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      loadedData: '',
      timeStamp: '',
      startDate: new Date(),
      dummy_dates: [4, 4, 2, 3, 5, 4, 5],
      dummy_values: [50, 20, 12, 123, 45, 67, 100],
      dummy_timeStamp: '',
      cylinder_value: '',
      cylinder_hover: "",
      show: false,
      x: '',
      y: '',
      tanks: '', //array of tank values
      tanks_total: '', //total tank value
      tank_name: '' //tank names
    };
  }


  async componentDidMount() {
    try {
      //calling the api
      this.getfromApi()
      this.interval = setInterval(this.getfromApi(), 100000);

    } catch (err) {
      console.log(err.message);
    }
  }

  //getting data from api
  getfromApi = async () => {
    let myheaders = {
      //setting the auth header/token
      "authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTA0MDMxNTgsInB1YmxpY19pZCI6IjdlZGY4NGY0LTcyMmItNDc5YS04ZjZlLWJiMjczY2YxMzQ0ZSJ9.nBB19lijTPRPiZnYx2ymFF4YRAVbPCPR838VSFf0Z0Y"
    }
    try {
      var cost = 0
      var tanks_total = 0
      var tanks = []
      var tank_name = []
      //fetching from the api
      await fetch(`https://api.fluxgen.in/aquagen/v1/industries/DEMO1/consumption/latest?category=Storage`, {
        method: 'GET',
        headers: myheaders
      })
        .then(response => response.json())
        .then(energy1 => {
          console.log(energy1)
          //iterating through the object
          //console.log(Object.values(energy1.data.units[0])[0].process_level)
          cost = energy1.data.units[0].DEMO1SU2.process_level
          for (var i = 0; i < energy1.data.units.length; i++) {
            console.log(Object.values(energy1.data.units[i])[0].process_level)
            tanks_total = tanks_total + Object.values(energy1.data.units[i])[0].process_level //total value
            tanks.push(Object.values(energy1.data.units[i])[0].process_level) //tank value
            tank_name.push(Object.values(energy1.data.units[i])[0].unit_name) //tank name
          }
        })
      this.setState({ cylinder_value: cost, tanks_total: tanks_total.toFixed(2), tanks: tanks, tank_name: tank_name }) //setting the values to the main variables
    } catch (err) {
      console.log(err.message);
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>


  //for redirection to notifications
  imagehandler = () => {
    this.props.history.push('/notifications')
  }
  //date change for graph
  handleChange = date => {
    this.setState({
      startDate: date
    });
    var arr = []
    var arr1 = []
    console.log(this.state.startDate)
    //splitting the date into components
    for (var i = 0; i < this.state.dummy_dates.length; i++) {
      var date_check = this.state.dummy_dates[i].split('/')

      if (parseInt(date_check[1]) == date.getMonth()) {
        arr.push(this.state.dummy_values[i])
        arr1.push(this.state.dummy_timeStamp[i])

      }
    }
    console.log(arr)
    this.setState({ loadedData: arr, timeStamp: arr1 })
    console.log(this.state.loadedData)
    console.log(this.state.timeStamp)
  };

  render() {
    let items = [];
    //storing the tanks - items stores each tank in a card, later we print the items variable
    for (var i = 0; i < this.state.tanks.length; i = i + 2) {
      items.push(
        <Row>
          <Col xl={6} sm={12} md={12}>
            <Card className="text-center">
              <ReactFC
                type="cylinder"
                width="400"
                height="300"
                dataFormat="JSON"
                dataSource={{
                  chart: {
                    caption: this.state.tank_name[i],
                    lowerlimit: "0",
                    upperlimit: "250",
                    lowerlimitdisplay: "Empty",
                    upperlimitdisplay: "Full",
                    numbersuffix: "Kl",
                    cylfillcolor: "0ce1ff",
                    plottooltext: "Water Level: <b>" + this.state.tanks[i] + " Kl </b>",
                    cylfillhoveralpha: "85",
                    width: "400",
                    showTickMarks: 1,
                    showLimits: 1,
                    cylRadius: 100,
                    theme: "fusion"
                  },
                  value: this.state.tanks[i]
                }}
              />
            </Card>
          </Col>
          <Col xl={6} sm={12} md={12}>
            <Card className="text-center">
              <ReactFC
                type="cylinder"
                width="400"
                height="300"
                dataFormat="JSON"
                dataSource={{
                  chart: {
                    caption: this.state.tank_name[i + 1],
                    lowerlimit: "0",
                    upperlimit: "250",
                    lowerlimitdisplay: "Empty",
                    upperlimitdisplay: "Full",
                    numbersuffix: "Kl",
                    cylfillcolor: "0ce1ff",
                    plottooltext: "Water Level: <b>" + this.state.tanks[i + 1] + " Kl </b>",
                    cylfillhoveralpha: "85",
                    width: "400",
                    showTickMarks: 1,
                    showLimits: 1,
                    cylRadius: 100,
                    theme: "fusion"
                  },
                  value: this.state.tanks[i + 1]
                }}
              />
            </Card>
          </Col>
        </Row>)
    }
    //jsx code to render the html
    return (
      <div className="animated fadeIn"  >
        <NavBar
          heading="Reservoir"
          width="100%"
          big="true"
          datacallback={this.imagehandler}>
        </NavBar>
        <Row style={{ marginTop: "60px" }}>

          <Col xl={5} sm={12} md={12} lg={12}>
            <Card className="text-center">
              <ReactFC
                type="cylinder"
                width="500"
                height="620"
                dataFormat="JSON"
                dataSource={{
                  chart: {
                    caption: "Total Water Level Indicator",
                    lowerlimit: "0",
                    upperlimit: "250",
                    lowerlimitdisplay: "Empty",
                    upperlimitdisplay: "Full",
                    numbersuffix: "Kl",
                    cylfillcolor: "0ce1ff",
                    plottooltext: "Water Level: <b>" + this.state.tanks_total + " Kl </b>",
                    cylfillhoveralpha: "85",
                    width: "400",
                    showTickMarks: 1,
                    showLimits: 1,
                    cylRadius: 125,
                    theme: "fusion"
                  },
                  value: this.state.tanks_total
                }}
              />
            </Card>
          </Col>
          <Col>
            {items}
          </Col>
        </Row >
      </div >

    );
  }
}

export default Dashboard;


