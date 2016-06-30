
'use strict';

define(['app'], function (app) {

	var systemJSON = function ($rootScope) {

		this.serviceScenario = {
				"site": "NRBCB",
				"clusters": [
				             {
				            	 "cluster": "RDBMS",
				            	 "visible": "true",
				            	 "nodes": [
				            	           {
				            	        	   "node": "POSTGRESQL",
				            	        	   "visible": "true",
				            	        	   "ip": "10.16.16.31",
				            	        	   "services": [
				            	        	                {
				            	        	                	"service": "postgresql-9.3",
				            	        	                	"visible": "true",
				            	        	                	"port": "5432"
				            	        	                }
				            	        	                ]
				            	           },
				            	           {
				            	        	   "node": "MYSQL",
				            	        	   "visible": "true",
				            	        	   "ip": "192.168.0.232",
				            	        	   "services": [
				            	        	                {
				            	        	                	"service": "mysql",
				            	        	                	"visible": "true",
				            	        	                	"port": "1111"
				            	        	                }
				            	        	                ]
				            	           },
				            	           {
				            	        	   "node": "ORACLE",
				            	        	   "visible": "false",
				            	        	   "ip": "192.168.0.232",
				            	        	   "services": [
				            	        	                {
				            	        	                	"service": "Oracle 11g",
				            	        	                	"visible": "true",
				            	        	                	"port": "1111"
				            	        	                }
				            	        	                ]
				            	           }
				            	           ]
				             },
				             {
				            	 "cluster": "NoSQL DB",
				            	 "visible": "true",
				            	 "nodes": [
				            	           {
				            	        	   "node": "COUCHBASE",
				            	        	   "visible": "true",
				            	        	   "ip": "10.16.16.31",
				            	        	   "services": [
				            	        	                {
				            	        	                	"service": "couchbase-server",
				            	        	                	"visible": "true",
				            	        	                	"port": "8091"
				            	        	                }
				            	        	                ]
				            	           },
				            	           {
				            	        	   "node": "COUCHBASE",
				            	        	   "visible": "true",
				            	        	   "ip": "192.168.0.234",
				            	        	   "services": [
				            	        	                {
				            	        	                	"service": "couchbase-server",
				            	        	                	"visible": "true",
				            	        	                	"port": "8091"
				            	        	                }
				            	        	                ]
				            	           }
				            	           ]
				             },
				             {
				            	 "cluster": "CSB",
				            	 "visible": "true",
				            	 "nodes": [
				            	           {
				            	        	   "node": "CSBPlatformServer",
				            	        	   "visible": "true",
				            	        	   "ip": "10.16.16.31",
				            	        	   "services": [
				            	        	                {
				            	        	                	"service": "CSBPlatformServer",
				            	        	                	"visible": "true",
				            	        	                	"port": "4231"
				            	        	                }
				            	        	                ]
				            	           },
				            	           {
				            	        	   "node": "CSBPlatformWebApp",
				            	        	   "visible": "false",
				            	        	   "ip": "192.168.0.232",
				            	        	   "services": [
				            	        	                {
				            	        	                	"service": "tomcat",
				            	        	                	"visible": "true",
				            	        	                	"port": "8080"
				            	        	                }
				            	        	                ]
				            	           }
				            	           ]
				             },
				             {
				            	 "cluster": "CBS",
				            	 "visible": "true",
				            	 "nodes": [
				            	           {
				            	        	   "node": "TCP",
				            	        	   "visible": "true",
				            	        	   "ip": "10.16.16.32",
				            	        	   "services": [
				            	        	                {
				            	        	                	"service": "TCP",
				            	        	                	"visible": "true",
				            	        	                	"port": "7778"
				            	        	                }
				            	        	                ]
				            	           },
				            	           {
				            	        	   "node": "RabbitMQ",
				            	        	   "visible": "false",
				            	        	   "ip": "192.168.0.232",
				            	        	   "services": [
				            	        	                {
				            	        	                	"service": "rabbitmq-server",
				            	        	                	"visible": "false",
				            	        	                	"port": "5555"
				            	        	                }
				            	        	                ]
				            	           }
				            	           ]
				             }
				             ]
		};


	};

	app.service('systemJSON', ['$rootScope', systemJSON]);

});

