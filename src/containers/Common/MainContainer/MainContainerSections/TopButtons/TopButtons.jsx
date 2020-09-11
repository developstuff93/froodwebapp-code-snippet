import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { Button, ActionButton } from 'components';
import styles from './TopButtons.scss';

const TopButtons = ({
  statsEnabled = false,
  statsCollapsed,
  handleCollapseStats,
  newButtonVisible = false,
  newButtonText,
  newButtonLink,
  exportButton = false,
  onExportButtonClick,
  printButton = false,
  printButtonText = 'Print',
  onPrintButtonClick
}) => (
  <div className={ styles.topButtons }>
    { statsEnabled &&
      <Button
        className={ styles.keyIndicators }
        onClick={ handleCollapseStats }
      >
        <FontAwesome
          className="fa-bar-chart"
          name="fa-bar-chart"
        />
        Key Indicators
        <FontAwesome
          className={ statsCollapsed ? 'fa-angle-down' : 'fa-angle-up' }
          name={ statsCollapsed ? 'fa-angle-down' : 'fa-angle-up' }
        />
      </Button>
    }
    { exportButton &&
      <ActionButton
        text="Export"
        onClick={ onExportButtonClick }
      >
        Export
      </ActionButton>
    }
    { newButtonVisible &&
      <Button className={ styles.topButton }>
        <Link to={ newButtonLink }>
          <FontAwesome
            className="fa-th"
            name="fa-th"
          />
          { newButtonText }
        </Link>
      </Button>
    }
    { printButton &&
      <ActionButton
        onClick={ onPrintButtonClick }
      >
        { printButtonText }
      </ActionButton>
    }
  </div>
);

TopButtons.propTypes = {
  newButtonVisible: PropTypes.bool,
  statsEnabled: PropTypes.bool,
  statsCollapsed: PropTypes.bool,
  handleCollapseStats: PropTypes.func,
  exportButton: PropTypes.bool,
  onExportButtonClick: PropTypes.func,
  newButtonText: PropTypes.string,
  newButtonLink: PropTypes.string,
  printButton: PropTypes.bool,
  printButtonText: PropTypes.string,
  onPrintButtonClick: PropTypes.func,
};

export default TopButtons;
