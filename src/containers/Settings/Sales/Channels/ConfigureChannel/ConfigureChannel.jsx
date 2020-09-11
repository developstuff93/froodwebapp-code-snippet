/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { channelsGetRequest } from 'redux-base/actions';
import Default from './Default';

const mapStateToProps = state => ({
  loadingPage: state.channels.loadingPage,
  channels: state.channels.data
});

const mapDispatchToProps = {
  channelsGetRequest
};

class ConfigureChannel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      channel: this.props.match.params.channel,
      channelId: this.props.match.params.id,
      components: {
        Default
      }
    };
  }

  renderChannel = () => {
    let Channel = '';
    if (this.state.components[this.state.channel]) {
      Channel = this.state.components[this.state.channel];
    } else {
      return <h1>Coming soon</h1>;
    }
    return <Channel channelId={ Number(this.state.channelId) } />;
  }

  render() {
    return (
      <div>
        { this.renderChannel() }
      </div>
    );
  }
}

ConfigureChannel.propTypes = {
  // triggers
  loadingPage: PropTypes.bool.isRequired,
  // data
  channels: PropTypes.array.isRequired,
  // router
  match: PropTypes.object,
  // redux-base
  channelsGetRequest: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfigureChannel));
