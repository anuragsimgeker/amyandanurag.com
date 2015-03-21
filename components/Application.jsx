'use strict';
var React = require('react');
var Home = require('./Home.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var FluxibleMixin = require('fluxible').Mixin;

var mui = require('material-ui');
var AppCanvas = mui.AppCanvas;

var Application = React.createClass({
    mixins: [RouterMixin, FluxibleMixin],
    statics: {
        storeListeners: [ApplicationStore]
    },
    getInitialState: function () {
        return this.getState();
    },
    getState: function () {
        var appStore = this.getStore(ApplicationStore);
        return {
            currentPageName: appStore.getCurrentPageName(),
            pageTitle: appStore.getPageTitle(),
            locales: appStore.getLocales(),
            messages: appStore.getMessages(),
            route: appStore.getCurrentRoute(),
            pages: appStore.getPages()
        };
    },
    onChange: function () {
        this.setState(this.getState());
    },
    render: function () {
        var title,
            output = '';
        switch (this.state.currentPageName) {
            case 'home':
                output = <Home locales={this.state.locales} messages={this.state.messages} />;
                title = 'Home';
                break;
        }
        return (
            <AppCanvas predefinedLayout={1}>

                <div className="mui-app-content-canvas">{output}</div>

            </AppCanvas>
        );
    },

    componentDidUpdate: function(prevProps, prevState) {
        var newState = this.state;
        if (newState.pageTitle === prevState.pageTitle) {
            return;
        }
        document.title = newState.pageTitle;
    }
});

module.exports = Application;
