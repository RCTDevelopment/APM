'use strict';

angular.module('andruclient')

// principal is a service that tracks the user's identity.
// calling identity() returns a promise while it does what you need it to do
// to look up the signed-in user's identity info. for example, it could make an
// HTTP request to a rest endpoint which returns the user's name, roles, etc.
// after validating an auth token in a cookie. it will only do this identity lookup
// once, when the application first runs. you can force re-request it by calling identity(true)
.factory('principal', ['$q', '$http', '$timeout',
    function($q, $http, $timeout) {
        var _identity = undefined;
        var _authenticated = false;

        return {
            isIdentityResolved: function() {
                return angular.isDefined(_identity);
            },
            isAuthenticated: function() {
                return _authenticated;
            },
            isInRole: function(role) {
                if (!_authenticated || !_identity.roles) {
                    return false;
                }
                return _identity.roles.indexOf(role) != -1;
            },
            isInAnyRole: function(roles) {
                if (!_authenticated || !_identity.roles) {
                    return false;
                }

                for (var i = 0; i < roles.length; i++) {
                    if (this.isInRole(roles[i])) {
                        return true;
                    }
                }

                return false;
            },
            authenticate: function(identity) {
                _identity = identity;
                _authenticated = identity != null;

                // for this demo, we'll store the identity in localStorage. For you, it could be a cookie, sessionStorage, whatever
                if (identity) {
                    sessionStorage.setItem("dbp.identity", angular.toJson(identity));
                }
                else {
                    sessionStorage.removeItem("dbp.identity");
                }
            },
            identity: function(force) {
                var deferred = $q.defer();

                if (force === true) {
                    _identity = undefined;
                }

                // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);

                    return deferred.promise;
                }

                // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
                //                   $http.get('/svc/account/identity', { ignoreErrors: true })
                //                        .success(function(data) {
                //                            _identity = data;
                //                            _authenticated = true;
                //                            deferred.resolve(_identity);
                //                        })
                //                        .error(function () {
                //                            _identity = null;
                //                            _authenticated = false;
                //                            deferred.resolve(_identity);
                //                        });

                // for the sake of the demo, we'll attempt to read the identity from localStorage. the example above might be a way if you use cookies or need to retrieve the latest identity from an api
                // i put it in a timeout to illustrate deferred resolution
                var self = this;
                $timeout(function() {
                    _identity = angular.fromJson(sessionStorage.getItem("dbp.identity"));
                    self.authenticate(_identity);
                    deferred.resolve(_identity);
                }, 1000);

                return deferred.promise;
            },
            getUsername: function() {
                if(angular.isDefined(_identity) && _identity != null){
                    var _username = _identity.name;
                    return _username;
                }
            }
        };
    }
])

// authorization service's purpose is to wrap up authorize functionality
// it basically just checks to see if the principal is authenticated and checks the root state
// to see if there is a state that needs to be authorized. if so, it does a role check.
// this is used by the state resolver to make sure when you refresh, hard navigate, or drop onto a
// route, the app resolves your identity before it does an authorize check. after that,
// authorize is called from $stateChangeStart to make sure the principal is allowed to change to
// the desired state
.factory('authorization', ['$rootScope', '$state', 'principal',
    function($rootScope, $state, principal) {
        return {
            authorize: function() {
                return principal.identity()
                .then(function() {
                    var isAuthenticated = principal.isAuthenticated();

                    if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
                        if (isAuthenticated) {
                            $state.go('home'); // user is signed in but not authorized for desired state
                        }
                    }
                });
            }
        };
    }
])

// .run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal',
//     function($rootScope, $state, $stateParams, authorization, principal) {
//         $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
//             $rootScope.toState = toState;
//             $rootScope.toStateParams = toStateParams;
//
//             if (principal.isIdentityResolved()) {
//                 authorization.authorize();
//             }
//         });
//     }
// ])
