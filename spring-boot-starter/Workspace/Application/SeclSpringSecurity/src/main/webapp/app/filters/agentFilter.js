
'use strict';

define(['app'], function (app) {

    var agentFilter = function () {

        return function (agents, filterValue) {
            if (!filterValue) return agents;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < agents.length; i++) {
                var agent = agents[i];
                if (agent.loginID.toLowerCase().indexOf(filterValue) > -1 ||
                    agent.bankID.toLowerCase().indexOf(filterValue) > -1 ||
                    agent.branchID.toLowerCase().indexOf(filterValue) > -1 ||
                    agent.agentName.toLowerCase().indexOf(filterValue) > -1 ||
                    agent.deviceID.toLowerCase().indexOf(filterValue) > -1 ||
                    agent.status.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(agent);
                }
            }
            return matches;
        };
    };

    app.filter('agentFilter', agentFilter);

});