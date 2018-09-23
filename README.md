# react-angularjs-bridge
    Example of react application hosting an angularJS component and their interoperability.

<img src="https://raw.githubusercontent.com/katrotz/react-angularjs-bridge/master/public/hero.jpg" alt="React AngularJS Bridge"/>

- Encapsulates the angularJS application using shadow DOM, which means that the react styles will not leak into he angular componen and vice-versa.
- Requires to load angularJS library into the page (react app requires it to configure the ng app)
- AngularJS inlines some styles in the host document on load. To avoid it configure the ngCsp by adding an attribute to the body
    ```<body data-ng-csp="no-inline-style"></body>``` 
- The angularJS component is treated as external library for the react application, hence loaded separately. 
