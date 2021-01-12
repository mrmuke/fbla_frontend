import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Button
} from 'reactstrap';
import { Doughnut, Line } from 'react-chartjs-2';

export default class AnalyticsPage extends Component {


  render() {
    const chartColors = {
      red: 'rgb(233, 30, 99)',
      danger: 'rgb(233, 30, 99)',
      dangerTransparent: 'rgba(233, 30, 99, .8)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 180, 0)',
      green: 'rgb(34, 182, 110)',
      blue: 'rgb(68, 159, 238)',
      primary: 'rgb(68, 159, 238)',
      primaryTransparent: 'rgba(68, 159, 238, .8)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',

      primaryShade1: 'rgb(68, 159, 238)',
      primaryShade2: 'rgb(23, 139, 234)',
      primaryShade3: 'rgb(14, 117, 202)',
      primaryShade4: 'rgb(9, 85, 148)',
      primaryShade5: 'rgb(12, 70, 117)'
    };
    const donutData = {
      labels: ['Q1', 'Q2', 'Q3'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            chartColors.primaryShade1,
            chartColors.primaryShade2,
            chartColors.primaryShade3
          ],
          hoverBackgroundColor: [
            chartColors.primaryShade4,
            chartColors.primaryShade4,
            chartColors.primaryShade4
          ]
        }
      ]
    };
    const line = {
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: '# of Votes',
            data: [3, 6, 4, 10, 8, 12],
            borderColor: 'transparent',
            backgroundColor: chartColors.primary,
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointBorderColor: 'rgba(0,0,0,0)',
            borderWidth: 4
          }
        ]
      }
    };
    return (
      <div style={{marginTop:'10px'}}>

        

        <Row>
          <Col md={8} sm={12}>
            <Card>
              <CardHeader>Answer Efficiency</CardHeader>
              <CardBody>
                <div>
                  <Line
                    data={line.data}
                    width={2068}
                    height={846}
                    legend={{ display: false }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={4} sm={12}>
            <Card>
              <CardHeader>Mastery</CardHeader>
              <CardBody>
                <Doughnut
                  data={donutData}
                  width={908}
                  height={768}
                  legend={{ display: false }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* <Row>
          <Col md={8} sm={12}>
            <Card>
              <CardHeader>Conversions</CardHeader>
              <CardBody>
                <Row className="m-b-md">
                  <Col xs={4}>
                    <h5>Added to Cart</h5>
                    <div className="h2">4.30%</div>
                    <small className="text-muted">23 Visitors</small>
                  </Col>
                  <Col xs={4}>
                    <h5>Reached Checkout</h5>
                    <div className="h2">2.93</div>
                    <small className="text-muted">12 Visitors</small>
                  </Col>
                  <Col xs={4}>
                    <h5>Purchased</h5>
                    <div className="h2">10</div>
                    <small className="text-muted">10 Customers</small>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md={4} xs={12}>
            <Card>
              <CardHeader>Integrations</CardHeader>
              <CardBody>
                <Switch
                  enabled={this.state.facebook}
                  toggle={() => {
                    this.setState(prevState => ({ facebook: !prevState.facebook }));
                  }}
                />
                <span style={{marginLeft:'10px'}}>
                  Facebook
                </span>
                <hr />
                <Switch
                  enabled={this.state.twitter}
                  toggle={() => {
                    this.setState(prevState => ({ twitter: !prevState.twitter }));
                  }}
                />
                <span style={{marginLeft:'10px'}}>
                   Twitter
                </span>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
        
      </div>
    );
  }
}
