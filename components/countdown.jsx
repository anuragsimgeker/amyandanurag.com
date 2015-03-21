var React = require('react');

// Load and use polyfill for ECMA-402.
if (!global.Intl) {
    global.Intl = require('intl');
}
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedDate = ReactIntl.FormattedDate;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedRelative = ReactIntl.FormattedRelative;

var Bootstrap = require('react-bootstrap');
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;

var CountdownTimer = React.createClass({

  mixins: [ IntlMixin ],

  getInitialState: function() {
    return {
      secondsRemaining: 0
    };
  },
  tick: function() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
    }
  },
  componentDidMount: function() {
    this.setState({ secondsRemaining: this.props.secondsRemaining });
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    var date = new Date('October 24, 2015 14:00:00'),
        start = Date.now(),
        diff,
        days, 
        hours,
        minutes,
        seconds;

      diff = this.state.secondsRemaining;

      days = (diff / 86400) | 0;
      hours = (diff / 3600 % 24) | 0;
      minutes = (diff / 60 % 60) | 0;
      seconds = (diff % 60) | 0;

      days = days < 10 ? '0' + days : days;
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

    return (
        <div>
          <Row>
            <Col xs={3} md={3}><h2>{days}</h2></Col>
            <Col xs={3} md={3}><h2>{hours}</h2></Col>
            <Col xs={3} md={3}><h2>{minutes}</h2></Col>
            <Col xs={3} md={3}><h2>{seconds}</h2></Col>
          </Row>
          <Row>
            <Col xs={3} md={3}><h5>Days</h5></Col>
            <Col xs={3} md={3}><h5>Hours</h5></Col>
            <Col xs={3} md={3}><h5>Minutes</h5></Col>
            <Col xs={3} md={3}><h5>Seconds</h5></Col>
          </Row>
        </div>
      );
  }
});

module.exports = CountdownTimer;
