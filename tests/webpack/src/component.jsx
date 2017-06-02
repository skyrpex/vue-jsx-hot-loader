// eslint-disable-next-line no-unused-vars
import NativeModule from './nativeModules/component.jsx';

export default {
  name: 'MyJsxComponent',
  props: {
    myProp: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      name: 'world',
    };
  },
  computed: {
    test() {
      return this.name.split('l');
    },
    test2() {
      return this.name.split('l');
    },
  },
  methods: {
    toggleName() {
      this.name = this.name === 'world' ? 'alls' : 'world';
    },
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
    return <div>
      <span>(cjs) Hello, {this.name}!!</span>
      <button onClick={this.toggleName}>Toggle!!</button>
      <NativeModule />
    </div>;
  },
};
