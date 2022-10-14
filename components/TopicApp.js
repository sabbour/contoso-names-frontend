import React, { Component } from 'react';
import TopicItem from './TopicItem';
import TopicFooter from './TopicFooter';

class TopicApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topics: [],
            settings: {
                ENTER_KEY: 13
            },
            newTopic: ''
        }

        this.handleSurpriseClick = this.handleSurpriseClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async callApi(method, routeUrl, body) {
        const res = await fetch(routeUrl, {
            method: method,
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            throw new Error(`Failed to call API '${routeUrl}'. Make sure that 'names-api' is running properly. Details: ${res.statusText}`);
        }
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return await res.json();
        }
        return res.text();
    }

    async componentDidMount() {
        await this.getSurpriseTopic();
    }

    async getSurpriseTopic() {
        const surpriseTopic = await this.callApi("GET", "/api/names");
        this.setState({ topics: this.state.topics.concat(surpriseTopic) });
        console
    }

    handleChange(event) {
        this.setState({ newTopic: event.target.value });
    }

    handleSurpriseClick(event) {
        event.preventDefault();
        this.getSurpriseTopic();
    }

    render() {
        var topics = this.state.topics;
        var topicItems = topics.map((topic) => {
            return (
                <TopicItem
                    key={topic.id}
                    id={topic.id}
                    topic={topic}
                />
            );
        });

        var activeTopicCount = topics.reduce(function (accum, topic) {
            return topic.completed ? accum : accum + 1;
        }, 0);

        var footer = (
            <TopicFooter topicCount={activeTopicCount} />
        );

        var credits = (
            <div className="credits">
                Adapted from <strong><a href="http://todomvc.com/">TodoMVC</a></strong>
                <style jsx>{`
                    .credits {
                        margin-top: 100px;
                        color: #bbb;
                        font: inherit;
                        font-style: inherit;
                        font-weight: 400;
                        font-size: 12px;
                        text-align: center;
                    } 
                    .credits a {
                        text-decoration: none;
                        color: inherit;
                    }
                `}</style>
            </div>
        );

        return (
            <div className="TopicApp">
                <h1 className="app-title">band name generator</h1>                
                <button className="surprise-button" onClick={this.handleSurpriseClick}>Surprise me</button>
                <div className="main">
                    <ul className="topic-list">
                        {topicItems}
                    </ul>
                    {footer}
                </div>
                {credits}
                <style jsx>{`
                    .TopicApp {
                        text-align: center;
                    }
                    .topic-list {
                        margin: 0;
                        padding: 0;
                        list-style: none;
                        text-align: left;
                    }
                    .main {
                        background-color: white;
                        margin: 50px 0 40px 0;
                        position: relative;
                        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                                    0 25px 50px 0 rgba(0, 0, 0, 0.1);
                    }
                    .app-title {
                        width: 100%;
                        font-size: 96px;
                        font-weight: 100;
                        text-align: center;
                        color: rgba(175, 47, 47, 0.5);
                        -webkit-text-rendering: optimizeLegibility;
                        -moz-text-rendering: optimizeLegibility;
                        text-rendering: optimizeLegibility;
                    }
                    :focus {
                        outline: 0;
                    }
                    .new-topic, .edit {
                        margin: 0;
                        width: 100%;
                        font-size: 24px;
                        background: inherit;
                        font-family: inherit;
                        font-weight: inherit;
                        line-height: 1.4em;
                        border: 0;
                        color: inherit;
                        padding: 6px;
                    }
                    .new-topic::placeholder{
                        color: #bbb;
                        font-style: italic;
                    }
                    .edit-section {
                        padding: 10px;
                        border-bottom: 2px solid #ddd;
                    }
                    .surprise-button {
                        display: inline-block;
                        background-color: #7b38d8;
                        border-radius: 10px;
                        border: 4px double #cccccc;
                        color: #eeeeee;
                        text-align: center;
                        font-size: 28px;
                        padding: 20px;
                        width: 200px;
                        -webkit-transition: all 0.5s;
                        -moz-transition: all 0.5s;
                        -o-transition: all 0.5s;
                        transition: all 0.5s;
                        cursor: pointer;
                        margin: 5px;
                      }
                      .surprise-button:hover {
                        background-color: green;
                      }
                `}</style>
            </div>
        );
    }
}

export default TopicApp;
