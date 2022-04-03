import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../actions';
import Header from '../components/Header';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getCurrencies());
  }

  render() {
    return (
      <Header />
    );
  }
}

// const mapStateToProps = (state) => ({

// });

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Wallet);
