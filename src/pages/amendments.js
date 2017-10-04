import React from 'react';
import Pagination from '../components/pagination';
import data from '../data/appendix-c';
//import Remarkable from 'remarkable';
//var md = new Remarkable({ html: true });

class Amendments extends React.Component {
  constructor() {
    super();
    this.state = {
      exampleItems: data,
      pageOfItems: []
    };

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  getRawMarkup(text) {
    //var md = new Remarkable({ html: true });
    //return { __html: md.render(text) };
  }

  render() {
    return (
      <div className="usa-section">
        <div>
          <div className="usa-width-one-half">
            <h2>Amendments</h2>
          </div>
          <div className="usa-width-one-half">
            <Pagination
              items={this.state.exampleItems}
              onChangePage={this.onChangePage}
              pageSize={1}
            />
          </div>
        </div>

        {this.state.pageOfItems.map(item => (
          <div key={item.id}>
            <section
              className="usa-section"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Amendments;
