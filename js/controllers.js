angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ui.router', 'ngAnimate', 'angular-flexslider'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.changecontent("home"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Home"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.options = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.initClass = function () {
      $(function () {
        $scope.addClass = $('.btn-default.active').parent('td').addClass('.tdactive');
      });
    };

    $scope.$watch('active', function () {
      angular.element(document).find('uib-datepicker td').addClass('active');
    });

    $scope.initClass();

    // Disable weekend selection
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
      $scope.options.minDate = $scope.options.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow2 = new Date(tomorrow);
    afterTomorrow2.setDate(tomorrow.getDate() + 2);
    var afterTomorrow3 = new Date(tomorrow);
    afterTomorrow3.setDate(tomorrow.getDate() + 3);
    $scope.events = [
      {
        date: tomorrow,
        status: 'active'
      },
      {
        date: afterTomorrow,
        status: 'active'
      },
      {
        date: afterTomorrow2,
        status: 'active'
      },
      {
        date: afterTomorrow3,
        status: 'active4'
      }
    ];

    $scope.beTheChange = function (dtdata) {
      var i = 1;
      _.each($scope.events, function (data) {
        data.date = new Date(dtdata).setDate(new Date(dtdata).getDate() + i);
        i++;
      });
    };

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    }
})

.controller('FormCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.changecontent("form"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Form"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.formSubmitted = false;

    $scope.submitForm = function(data) {
        console.log(data);
        $scope.formSubmitted = true;
    };
})

.controller('headerctrl', function($scope, TemplateService) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $.fancybox.close(true);
})

.controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

    $scope.changeLanguage = function() {
        console.log("Language CLicked");

        if (!$.jStorage.get("language")) {
            $translate.use("hi");
            $.jStorage.set("language", "hi");
        } else {
            if ($.jStorage.get("language") == "en") {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                $translate.use("en");
                $.jStorage.set("language", "en");
            }
        }
        //  $rootScope.$apply();
    };


})

;
