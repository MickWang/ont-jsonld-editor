import SButton from './packages/button'
import JsonLdViewer from './packages/JsonLDViewer'
import JsonLdEditor from './packages/JsonLdEditor'


const components = {
    SButton: SButton,
    JsonLdViewer,
    JsonLdEditor
}

const install = function (Vue, options = {}) {

  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
}

export default install
