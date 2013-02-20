# CafeTownsend - Sencha Touch & DeftJS

<br/>
This project is an HTML5/Javascript implementation of the infamous CafeTownsend application. CafeTownsend is a well known application created to demonstrate various MVC frameworks using Flex or ActionScript. There are known ports using Cairngorm, Mate, PureMVC, Spring ActionScript, RobotLegs and Swiz.

Recently a developer contributed an HTML5 port of the application using the javascript [Spine](http://spinejs.com/) MVC framework.

*  [CafeTownsend - Javascript with AngularJS Ioc]()      … blog pending.
*  [CafeTownsend - Javascript with SpineJS MVC](http://www.websector.de/blog/2011/12/31/spine-js-cafe-townsend-example/)
*  [CafeTownsend - Flex with Swiz IoC](http://www.gridlinked.info/swiz-localization-l10n-logging/)
*  [CafeTownsend - Flex with Mate MVC](http://www.websector.de/blog/2010/03/12/mate-cafe-townsend-example-updated-for-using-flex-4/)


This project contributes a superior port of the HTML5 CafeTownsend application;using the [Angular.js IoC](http://angularjs.org/) framework.


![Screenshot](https://github.com/ThomasBurleson/angularJS-CafeTownsend/raw/master/app/assets/images/screens.png)<br/>


Click to play with the live [CafeTownsend Demo](http://thomasburleson.github.com/cafetownsend/index.html).



---

AngularJS is an amazing IoC MVVM framework for Javascript applications. Supporting pageless architectures, advanced data binding, HTML templating, and dependency injection… AngularJS is strikingly similar to the Flex [Swiz IoC framework](http://swizframework.org/).


Note: Subsequent CSS version will be rewritten in [{Less}](http://lesscss.org/) for dynamic stylesheet language support. <br/>
The AngularJS port also demonstrates significant advantages over the SpineJS implementation:

*  Pageless Architecture
*  Improved routing with `deep link` support
*  Significant reduction in HTML template fragments
*  Rigorous elimination of Javascript code from HTML
*  Inter-controller data sharing
*  Session Management/Authentication
*  Lazy loading of data services (*with auto-jsonify of external JSON data*)
*  Code versions handwritten in Javascript
*  Demonstrates `separation-of-concerns` for Model-Views-Controllers
*  Demonstates `dependency injection` for services and Controllers
*  Demonstrates best practices for `Model-View-View-Model (MVVM)` architectures



## Directory Layout

    app/                  --> all of the files to be used in production

      CafeTownsend.html   --> application file (the main html template file of the app)

	    assets/

        css/              --> css files
          styles.css      --> default stylesheet

        images/           --> image files

        tmpl/         --> angular view partials (partial html templates)
          login.html
          employees.html
          employee_edit.html

        data/
          members.json      --> external, simple JSON data

        js/
          CafeTownsend.js --> application source code
          bootstrap.js    --> asynch loader and initializer (using head.js)

          lib/
            /angular
                angular.js      --> AngularJS v0.10.5 IoC Framework

            jquery.min.js       --> jQuery v1.7 minified
            head.load.min.js    --> asynch script loader
            namespace.min.js    --> namespace support for `package` class organization
            uuid.js             --> uuid generator
    src/
      Cakefile              --> cake build script

      coffee/			          --> master developer files for service & controller classe
        bootstrap.coffee  	--> asynch loader and initializer (using head.js)

		    mindspace/cafetownsend/
            CafeTownsendApp.coffee --> application class to establish routes and session

      			controller/
      				SessionController.coffee
      				LoginController.coffee
      				EmployeeController.coffee
      				EmployeeEditController.coffee

      			service/
      				EmployeeManager.coffee
      				SessionService.coffee

      	  	com/mindspace/angular/
        			directive/
        				EventDirectives.coffee   --> doubleClick, focuse directives

    scripts/              --> handy shell/js/ruby scripts
      web-server.js       --> simple development webserver based on node.js


## Build Notes


Developers should use the cake script to build, consolidate, and minify the custom Javascript into Cafetownsend.min.js

    cd ./src; cake build;

*  CafeTownsend.js - consolidate application code
*  bootstrap.js    - asynch loader and initializer (using head.js)

## Pending Features

This effort is still ongoing with some in-progress effort that will provide the following features:

*  Provide `loading indicator` as data load indicator
*  Support deep linking with synch data loads
*  Convert disorganized CSS to LESS
*  Build CafeTownsend Tests/Scenarios
*  Create view slide transitions

## Contact

Stay tuned for upcoming blog article and video on the [GridLinked](http://www.gridlinked.info) blog.<br/>
For more information on angular please check out http://angularjs.org/
