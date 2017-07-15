import React, { Component } from 'react';

class AppLayout extends Component {
  componentWillMount() {
    this.props.locationChange(this.props.location.pathname);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.props.locationChange(nextProps.location.pathname);
    }
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default AppLayout;
