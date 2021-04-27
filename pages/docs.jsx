import { Component } from "react";
import Docs from "../components/Docs";
import { DOCUMENTATION_SOURCE } from "../config";
import Loader from "../components/Loader";
import ErrorPage from "../components/docs/Error";

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
            .then((res) => res.json())
            .then((data) => {
                // set last fetched doc in local storage
                window.localStorage.setItem("docs", JSON.stringify(data));

                this.setState({
                    loading: false,
                    docs: data
                });

                console.log("Successfully fetched docs!");
            })
            .catch(() => {
                // load the cached documentation if we can't fetch
                const p = (d) => {
                    try {
                        return JSON.parse(d);
                    } catch {
                        return null;
                    }
                };
                this.setState({ loading: false, docs: p(window.localStorage.getItem("docs")) });
                console.warn("Could not fetch docs!");
            });
    }

    render() {
        if (this.state.loading) return <Loader />;
        return this.state.docs ? <Docs docs={this.state.docs} /> : <ErrorPage />;
    }
}
