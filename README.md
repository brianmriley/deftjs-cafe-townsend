# CafeTownsend - Sencha Touch, DeftJS, WASI Sencha Extensions

<br/>
This project is an HTML5/Javascript implementation of the infamous CafeTownsend application. CafeTownsend is a well known application created to demonstrate various MVC frameworks using Flex or ActionScript. There are known ports using Cairngorm, Mate, PureMVC, Spring ActionScript, RobotLegs and Swiz. This implementation uses Sencha Touch, DeftJS, and the WASI Sencha MVC Extensions:

*  [Sencha Touch](http://www.sencha.com/products/touch) - Robust HTML5/JavaScript Framework for Mobile Applications
*  [DeftJS](https://github.com/deftjs/) - DeftJS enhances Sencha's ExtJS and Sencha Touch APIs with additional building blocks that enable large development teams to rapidly create enterprise-scale applications, leveraging best practices and proven patterns discovered by top RIA developers at some of the best consulting firms in the industry.
*  WASI Sencha MVC Extensions - Additional foundational building blocks, infrastructure, and boilerplate code for building Sencha MVC applications. NOTE: Not currently in it's own project and part of this PoC at the moment.

This project's basic idea was pulled from [CafeTownsend AngularJS port by Thomas Burleson](https://github.com/ThomasBurleson/angularJS-CafeTownsend) and the [Sencha Touch Note editor by Jorge Ramon](http://miamicoder.com/2012/how-to-create-a-sencha-touch-2-app-part-5/), but modified in architecture and design to closely align with a typical Flex-based MVC application using Swiz or Parsley. The impetus for this was simple: with enterprises not wanting to move forward with new Flex applications, how do you take the existing skills based on common design patterns and infrastructure and apply them to the HTML5/JavaScript RIA? How do you get a team of Flex developers up and running quickly? Simple, show them a framework and architecture that looks almost identical to what they already know, but in a JavaScript implementation.

---

This port demonstrates the following:

*  Application-Level event bus communication
*  Demonstrates dependency injection for services and stores
*  Demonstrates separation-of-concerns for Model-View-Controller-Service
*  Demonstrates services as mocks and real HTTP  data services
*  Rigorous elimination of logic from View code using Mediators
*  Session Management/Authentication
*  Lazy loading of data services (*with auto-jsonify of external JSON data*)
*  Code versions handwritten in Javascript


## Directory Layout

    index.html              --> contains the bootstrapping and basic styling for the entire app
    app.js                  --> the main application setup and creation

    app/                    --> contains sencha mvc infrastructure

        controller/         --> application, service controllers
        event/              --> application-level events used with event bus
        mediator/           --> view mediators that fullfil the passive view pattern
        model/              --> domain models
        service/            --> concrete http service implementations
            mock/           --> mock http services
        store/              --> data stores containing lists of models
        view/               --> views or screens for the application


    lib/                    --> contains all 3rd party libraries
        deft-08.8/          --> the current deftjs library
        wasi-sencha-ext/    --> wasi sencha mvc extensions

    data/                   --> contains json data for mocking service calls


## Build Notes

TBD

## Pending Features

This effort is still ongoing with some in-progress effort that will provide the following features:

*  Add support for multiple responders to 1 service
*  Add support for dynamic view to mediator wiring
*  Refactor application-level event bus into an IoC managed object
*  Lazy loading of views on demand
*  Better DeftJS support so all dependencies are lazy loaded as opposed to at startup
*  Localization
*  Unit Tests
*  Build Support
