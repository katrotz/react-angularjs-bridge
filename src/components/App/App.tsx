import React from 'react';
import ReactAngularBridge from '../ReactAngularBridge/ReactAngularBridge';
import './App.css';
import logo from './logo.svg';

interface IAppComponentState {
  angularComponentEnabled: boolean;
  logsStack: Array<{message: string, prefix: string, time: Date}>
}

class App extends React.Component<any, IAppComponentState> {
  public state: IAppComponentState = {
    angularComponentEnabled: false,
    logsStack: []
  };

  public render() {
    const bindings = {
      message: 'Toto, I\'ve a feeling we\'re not in Kansas anymore',
      onLog: (message: string) => this.log(message, 'angular'),
      onChange: () => this.log('Notified about a state change')
    };

    const appName = 'angularWidget';
    const appTemplate = '<angular-widget message="message" on-change="onChange()" on-log="onLog(message)"></angular-widget>';

    const logStack = this.state.logsStack.slice().reverse();

    return (
      <div className="app">
        <div className="content">
          <section className="react-section">
            <img src={logo} className="logo" alt="logo"/>
            <h3 className="title">react application</h3>
            <div>
              <button onClick={this.toggleAngularComponent}>Toggle angular component</button>
            </div>
          </section>

          <section className="angular-section">
            {this.state.angularComponentEnabled &&
            <ReactAngularBridge appName={appName} template={appTemplate} bindings={bindings}/>}
          </section>
        </div>

        <aside className="aside">
          <code className="logs-section">
            {logStack.map((log, index) => (
              <p key={index} className="log-entry">
                <span className="index">{log.time.toLocaleTimeString()}</span>
                <span className={`prefix ${log.prefix}`}>{log.prefix}</span>
                <span className="message">{log.message}</span>
              </p>
            ))}
          </code>
        </aside>
      </div>
    );
  }

  protected toggleAngularComponent = () => {
    const angularComponentEnabled = !this.state.angularComponentEnabled;

    this.setState({angularComponentEnabled});

    this.log(`Toggled angular to state ${angularComponentEnabled}`)
  };

  protected log(message: string, prefix: string = 'react'): App {
    const logsStack = this.state.logsStack; // TSWTF
    const time = new Date();

    logsStack.push({message, prefix, time});

    this.setState({logsStack});

    return this;
  }
}

export default App;
