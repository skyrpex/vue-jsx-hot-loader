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
  // eslint-disable-next-line no-unused-vars
  render(h) {
    return <div>
      <span>(esm) {this.greeting}, world!!</span>
      <button onClick={this.toggleName}>Toggle!!</button>
    </div>;
  },
};
