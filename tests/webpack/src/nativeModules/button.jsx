export default {
  name: 'Button',
  render() {
    return (
      <button onClick={(e) => this.$emit('click', e)}>
        {this.$slots.default}
      </button>
    )
  }
}
