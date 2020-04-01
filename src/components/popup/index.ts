import c from './Index.vue';
const component: any = c;

component.install = (vue: any) => {
  vue.component('md-dropper', component);
};

if (typeof window !== 'undefined' && window.Vue) {
  component.install(window.Vue);
}

export default c;
