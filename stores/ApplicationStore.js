'use strict';
var createStore = require('fluxible/utils/createStore');
var routesConfig = require('../configs/routes');

var currentLocale = require('../locales/en-EN');

var ApplicationStore = createStore({
    mixins: [currentLocale],
    storeName: 'ApplicationStore',
    handlers: {
        'CHANGE_ROUTE_SUCCESS': 'handleNavigate'
    },
    initialize: function() {
        this.currentPageName = null;
        this.currentPage = null;
        this.currentRoute = null;
        this.pages = routesConfig;
        this.pageTitle = 'Amy ♥ Anurag';
    },
    handleNavigate: function(route) {
        if (this.currentRoute && (this.currentRoute.url === route.url)) {
            return;
        }

        var pageName = route.config.page;
        var page = this.pages[pageName];

        this.currentPageName = pageName;
        this.currentPage = page;
        this.currentRoute = route;
        this.emitChange();
    },
    getCurrentPageName: function() {
        return this.currentPageName;
    },
    getPageTitle: function() {
        return this.pageTitle;
    },
    getLocales: function() {
        return this.locales;
    },
    getMessages: function() {
        return this.messages;
    },
    getCurrentRoute: function() {
        return this.currentRoute;
    },
    getPages: function() {
        return this.pages;
    },
    dehydrate: function() {
        return {
            currentPageName: this.currentPageName,
            currentPage: this.currentPage,
            pages: this.pages,
            route: this.currentRoute,
            pageTitle: this.pageTitle,
            locales: this.locales,
            messages: this.messages
        };
    },
    rehydrate: function(state) {
        this.currentPageName = state.currentPageName;
        this.currentPage = state.currentPage;
        this.pages = state.pages;
        this.currentRoute = state.route;
        this.pageTitle = state.pageTitle;
        this.locales = state.locales;
        this.messages = state.messages;
    }
});

module.exports = ApplicationStore;