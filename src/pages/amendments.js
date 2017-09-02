import React from 'react';
import Pagination from '../components/pagination';
import data from '../data/amendments';

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

        {this.state.pageOfItems.map((item, idx) => (
          <div key={idx}>
            <section className="usa-section">
              <div className="usa-width-one-half">
                <h4>{item.Title}</h4>
              </div>
              <div className="usa-width-one-half">{item.EffectiveDate}</div>
            </section>
            <section>{item.Text}</section>
            <h4>Reason for Amendment</h4>
            <section>{item.Reason}</section>
          </div>
        ))}
      </div>
    );
  }
}

export default Amendments;
