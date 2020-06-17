
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
      const name = child.$options.name;
  
      if (name === componentName) {
        child.$emit.apply(child, [eventName].concat(params));
      } else {
        broadcast.apply(child, [componentName, eventName].concat([params]));
      }
    });
  }
  export default {
    methods: {
        /**
         * 向上寻找name为指定componentName的组件，在该组件上使用$emit触发事件，该组件上使用$on注册事件的监听
         * @param {*} componentName 
         * @param {*} eventName 
         * @param {*} params 
         */
      dispatch(componentName, eventName, params) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;
  
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
  
          if (parent) {
            name = parent.$options.name;
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
          },
        /**
         * 向下寻找name为指定componentName的组件，在该组件上使用$emit触发事件，该组件上使用$on注册事件的监听
         * @param {*} componentName 
         * @param {*} eventName 
         * @param {*} params 
         */
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };
  