App.factory('path',
    [ 'settings',
        function (settings) {

            var serve = {},
                min = (typeof settings.minFiles !== 'undefined')? settings.minFiles : true, //default true
                extension = function(type){
                    return ((min)? '.min' : '') + '.'+type;
                };

            /**
             * Return controller path according destination and minification.
             * @param nameController
             * @returns {*}
             */
            serve.controller = function (nameController) {
                return settings.path.controller + nameController + extension('js');
            };

            return serve;
        }
    ]
);