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
      <div>
        <h2>Amendments</h2>
        {this.state.pageOfItems.map((item, idx) => (
          <div key={idx}>
            <h4>
              {item.Title}{' '}
              <span style={{ textAlign: 'right' }}>{item.EffectiveDate}</span>
            </h4>
            <section>{item.Text}</section>
            <h4>Reason for Amendment</h4>
            <section>{item.Reason}</section>
          </div>
        ))}
        <section>
          <Pagination
            items={this.state.exampleItems}
            onChangePage={this.onChangePage}
            pageSize={1}
          />
        </section>
      </div>
    );
  }
}

export default Amendments;
