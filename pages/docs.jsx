import { Component } from "react";
import Docs from "../components/Docs";
import { DOCUMENTATION_SOURCE } from "../config";
import Loader from "../components/Loader";

export default class DocsPage extends Component {

    constructor(...props) {
        super(...props);

        this.state = {
            loading: true,
            docs: null
        };
    }

    componentDidMount() {
        console.log("fetching docs...");

        fetch(DOCUMENTATION_SOURCE)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    loading: false,
                    docs: data
                });

                console.log("Successfully fetched docs!");
            })
            .catch(() => {
                this.setState({ loading: false, docs: null });
                console.warn("Could not fetch docs!");
            });
    }

    render() {
        if (this.state.loading) return <Loader />;
        return <Docs docs={this.state.docs} />;
    }

}