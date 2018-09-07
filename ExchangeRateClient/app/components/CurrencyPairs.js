import React, { Component } from 'react';
import { endpoint, interval } from '../config';
// redux
import { connect } from 'react-redux';
import { setRates } from '../store/actions';
import fetchJson from '../utils/fetchJson';

class CurrencyPair extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trend: "--",
    }

    this.getTrend = this.getTrend.bind(this);
    this.getRates = this.getRates.bind(this);
  }

  componentDidMount() {
    this.getRates(this.props.pair)
  }

  getPairsQuery(currencyPairs) {
    return Object.keys(currencyPairs).map(pair => `currencyPairIds[]=${pair}`).join("&")
  }

  getRates() {
      fetchJson(`/rates?${this.getPairsQuery(this.props.currencyPairs)}`)
      .then(data => {
        const { currencyPairs } = this.props;

        if(data && data.rates !== undefined) {
          Object.keys(data.rates).map(pair => {
            const prev = (currencyPairs[pair][2] !== undefined) && currencyPairs[pair][2].rate;  
            const next = data.rates[pair];

            this.setState({pair: {prev, next}});
          }
        }
      })
      .catch(error => console.log(error.message))

      setTimeout(() => this.getRates(pair), interval)
  }

  getTrend(prev, next) {
    if(prev < next) {
      this.setState({ trend: "growing" });
    }
    if(prev > next) {
      this.setState({ trend: "declining" });
    }
    if(prev == next) {
      this.setState({ trend: "stagnating" });
    }
  }

  render() {
    const { currencyPairs, pair, rates } = this.props;
    const { trend } = this.state;

    const card = {
      padding: '10px',
      border: '1px solid #ddd',
      flexBasis: '280px',
      marginRight: '10px',
      marginBottom: '10px',
      fontFamily: 'Verdana',
      fontSize: '10px'
    };
    const rateTrend = {
      stagnating: { color: 'orange' },
      growing: { color: '#36c736' },
      declining: { color: 'red' }
    };

    return (
      <div>
        {Object.keys{}}
      </div>
    )
  }
}

const mapStateToProps = state => ({ 
  currencyPairs: state.currencyPairs,
});

const mapDispatchToProps = dispatch => ({
  setRates: (rate, pair) => dispatch(setRates(rate, pair))
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPair)