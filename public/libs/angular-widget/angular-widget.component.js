(function(angular) {
  const DOCUMENT_ROOT = '/libs';
  const COMPONENT_PATH = `${DOCUMENT_ROOT}/angular-widget`;

  class AngularWidgetController {
    static get $inject() {
      return ['$element', '$document', '$q'];
    }

    constructor($element, $document, $q) {
      this.$element = $element;
      this.$document = $document;
      this.$q = $q;

      this.assetsLoaded = false;
      this.showMessage = false;

      this.loadResources()
        .finally(this.onResourcesLoaded.bind(this));
    }

    get componentPath() {
      return COMPONENT_PATH;
    }

    $onInit() {
      this.log(`Component initialized`);
    }

    $onChanges() {
      this.log(`Component received bindings`);
    }

    $postLink() {
      this.log(`Component linked`);
    }

    $onDestroy() {
      this.log(`Component destroyed`);
    }

    toggleShowMessage() {
      this.showMessage = !this.showMessage;

      this.log(`Toggled message display ${this.showMessage ? 'on' : 'off'}`);

      this.onChange();
    }

    loadResources() {
      const loadStylesheet = (path) => {
        return new this.$q((resolve, reject) => {
          const link = this.$document[0].createElement('link');

          link.href = path;
          link.rel = 'stylesheet';

          link.onload = resolve;
          link.onerror = reject;

          this.$element.after(link);
        });
      };

      return this.$q.all([
        loadStylesheet(`${COMPONENT_PATH}/angular-widget.component.css`),
        loadStylesheet(`${COMPONENT_PATH}/assets/angular-csp.css`)
      ]);
    }

    onResourcesLoaded() {
      this.log(`External resources loaded`);
      this.assetsLoaded = true;
    }

    log(message) {
      this.onLog({message});

      return this;
    }
  }

  angular.module('angularWidget', [])
    .component('angularWidget', {
      bindings: {
        message: '<',
        onChange: '&',
        onLog: '&'
      },
      controller: AngularWidgetController,
      templateUrl: `${COMPONENT_PATH}/angular-widget.component.html`
    });
})(window.angular);
