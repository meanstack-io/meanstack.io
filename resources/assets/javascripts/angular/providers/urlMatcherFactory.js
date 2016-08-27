App.config(['$urlMatcherFactoryProvider', function ($urlMatcherFactoryProvider) {

    /**
     * Url contains a trailing slash or not.
     *   Documentation:
     *     http://angular-ui.github.io/ui-router/site/#/api/ui.router.util.$urlMatcherFactory#methods_strictmode
     *     https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-make-a-trailing-slash-optional-for-all-routes
     */
    $urlMatcherFactoryProvider.strictMode(false);
}]);
