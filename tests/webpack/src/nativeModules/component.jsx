import Button from './button.jsx';

export default {
  name: 'MyNativeJsxComponent',
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      greeting: 'Hello',
    };
  },
  methods: {
    toggleName() {
      this.greeting = this.greeting === 'Hello' ? 'Salut' : 'Hello';
    },
  },
  render() {
    return <div>
      <span>(esm) {this.greeting}, world!!</span>
      <Button disabled={this.disabled} onClick={this.toggleName}>Toggle!</Button>
    </div>;
  },
};
