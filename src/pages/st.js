import React from 'react';

export default props => {
  return (
    <div>
      <h2>Sentencing Table</h2>
      <p>The Sentencing Table used to determine the guideline range follows:</p>
      <p>
        <img src="/Sentencing_Table.svg" alt="Sentencing Table" />
      </p>
      <h4 id="commentary-to-sentencing-table" class="Commentary">
        <strong>Commentary to Sentencing Table</strong>
      </h4>
      <p>
        <strong>Application Notes:</strong>
      </p>
      <p>
        1. The Offense Level (1–43) forms the vertical axis of the Sentencing
        Table. The Criminal History Category (I–VI) forms the horizontal axis of
        the Table. The intersection of the Offense Level and Criminal History
        Category displays the Guideline Range in months of imprisonment. “<em>
          <strong>Life</strong>
        </em>” means life imprisonment. For example, the guideline range
        applicable to a defendant with an Offense Level of 15 and a Criminal
        History Category of III is 24–30 months of imprisonment.
      </p>
      <p>
        2. In rare cases, a total offense level of less than 1 or more than 43
        may result from application of the guidelines. A total offense level of
        less than 1 is to be treated as an offense level of 1. An offense level
        of more than 43 is to be treated as an offense level of 43.
      </p>
      <p>
        3. The Criminal History Category is determined by the total criminal
        history points from Chapter Four, Part A, except as provided in §§4B1.1
        (Career Offender) and 4B1.4 (Armed Career Criminal). The total criminal
        history points associated with each Criminal History Category are shown
        under each Criminal History Category in the Sentencing Table.
      </p>
      <table>
        <tbody>
          <tr class="odd">
            <td>
              <em>Historical Note</em>
            </td>
            <td>
              Effective November 1, 1987. Amended effective November 1, 1989
              (amendment 270); November 1, 1991 (amendment 418); November 1,
              1992 (amendment 462); November 1, 2010 (amendment 738).
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
