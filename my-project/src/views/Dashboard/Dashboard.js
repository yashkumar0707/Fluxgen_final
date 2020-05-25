import React, { Component, lazy } from 'react';
import ReactDOM from 'react-dom';

import { Bar, Line } from 'react-chartjs-2';
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


//const brandPrimary = getStyle('--primary')
//const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
//const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

ReactFC.fcRoot(FusionCharts, Cylinder, FusionTheme)


const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

// Card Chart 4

const bar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: ' Reservoir Trends',
      backgroundColor: '#0c90ff',
      borderColor: '#c90ff',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};


// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}


const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

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
      cylinder_value: '', //for the cylinder value 
      cylinder_hover: "", //for the cylinder hover
      show: false,
      tanks: '', //for each individual tank
      tanks_total: '', //for the total value of the tanks,
      tank_name: ''//to store the tank name
    };
  }



  async componentDidMount() {
    try {
      this.getData()
      this.getData()
      this.getfromApi()
      //console.log(cardChartData1)
      this.interval = setInterval(this.getfromApi(), 100000);
    } catch (err) {
      console.log(err.message);
    }
  }

  //getting data from my api for the water level graph
  getData = async () => {
    await fetch(`http://localhost:5000/api/energy/p1`)
      .then(response => response.json())
      .then(energy => {
        var arr = []
        var arr1 = []
        var arr4 = []
        var arr3 = []
        console.log(energy.energy)
        //looping through the object
        energy.energy.forEach(element => {
          //console.log(element)
          arr.push(element.WaterLevel2)
          arr1.push(element.Date)
          arr4.push(element.Hour + ':' + element.Minute)
        })
        this.setState({ dummy_values: arr, dummy_dates: arr1, dummy_timeStamp: arr4 }) //setting the values to the main variables
      })
    var length = this.state.dummy_values.length
    console.log(length)
    console.log(this.state.dummy_values)
    var dummy_cyl = this.state.dummy_values[length - 1] //for the cylinder
    console.log(dummy_cyl)
    this.state.cylinder_hover = "Water Level:" + this.state.cylinder_hover
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
      var tank_name = ''
      //fetching from the api
      await fetch(`https://api.fluxgen.in/aquagen/v1/industries/DEMO1/consumption/latest?category=Storage`, {
        method: 'GET',
        headers: myheaders
      })
        .then(response => response.json())
        .then(energy1 => {
          console.log(energy1)
          //console.log(Object.values(energy1.data.units[0])[0].process_level)
          cost = energy1.data.units[0].DEMO1SU1.process_level
          tank_name = energy1.data.units[0].DEMO1SU1.unit_name
        })
      this.setState({ cylinder_value: cost, tank_name: tank_name })
    } catch (err) {
      console.log(err.message);
    }
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>


  //wat boy functions now shifted to navbar
  // closewatboy = () => {
  //   this.setState({ show: false })
  // }
  // clickhandler = () => {
  //   let show1 = this.state.show
  //   this.setState({ show: !show1 })
  //   //setInterval(this.textimage, 3000); //outputs <h3> coordinates
  // }

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
    //jsx code to render the html
    return (
      <div className="animated fadeIn"  >
        <NavBar
          heading="Sump"
          width="100%"
          big="true"
          datacallback={this.imagehandler}>
        </NavBar>

        <Row style={{ marginTop: "60px" }}>
          <div className="date-picker">
            <DatePicker
              style={{ position: "right" }}
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
          </div>
        </Row>
        <Row style={{ marginTop: "30px" }}>
          <Col xl={6} sm={12}>
            <Card Card className="text-center" style={{ height: "450px" }}>
              <CardHeader>
                Water Consumption in a Week and Live Water Level Update
              </CardHeader>
              <CardBody>
                <ReactFC
                  type="cylinder"
                  width="100%"
                  height="380"
                  dataFormat="JSON"
                  dataSource={{
                    chart: {
                      caption: this.state.tank_name,
                      lowerlimit: "0",
                      upperlimit: "250",
                      lowerlimitdisplay: "Empty",
                      upperlimitdisplay: "Full",
                      numbersuffix: "Kl",
                      cylfillcolor: "0ce1ff",
                      plottooltext: "Water Level: <b>" + this.state.cylinder_value + " Kl</b>",
                      cylfillhoveralpha: "85",
                      width: "400",
                      showTickMarks: 1,
                      showLimits: 1,
                      cylRadius: 125,
                      theme: "fusion"
                    },
                    value: this.state.cylinder_value
                  }}
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl={6} sm={12}>
            <Card style={{ height: "450px" }}>
              <CardHeader>
                Post 6PM to EoD - Reservoir Trends
                           <div className="card-header-actions">
                  <a href="http://www.chartjs.org" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Bar data={bar} options={options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row >
        < Row >
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Water Level with Threshold Value</CardTitle>
                  </Col>
                  {/* <Col sm="7" className="d-none d-sm-inline-block">
                    <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                    </ButtonToolbar>
                  </Col> */}
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={{
                    labels: this.state.timeStamp,
                    datasets: [
                      {
                        label: 'My First dataset',
                        backgroundColor: hexToRgba(brandInfo, 10),
                        borderColor: brandInfo,
                        pointHoverBackgroundColor: '#fff',
                        borderWidth: 2,
                        data: this.state.loadedData,
                      },

                      {
                        label: 'My Third dataset',
                        backgroundColor: 'transparent',
                        borderColor: brandDanger,
                        pointHoverBackgroundColor: '#fff',
                        borderWidth: 1,
                        borderDash: [8, 5],
                        data: data3,
                      },
                    ],
                  }}
                    options={mainChartOpts} height={300} />
                </div>
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row >
      </div >

    );
  }
}

export default Dashboard;


