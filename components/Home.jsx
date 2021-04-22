import { Component } from "react";
import { DESCRIPTION, DISCORD_INVITE, INSTALL_COMMAND, SITE_NAME, STATS, GITHUB_LINK } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

export default class Home extends Component {

    constructor(...props) {
        super(...props);

        this.state = {
            downloads: 100,
            stars: 2,
            contributors: 1
        };
    }

    async componentDidMount() {
        const data = await fetch(`${window.location.origin}/api/stats?name=${STATS.MODULE_NAME}&repo=${STATS.GITHUB_REPO}`)
            .then(res => res.json())
            .then(data => ({ downloads: data.downloads, stars: data.stars, contributors: data.contributors }))
            .catch(() => ({ downloads: 100, stars: 2, contributors: 1 }));

        this.setState(data);
    }

    render() {
        return (
            <>
                <section className="bg-blue-500">
                    <div className="container mx-auto">
                        <div className="py-3">
                            <div>
                                <h1 className="text-center lg:text-9xl text-6xl font-bold leading-none text-white pt-20 logoholder">{SITE_NAME}</h1>
                            </div>

                            <div className="flex justify-center align-center mt-20 mb-20">
                                <code className="shadow-xl text-white bg-gray-600 font-bold leading-none p-3 rounded-md">
                                    <h1 className="text-lg">{INSTALL_COMMAND}</h1>
                                </code>
                                <FontAwesomeIcon icon={faClipboard} className="w-10 h-10 text-white hover:text-gray-300 my-1 cursor-pointer" onClick={() => navigator.clipboard.writeText(INSTALL_COMMAND).catch(e => {})} />
                            </div>

                            <div className="buttons flex space-x-2 justify-center align-center mb-10">
                                <a className="py-2 px-6 bg-gray-50 hover:bg-gray-200 text-sm text-gray-900 font-bold rounded-l-xl rounded-t-xl transition duration-400" href={GITHUB_LINK}>GitHub</a>
                                <a className="py-2 px-6 bg-blue-700 hover:bg-blue-900 text-sm text-white font-bold rounded-l-xl rounded-t-xl transition duration-400" href={DISCORD_INVITE}>Discord</a>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="bg-gray-900">
                    <div className="container mx-auto">
                        <div className="py-5 lg:flex lg:items-center lg:justify-center lg:align-center lg:space-x-20 px-3">
                            <div className="text-white">
                                <h1 className="text-2xl text-center font-bold">About</h1>
                                <p dangerouslySetInnerHTML={{ __html: DESCRIPTION }}></p>
                            </div>

                            <div className="text-white">
                                <h1 className="text-2xl text-center font-bold">Statistics</h1>
                                <ul style={{ listStyle: "disc" }}>
                                    <li className="ml-10">{this.state.downloads.toLocaleString()} Download{this.state.downloads === 1 ? "" : "s"}</li>
                                    <li className="ml-10">{this.state.stars.toLocaleString()} Star{this.state.stars === 1 ? "" : "s"}</li>
                                    <li className="ml-10">{this.state.contributors.toLocaleString()} Contributor{this.state.contributors === 1 ? "" : "s"}</li>
                                </ul>

                                <p>and growing!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}