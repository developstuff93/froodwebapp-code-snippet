import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { AutoComplete } from 'components';
import { filterAutoCompleteSuggestions } from 'utils';
import styles from './AutocompleteSection.scss';

class AutocompleteSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      autocomplete: props.autocomplete,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      autocomplete: nextProps.autocomplete
    });
  }

  handleSearch = (e, value) => {
    if (value.length < 3) {
      this.setState({
        autocomplete: [],
        value
      });
    } else {
      this.setState({ value },
        () => {
          this.props.searchRequest({
            payload: value
          });
        });
    }
  }

  handleSelect = (data) => {
    this.props.getAllItemsRequest({
      id: data,
      limit: 40,
      offset: 0
    });
  }

  render() {
    const {
      autocomplete,
      value
    } = this.state;

    const {
      renderItem,
      inputPlaceholder,
      loadingAutoComplete,
      handleToggleSearchSection
    } = this.props;

    const items = filterAutoCompleteSuggestions(autocomplete, value);

    return (
      <Row className={ styles.autocompleteRow }>
        <Col xs sm md lg>
          <AutoComplete
            items={ items }
            getItemValue={ item => item.data.id.toString() }
            value={ value }
            onChange={ this.handleSearch }
            onSelect={ this.handleSelect }
            renderItem={ renderItem }
            loadingAutoComplete={ loadingAutoComplete }
            inputStyle={ {
              fontSize: '1rem'
            } }
            inputPlaceholder={ inputPlaceholder }
          />
          <Button
            className={ styles.toggleIcon }
            size="default"
            type="primary"
            onClick={ handleToggleSearchSection }
          >
            <Icon
              type="caret-down"
            />
          </Button>
        </Col>
      </Row>
    );
  }
}

AutocompleteSection.propTypes = {
  loadingAutoComplete: PropTypes.bool.isRequired,
  renderItem: PropTypes.func.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  autocomplete: PropTypes.array.isRequired,
  searchRequest: PropTypes.func.isRequired,
  getAllItemsRequest: PropTypes.func.isRequired,
  handleToggleSearchSection: PropTypes.func.isRequired,
};

export default AutocompleteSection;
