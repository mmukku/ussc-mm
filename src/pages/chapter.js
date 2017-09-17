import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Chapter extends Component {
  constructor() {
    super();
    this.state = {
      chapter: ''
    };
  }

  componentDidMount() {
    let self = this;
    fetch(`${process.env.PUBLIC_URL}/chapter${this.props.match.params.id}.html`)
      .then(response => response.text())
      .then(text => {
        self.setState({ chapter: text });
      });
  }
  render() {
    return (
      <div>
        <Link to="/" className="usa-nav-link">
          <span>Home</span>
        </Link>{' '}
        &gt; Chapter {this.props.match.params.id}
        <div
          style={{ maxWidth: 'none' }}
          dangerouslySetInnerHTML={{ __html: this.state.chapter }}
        />
      </div>
    );
  }
}
export default Chapter;
