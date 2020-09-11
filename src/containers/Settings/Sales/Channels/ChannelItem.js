/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Checkbox } from 'antd';
import { channel } from 'styles/settings.scss';

class ChannelItem extends Component {

  render() {
    const { channelData } = this.props;
    return (
      <Col>
        <div className={ channel }>
          <div>
            <Checkbox checked={ channelData.isActive }>Enabled</Checkbox>
          </div>
          <div>
            {channelData.name}
          </div>
          <div>
            <Button>
              <Link
                to={ `/settings/sales/channels/${channelData.name}/${channelData.id}` }
                replace
              >
                Configure
              </Link>
            </Button>
          </div>
        </div>
      </Col>
    );
  }
}

ChannelItem.propTypes = {
  // triggers
  loadingPage: PropTypes.bool,
  // data
  channelData: PropTypes.array,
  // redux-base
  channelsGetRequest: PropTypes.func,
};

export default ChannelItem;
