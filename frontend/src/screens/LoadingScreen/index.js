import React from 'react';
import { Grid, Row } from 'react-bootstrap';

export default class LoadingScreen extends React.Component {
  render () {
    return (
      <Grid>
        <Row className="show-grid">
          {this.props.children || <h1>Loading...</h1>}
        </Row>
      </Grid>
    );
  }
}
LoadingScreen.propTypes = {
  children: React.PropTypes.object
};
