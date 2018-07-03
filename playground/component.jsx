export default {
    data() {
        return {
            name: "world",
        };
    },
    computed: {
        uppercaseName() {
            return this.name.toUpperCase();
        },
    },
    render() {
        return <h1>Hello {this.uppercaseName}!</h1>;
    },
};
