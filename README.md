# react-angularjs-bridge
Example of react application hosting an angularJS component and their interoperability. [Click here for a demo](https://react-angularjs-bridge.herokuapp.com/)

<p align="center"> 
    <img src="https://katrotz.space/img/react-angularjs-bridge-image.jpg" alt="React AngularJS Bridge" width="200px"/>
</p>

- Encapsulates the angularJS application using shadow DOM, which means that the react styles will not leak into he angular componen and vice-versa.
- AngularJS inlines some styles in the host document on load. To avoid it configure the ngCsp by adding an attribute to the body
    ```<body data-ng-csp="no-inline-style"></body>``` 
- The angularJS component is an as external library for the react application, hence it is treated as such.

PS: There are more things to consider like intercepting the browser location mutations by angular routing if applicable, caching angular component resources in eg. service worker etc., but it is out of scope for this demo. 
