export default {
  name: 'Page1',
  render() {
    return (
      <div>
        <h1>Page 1</h1>
        <router-link to='/2'>To page 2</router-link>
      </div>
    );
  },
};
