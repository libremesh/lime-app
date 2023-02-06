import fetchMock from "fetch-mock/esm/client";
import { Component } from "preact";

class FetchStory extends Component {
    componentWillMount() {
        this.mock();
    }

    componentWillUnmount() {
        if (fetchMock.__prevProxy === this) {
            this.unmock();
        }
    }

    mock() {
        // Clear mocks from a previous FetchStory
        this.unmock();

        const mocks = this.props.mocks;
        if (mocks) {
            mocks.forEach((mock) => {
                fetchMock.mock({
                    ...mock,
                    response: (url, opts) => {
                        if (!this.props.silent) {
                            console.info("fetch", url, opts);
                        }
                        let result = {
                            body: mock.response,
                            headers: new Headers({
                                "content-type": "plain/text",
                            }),
                        };

                        if (
                            mock.response.hasOwnProperty("body") ||
                            mock.response.hasOwnProperty("status") ||
                            mock.response.hasOwnProperty("headers")
                        ) {
                            result = {
                                ...result,
                                ...mock.response,
                            };
                        }

                        return this.props.throttle
                            ? new Promise((resolve) => {
                                  setTimeout(
                                      () => resolve(result),
                                      this.props.throttle
                                  );
                              })
                            : result;
                    },
                });
            });

            // Allow unmocked requests to fall through
            fetchMock.catch((...args) =>
                fetchMock.realFetch.apply(window, args)
            );
            fetchMock.__prevProxy = this;
        }
    }

    unmock() {
        if (typeof fetchMock.restore === "function") {
            fetchMock.restore();
            delete fetchMock.__prevProxy;
        }
    }

    render() {
        return this.props.children;
    }
}

export default FetchStory;
