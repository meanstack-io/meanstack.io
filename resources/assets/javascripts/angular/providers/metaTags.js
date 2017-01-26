angular.module('App')
    .config(['config', 'metaTagsProvider', function (config, metaTagsProvider) {

        /*
         * ====== Options ======
         *
         * type:
         *   title:
         *      <title>:value</title>
         *
         *   metaName:
         *      <meta name=":tag" content=":value">
         *
         *   metaProperty:
         *      <meta property=":tag" content=":value" />
         *
         *   linkRel:
         *      <link rel=":tag" href=":value" />
         *
         *   helper:
         *      Utilized by virtual tag. Example create virtual tag for reference images tags.
         *
         * prefixAfter:
         *   Add content after value.
         *
         * prefixBefore:
         *   Add content before value.
         *
         * default:
         *   Set default value using functions helpers.
         *     currentUrl:
         *        Set current url
         *
         * reference:
         *   If property update reference is updated by default.
         *
         */

        var tags = {
            'title': {
                'prefixBefore': ' | MEANStack.io',
                'type': 'title'
            },
            'description': {
                'type': 'metaName'
            },
            'robots': {
                'type': 'metaName'
            },
            'keywords': {
                'type': 'metaName',
                'value': 'keywords, keyword, Lorem, default, value'
            },
            'canonical': {
                'type': 'linkRel',
                'default': 'currentUrl'
            }
        };

        /**
         * Config metaTags module
         */
        metaTagsProvider.config(
            angular.merge({}, tags, config.metaTags) // Inherit to ENV angular config file.
        );
    }]);
