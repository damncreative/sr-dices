var app = window.app = angular.module('app', [])

app.controller('AppCtrl', ['$scope', 'Range', 'RollDices', function ($scope, Range, RollDices) {
    $scope.Range = Range
    $scope.amountOfDices = 1
    $scope.rolls = []

    $scope.addRoll = function () {
        var dices = RollDices($scope.amountOfDices)
        console.log(dices)
        var successes = dices.filter(function (d) {
            return d >= 5
        }).length
        var slip = $scope.amountOfDices / 2 <= dices.filter(function (d) {
            return d == 1
        }).length
        var crit = slip && successes == 0
        $scope.rolls.unshift({
            dices: dices,
            successes: successes,
            slip: slip,
            crit: crit,
            date: Date.now()
        })
    }

    $scope.diceClass = function (value) {
        var good = {
            'bg-success': true
        }

        var bad = {
            'bg-danger': true
        }
        return value >= 5 ? good : value == 1 ? bad : 0
    }
}])

app.factory('Range', [function () {
    return function (min, max, step) {
        step = step || 1
        var input = []
        for (var i = min; i <= max; i = i + step) {
            input.push(i)
        }
        return input
    }
}])

app.factory('RollDices', [function () {
    return function (amountOfDices) {
        var dices = []
        for (var i = 0; i < amountOfDices; i++) {
            dices.push(Math.floor((Math.random() * 6) + 1))
        }
        return dices
    }
}])

// Sidenav affixing
setTimeout(function () {
    var $sideBar = $('#sidebar')
    $sideBar.affix({
        offset: {
            top: function () {
                var offsetTop = $sideBar.offset().top
                var sideBarMargin = parseInt($sideBar.children(0).css('margin-top'), 10)
                var navOuterHeight = $('.bs-docs-nav').height()

                return (this.top = offsetTop - navOuterHeight - sideBarMargin)
            },
            // bottom: function () {
            //     return (this.bottom = $('.bs-docs-footer').outerHeight(true))
            // }
        }
    })
}, 100)