/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { channelsGetRequest } from 'redux-base/actions';
import { mapValues, groupBy } from 'lodash';
import { Spin } from 'antd';
import { row } from 'styles/common.scss';
import { channelDescription } from 'styles/settings.scss';
import ChannelItem from './ChannelItem';


const mapStateToProps = state => ({
  loadingPage: state.channels.loadingPage,
  channels: state.channels.data
});

const mapDispatchToProps = {
  channelsGetRequest
};

class Channels extends Component {

  componentWillMount = () => {
    this.props.channelsGetRequest();
  }

  renderChannels = grouped => (
    Object.keys(grouped).map(key => (
      <Col xs={ 12 } key={ key }>
        <Row className={ row }>
          <Col className={ channelDescription } xs={ 12 }>{key}</Col>
          {grouped[key].map(col => (
            <ChannelItem
              key={ col.name }
              channelData={ col }
            />
          ))}
        </Row>
      </Col>
    ))
  )

  render() {
    const { loadingPage } = this.props;
    const grouped = mapValues(groupBy(this.props.channels, 'typeDescription'));
    return (
      <div>
        <Row>
          <Col xs={ 12 }>
            <Spin spinning={ loadingPage }>
              {this.renderChannels(grouped)}
            </Spin>
          </Col>
        </Row>
      </div>
    );
  }
}

Channels.propTypes = {
  // triggers
  loadingPage: PropTypes.bool.isRequired,
  // data
  channels: PropTypes.array.isRequired,
  // redux-base
  channelsGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
