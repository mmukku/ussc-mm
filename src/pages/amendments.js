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
        <h1>Amendments</h1>
        {this.state.pageOfItems.map(item => (
          <div key={item.id}>
            <h4>{item.Title}</h4>
            <h5>{item.EffectiveDate}</h5>
            <p>{item.Text}</p> <br />
            <p>{item.Reason}</p> <br />
          </div>
        ))}
        <Pagination
          items={this.state.exampleItems}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}

export default Amendments;
