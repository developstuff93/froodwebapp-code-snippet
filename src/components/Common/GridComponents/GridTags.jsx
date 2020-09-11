import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tag, Input } from 'antd';

class GridTags extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: true,
      inputValue: '',
      index: props.index
    };
  }

  handleClose = (tagIndex) => {
    this.props.handleDeleteTag(this.state.index, tagIndex);
  }

  handleShowInput = () => {
    this.setState({
      inputVisible: true
    });
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputSave = (e) => {
    e.preventDefault(); // could create a bug when tags used inside form and enter is pressed
    if (this.state.inputValue) {
      const value = this.state.inputValue;
      this.setState({
        inputValue: ''
      }, () => this.props.handleAddTag(value, this.state.index));
    }
  }

  render() {
    const {
      tags = [],
      maxTags
    } = this.props;

    const {
      inputVisible,
      inputValue
    } = this.state;

    return (
      <span>
        { tags.map((tag, index) => (
          <Tag
            key={ tag }
            closable
            onClose={ () => this.handleClose(index) }
          >
            { tag }
          </Tag>
        ))}
        { inputVisible && tags.length !== maxTags && (
          <Input
            autoFocus
            ref={ this.ref }
            type="text"
            size="small"
            style={ { width: 150 } }
            value={ inputValue }
            onChange={ this.handleInputChange }
            onBlur={ this.handleInputSave }
            onPressEnter={ this.handleInputSave }
          />
        )}
      </span>
    );
  }
}

GridTags.propTypes = {
  tags: PropTypes.array,
  maxTags: PropTypes.number,
  index: PropTypes.number,
  handleAddTag: PropTypes.func,
  handleDeleteTag: PropTypes.func,
};

export default GridTags;
