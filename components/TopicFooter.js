import React from 'react';
import Link from 'next/link';

export default class TopicFooter extends React.Component {
    pluralize(count, word) {
        return count === 1 ? word : word + 's';
    }

    render() {
        var activeTopicWord = this.pluralize(this.props.topicCount, 'topic');
        return (
            <div className="filters">
                <div className="topic-count">{this.props.topicCount} {activeTopicWord} left</div>
                <style jsx>{`
                    .filters {
                        color: #777;
                        padding: 5px 15px 30px 15px;
                        height: 20px;
                        text-align: center;
                        border-top: 1px solid #e6e6e6;
                        font-size: 14px;
                    }
                    .topic-count {
                        float: left;
                        text-align: left;
                    }
                `}</style>
            </div>
        );
    }
}