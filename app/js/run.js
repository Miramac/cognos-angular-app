'use strict';

/**
 * @ngInject
 */
function Run($rootScope, AppSettings) {

  // change page title based on state
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        $rootScope.pageTitle =  AppSettings.appTitle;
        $rootScope.navLink = '';
        if ( toState.title ) {
            $rootScope.pageTitle += ' | ' + toState.title;
            $rootScope.navLink = toState.url;
        }
    });

}

module.exports = Run;