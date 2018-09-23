import React from 'react';
import angular from 'angular';

interface IComponentProps {
  appName: string; // The angular module name
  template: string; // The angular root component considering bindings are set on $rootScope `<my-component></my-component>`
  bindings?: IComponentBindings; // The optional bindings object
}

interface IComponentBindings {
    [key:string]: any
}

class ReactAngularBridge extends React.Component<IComponentProps, {}> {
  protected ref: React.RefObject<HTMLDivElement> = React.createRef();

  protected $rootScope: angular.IRootScopeService;

  protected $shadowRoot: ShadowRoot;

  public get $element(): HTMLDivElement | null {
      return this.ref.current;
  }

  public componentDidMount(): void {
      this.createApp().bootstrap();
  }

  public componentDidUpdate(prevProps: IComponentProps) {
    return this.updateBindings();
  }

  public componentWillUnmount(): void {
      this.destroyNgApp();
  }

  public render(): React.ReactNode {
    return (
      <div ref={this.ref}/>
    );
  }

  protected createApp(): ReactAngularBridge {
      if (!this.$element) return this.onElementMissing();

      angular.module(this.props.appName)
          .run(['$rootScope', ($rootScope: angular.IRootScopeService) => {
              this.$rootScope = $rootScope;

              this.updateBindings();
          }]);

      this.$shadowRoot = this.$element.attachShadow({ mode: 'closed' }); // TODO createShadowRoot for IE compatibility

      this.$shadowRoot.innerHTML = this.props.template;

      return this;
  }

  protected bootstrap(): ReactAngularBridge {
      if (!this.$element) return this.onElementMissing();
      if (!this.$shadowRoot.firstElementChild) return this.onElementMissing();

      angular.bootstrap(this.$shadowRoot.firstElementChild, [this.props.appName]);

      return this;
  }

  protected destroyNgApp(): ReactAngularBridge {
      this.$rootScope.$destroy();

      if (this.$shadowRoot) {
        while (this.$shadowRoot.firstChild) {
          this.$shadowRoot.removeChild(this.$shadowRoot.firstChild);
        }
      }

      return this;
  }

  protected updateBindings(): ReactAngularBridge {
      const bindings = this.props.bindings || {};

      Reflect.ownKeys(bindings).forEach((key:string) => this.setBinding(key, bindings[key]));

      return this;
  }

  protected setBinding(key: string, value: any): ReactAngularBridge {
      this.$rootScope[key] = value;

      return this;
  }

  protected onElementMissing(): ReactAngularBridge {
      throw new Error(`Could not create the angularJS application due to a missing element reference`);

      return this; // ☠ The caller has to implement Error Boundaries to prevent it
  }
}

export default ReactAngularBridge;
