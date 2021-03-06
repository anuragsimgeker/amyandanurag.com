'use strict';
var React = require('react');

var Bootstrap = require('react-bootstrap');
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;

var CountdownTimer = require('./countdown');

var Home = React.createClass({

    getInitialState: function () {
        return {};
    },
    render: function() {
        var secondsRemaining = (new Date('October 24, 2015 14:00:00').getTime() / 1000) - (Date.now() / 1000) | 0;
        return (
            <div>
                <Row>
                    <Col xs={8} sm={4} md={3} className="col-centered"><img title="Amy & Anurag - Oct 24, 2015 02:00PM" className="bride-groom" src="public/images/bride-groom.png"/></Col>
                </Row>
                <Row>
                    <Col xs={12} sm={8} md={4} className="col-centered text-center"><CountdownTimer secondsRemaining={secondsRemaining} /></Col>
                </Row>
            </div>
        );
    }
});

module.exports = Home;
