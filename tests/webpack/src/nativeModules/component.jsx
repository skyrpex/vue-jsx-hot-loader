import Button from './Button.jsx'

export default {
  name: 'MyNativeJsxComponent',
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
      <Button onClick={this.toggleName}>Toggle!</Button>
    </div>;
  },
};
