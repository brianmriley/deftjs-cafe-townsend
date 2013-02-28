# CafeTownsend
<<<<<<< HEAD

### Sencha Touch, DeftJS, & WASI Sencha Extensions

This project is an HTML5/Javascript implementation of the infamous CafeTownsend application. CafeTownsend is a well known application created to demonstrate various MVC frameworks using Flex or ActionScript. There are known ports using Cairngorm, Mate, PureMVC, Spring ActionScript, RobotLegs and Swiz. This implementation uses Sencha Touch, DeftJS, and the WASI Sencha MVC Extensions:

*  [Sencha Touch](http://www.sencha.com/products/touch) - Robust HTML5/JavaScript Framework for Mobile Applications
*  [DeftJS](https://github.com/deftjs/) - DeftJS enhances Sencha's ExtJS and Sencha Touch APIs with additional building blocks that enable large development teams to rapidly create enterprise-scale applications, leveraging best practices and proven patterns discovered by top RIA developers at some of the best consulting firms in the industry.
*  WASI Sencha MVC Extensions - Additional foundational building blocks, infrastructure, and boilerplate code for building Sencha MVC applications. **NOTE**: Not currently in it's own project and part of this PoC at the moment.
=======

### Sencha Touch, DeftJS, & WASI Sencha Extensions

This project is an HTML5/Javascript implementation of the infamous CafeTownsend application.
CafeTownsend is a well known application created to demonstrate various MVC frameworks using Flex or ActionScript.
There are known ports using Cairngorm, Mate, PureMVC, Spring ActionScript, RobotLegs and Swiz.
This implementation uses Sencha Touch, DeftJS, and the WASI Sencha MVC Extensions:

*  [Sencha Touch](http://www.sencha.com/products/touch) - Robust HTML5/JavaScript Framework for Mobile Applications
*  [DeftJS](https://github.com/deftjs/) - DeftJS enhances Sencha's ExtJS and Sencha Touch APIs with additional
building blocks that enable large development teams to rapidly create enterprise-scale applications, leveraging best
practices and proven patterns discovered by top RIA developers at some of the best consulting firms in the industry.
*  WASI Sencha MVC Extensions - Additional foundational building blocks, infrastructure, and boilerplate code for
building Sencha MVC applications. **NOTE**: Not currently in it's own project and part of this PoC at the moment.
>>>>>>> comments and readme updates

# Background 

This application's basic concepts, UI, and use cases were pulled from a combination of
[CafeTownsend AngularJS port by Thomas Burleson](https://github.com/ThomasBurleson/angularJS-CafeTownsend) 
and the [Sencha Touch Note editor by Jorge Ramon](http://miamicoder.com/2012/how-to-create-a-sencha-touch-2-app-part-5/), 
but modified in architecture and design to closely align with a typical Flex-based MVC application using Swiz or Parsley. 
<<<<<<< HEAD

The impetus for this was simple...

First, with enterprises hesitant to move forward with new Flex applications, 
how do you take your existing Flex & ActionScript expertise and apply them to the HTML5/JavaScript RIA? 
How do development managers get their team of Flex developers up and running quickly in this space? Simple, 
show them a framework and architecture that looks almost identical to what they already know, but in a JavaScript 
implementation.

Second, with a strong desire to create applicaitons for both the desktop and mobile platforms, how can we structure
an applicaiton with as much resuabuility and portability in mind as possible; how do we decrese the amount of unique code 
we need to write for both form factors and simply reuse the application and business logic?

=======

The impetus for this was simple...

First, with enterprises hesitant to move forward with new Flex applications, 
how do you take your existing Flex & ActionScript expertise and apply them to the HTML5/JavaScript RIA? 
How do development managers get their team of Flex developers up and running quickly in this space? Simple, 
show them a framework and architecture that looks almost identical to what they already know, but in a JavaScript 
implementation.

Second, with a strong desire to create applications for both the desktop and mobile platforms, how can we structure
an application with as much reusability and portability in mind as possible; how do we decrease the amount of unique code
we need to write for both form factors and simply reuse the application and business logic?

>>>>>>> comments and readme updates
# Goals 

This port demonstrates the following:

*  Application-Level event bus communication
*  Dependency injection of services and stores using DeftJS
*  Separation-of-concerns for Model-View-Controller-Service
*  Services as mocks and real HTTP data services
*  Rigorous elimination of logic from View code using Mediators
*  Session Management/Authentication
*  Lazy loading of data services (*with auto-jsonify of external JSON data*)
*  Code versions handwritten in Javascript with extensive class and method level comments

# MVCS Architecture

Since Sencha ExtJS and Sencha Touch are based on the same core libraries, the MVC architecture was designed with
reusability and portability in mind for applications that need to co-exist on the desktop and mobile platforms without 
writing 100% unique code bases for each. For the most part, views and their mediators need to be specific to their 
<<<<<<< HEAD
platform, whereas the applicaiton and business logic should be reusable by all.

### Views
Views are used eclusively for UI layout using Sencha components. There's no logic, event handling, or data marshalling
of any kind in the views -- they are "dumb" and simply display whatever they're given or instructed to do from their accompanying mediator.
It is expedcted that views will need to be partly or entirely created from scratch for each platform. 

### Mediators
Mediators fullfil the passive view pattern and are entirely responsible for a single view and it's subcomponents; 
it is within a mediator that we handle view logic, events and user interactions, and data marshalling. It is expected 
that mediators will need to be partly or entirely created from scratch for each platform. It may also be possible
to create base mediators for some desktop and mobile views for additional reusability, leaving the specifics
to the concrete, platform implementations.

Mediators are also aware of the applicaiton-level event bus and can thus partake in dispatching and listening 
to it's events. In order to facilitate a separation of concerns between an object that manages a view (mediators) 
and an object that's responsible for executing services and working with model data (controllers), the mediators 
simply broadcast events that controllers handle in order to execute services.

Simply put, while application aware, mediators numero uno role is to manage it's specific view buddy.

### Controllers
Controllers act as the front door to services; they handle application-level events and execute the appropriate 
service. When a service succeeds or fails, it is the controller's responsibility to update model and store data
(applicaiton state) and dispatch events alerting the rest of the applicaiton to the state of a service call.

In addition, controllers can be used to handle applicaiton-level processes and logic as they are in fact applicaiton
aware and often "control" the flow and orchestration of the application.

### Events
TBD...Vessels for application-level events.

### Services
TBD

### Models & Stores
TBD

=======
platform, whereas the application and business logic should be reusable by all.

![Screenshot](ref/images/sencha-mvcs-architecture.png)

### Views
Views are used exclusively for UI layout using Sencha components. There's no logic, event handling, or data marshaling
of any kind in the views -- they are "dumb" and simply display whatever they're given or instructed to do from their
accompanying mediator. It is expected that views will need to be partly or entirely created from scratch for each
platform.

### Mediators
Mediators fulfil the passive view pattern and are entirely responsible for a single view and it's sub-components;
it is within a mediator that we handle view logic, events and user interactions, and data marshaling. It is expected 
that mediators will need to be partly or entirely created from scratch for each platform. It may also be possible
to create base mediators for some desktop and mobile views for additional reusability, leaving the specifics
to the concrete, platform implementations.

Mediators are also aware of the application-level event bus and can thus partake in dispatching and listening 
to it's events. In order to facilitate a separation of concerns between an object that manages a view (mediators) 
and an object that's responsible for executing services and working with model data (controllers), the mediators 
simply broadcast events that controllers handle in order to execute services.

Simply put, while application aware, mediators numero uno role is to manage it's specific view buddy.

### Controllers
Controllers act as the front door to services; they handle application-level events and execute the appropriate 
service. When a service succeeds or fails, it is the controller's responsibility to update model and store data
(application state) and dispatch events alerting the rest of the application to the state of a service call.

In addition, controllers can be used to handle application-level processes and logic as they are in fact application
aware and often "control" the flow and orchestration of the application.

### Events
TBD...Vessels for application-level events.

### Services
TBD

### Models & Stores
TBD

>>>>>>> comments and readme updates
# Directory Layout

    index.html              --> contains the bootstrapping and basic styling for the entire app
    app.js                  --> the main application setup and creation

    app/                    --> contains sencha mvc infrastructure

        controller/         --> application, service controllers
        event/              --> application-level events used with event bus
        mediator/           --> view mediators that fulfil the passive view pattern
        model/              --> domain models
        service/            --> concrete data service implementations
            mock/           --> mock data services
        store/              --> data stores containing lists of models
        view/               --> ui views or screens for the application


    lib/                    --> contains all 3rd party libraries
        deft-08.8/          --> the current deftjs library
        wasi-sencha-ext/    --> wasi sencha mvc extensions

    data/                   --> contains json data for mocking service calls

## Pending Features

This effort is still ongoing with some in-progress effort that will provide the following features:

<<<<<<< HEAD
*  Add support for multiple responders to 1 service - Sencha MVC Extenstions
*  Add support for dynamic view to mediator wiring - Sencha MVC Extenstions
*  Refactor application-level event bus into an IoC managed object - Sencha MVC Extenstions
=======
*  Add support for multiple responders to 1 service - Sencha MVC Extensions
*  Add support for dynamic view to mediator wiring - Sencha MVC Extensions
*  Refactor application-level event bus into an IoC managed object - Sencha MVC Extensions
>>>>>>> comments and readme updates
*  Lazy loading of views on demand - CafeTownsend
*  Better DeftJS support so all dependencies are lazy loaded as opposed to at startup - CafeTownsend
*  Localization - CafeTownsend
*  Unit Tests - CafeTownsend
*  Build Support - CafeTownsend
