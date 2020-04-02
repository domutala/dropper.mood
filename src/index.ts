import * as mComponents from './components';

export const MdDropper = mComponents.MdDropper;

const install = (Vue: any) => {
  // Components
  Object.values(mComponents).forEach(mComponent => {
    Vue.use(mComponent);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

// export default install
export default install;
