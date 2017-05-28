export default {
  name: 'MyJsxComponent',
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
      <br /><strong>Native module, untransformed by babel</strong><br />
      <span>Hello, {this.name}!!</span>
      <button onClick={this.toggleName}>Toggle!!</button>
    </div>;
  },
};
