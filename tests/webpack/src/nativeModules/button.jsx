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
        {/* FIXME Try adding and then removing the TEST text. */}
        {/* It won't be removed, just added as many times as you save. */}
        {this.$slots.default} TEST
        {/* Workaround: wrap the slot using a node like a span */}
        {/* <span>{this.$slots.default}</span> TEST */}
      </button>
    );
  },
};
