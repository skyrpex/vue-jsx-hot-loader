export default {
  name: 'Button',
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  render() {
    return (
      <button onClick={e => this.$emit('click', e)} disabled={this.disabled}>
        {this.$slots.default}
      </button>
    );
  },
};
