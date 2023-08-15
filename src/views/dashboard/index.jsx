import React, { Component, Fragment } from "react";
import TotalSpent from "components/totalSpent";
import Agenda from "components/agenda";
import TopCreatorTable from "components/topPerformers";

import tableDataTopCreators from "variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "variables/tableColumnsTopCreators";

import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
class Dashboard extends Component {

  render() {
    const User = this.props.user;
    return (
      <Container>
        <Row>
          <Col md='7'>
            <Row>
              <TotalSpent />
            </Row>
            <Row>
              <Col >
                <TopCreatorTable
                  extra="mb-5"
                  tableData={tableDataTopCreators}
                  columnsData={tableColumnsTopCreators}
                />
              </Col>
            </Row>
          </Col>

          <Col md='5'>
            <Agenda />
          </Col>
        </Row>
      </Container>


    );
  }
}

export default Dashboard;

