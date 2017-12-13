import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BreadcrumbsWrapper from '../components/breadcrumbsWrapper';
import Blockset from '../components/blockset';
import TitleBlock from '../components/titleBlock';
import TitleContentBlock from '../components/titleContentBlock';
import ContentBlock from '../components/contentBlock';

function LossTableEntry(props) {
  return (
    <div>
      <div className="container-05-title">
        <div className="container-05-title-A">
          <div className="container-05-title-A1">
            <span className="container-font-light-C">{props.label}</span>
          </div>
        </div>
      </div>
      <div className="container-05b">
        <div className="container-05-A">
          <div className="container-03-A">
            <div className="container-03-C1">
              <span className="container-font-light-D">
                <strong>LOSS (Apply the Greatest)</strong>{' '}
              </span>
            </div>
            <div className="container-03-C2">
              <span className="container-font-light-C">{props.loss}</span>
            </div>
          </div>
          <div className="container-03-A">
            <div className="container-03-C1">
              <span className="container-font-light-D">
                <strong>Increase in level</strong>
              </span>
            </div>
            <div className="container-03-C2">
              <span className="container-font-light-C">{props.increase}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class LossTable extends Component {
  render() {
    return (
      <div>
        <section className="usa-section usa-section-black">
          <div className="usa-grid">
            <div className="container-title-c">
              <span className="container-font-dark-A-2">
                Frequently Used Tables<br />
              </span>
            </div>
          </div>
        </section>
        <BreadcrumbsWrapper>
          <li>
            <a href="/fut">FREQUENTLY USED TABLES</a>
          </li>
          <li className="active">LOSS TABLE</li>
        </BreadcrumbsWrapper>
        <section className="container-04a">
          <Blockset>
            <TitleBlock>Loss Table</TitleBlock>
            <TitleContentBlock>
              <p className="container-font-light-Ea">
                (from §2B1.1(b)(1) (Theft, Property Destruction, and Fraud))
              </p>
            </TitleContentBlock>
            <TitleContentBlock>
              <LossTableEntry
                label="(A)"
                loss="$6,500 or Less"
                increase="No Increase"
              />
              <LossTableEntry
                label="(B)"
                loss="More than $6,500"
                increase="Add 2"
              />
              <LossTableEntry
                label="(C)"
                loss="More than $15,000"
                increase="Add 4"
              />
              <LossTableEntry
                label="(D)"
                loss="More than $40,000"
                increase="Add 6"
              />
              <LossTableEntry
                label="(E)"
                loss="More than $95,000"
                increase="Add 8"
              />
              <LossTableEntry
                label="(F)"
                loss="More than $150,000"
                increase="Add 10"
              />
              <LossTableEntry
                label="(G)"
                loss="More than $250,000"
                increase="Add 12"
              />
              <LossTableEntry
                label="(H)"
                loss="More than $550,000"
                increase="Add 14"
              />
              <LossTableEntry
                label="(I)"
                loss="More than $1,550,000"
                increase="Add 16"
              />
              <LossTableEntry
                label="(J)"
                loss="More than $3,550,000"
                increase="Add 18"
              />
              <LossTableEntry
                label="(K)"
                loss="More than $9,550,000"
                increase="Add 20"
              />
              <LossTableEntry
                label="(L)"
                loss="More than $25,000,000"
                increase="Add 22"
              />
              <LossTableEntry
                label="(M)"
                loss="More than $65,550,000"
                increase="Add 24"
              />
              <LossTableEntry
                label="(N)"
                loss="More than $150,000,000"
                increase="Add 26"
              />
              <LossTableEntry
                label="(O)"
                loss="More than $250,000,000"
                increase="Add 28"
              />
              <LossTableEntry
                label="(P)"
                loss="More than $550,000,000"
                increase="Add 30"
              />
            </TitleContentBlock>
            <TitleContentBlock>
              <span className="container-font-light-C">
                Commentary <br />
              </span>
              <p className="container-font-light-Ea">
                (from §2B1.1, comment. (n.3))
              </p>
              <p className="container-font-light-Ea">
                Loss Under Subsection (b)(1).—This application note applies to
                the determination of loss under subsection (b)(1).
              </p>
            </TitleContentBlock>
            <TitleContentBlock>
              <p className="container-font-light-Ea">
                <span className="container-font-light-C">(A) </span> General
                Rule.—Subject to the exclusions in subdivision (D), loss is the
                greater of actual loss or intended loss.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(i) </span> Actual
                Loss.—“Actual loss” means the reasonably foreseeable pecuniary
                harm that resulted from the offense.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(ii) </span> Intended
                Loss.—“Intended loss” (I) means the pecuniary harm that the
                defendant purposely sought to inflict; and (II) includes
                intended pecuniary harm that would have been impossible or
                unlikely to occur (e.g., as in a government sting operation, or
                an insurance fraud in which the claim exceeded the insured
                value).
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(iii) </span> Pecuniary
                Harm.—“Pecuniary harm” means harm that is monetary or that
                otherwise is readily measurable in money. Accordingly, pecuniary
                harm does not include emotional distress, harm to reputation, or
                other non-economic harm.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(iv) </span> Reasonably
                Foreseeable Pecuniary Harm.—For purposes of this guideline,
                “reasonably foreseeable pecuniary harm” means pecuniary harm
                that the defendant knew or, under the circumstances, reasonably
                should have known, was a potential result of the offense.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(v) </span> Rules of
                Construction in Certain Cases.—In the cases described in
                subdivisions (I) through (III), reasonably foreseeable pecuniary
                harm shall be considered to include the pecuniary harm specified
                for those cases as follows:
              </p>
              <p className="container-font-light-Ec">
                <span className="container-font-light-C">(i) </span> Product
                Substitution Cases.—In the case of a product substitution
                offense, the reasonably foreseeable pecuniary harm includes the
                reasonably foreseeable costs of making substitute transactions
                and handling or disposing of the product delivered, or of
                retrofitting the product so that it can be used for its intended
                purpose, and the reasonably foreseeable costs of rectifying the
                actual or potential disruption to the victim’s business
                operations caused by the product substitution.
              </p>
              <p className="container-font-light-Ec">
                <span className="container-font-light-C">(ii) </span>{' '}
                Procurement Fraud Cases.—In the case of a procurement fraud,
                such as a fraud affecting a defense contract award, reasonably
                foreseeable pecuniary harm includes the reasonably foreseeable
                administrative costs to the government and other participants of
                repeating or correcting the procurement action affected, plus
                any increased costs to procure the product or service involved
                that was reasonably foreseeable.
              </p>
              <p className="container-font-light-Ec">
                <span className="container-font-light-C">(iii) </span> Offenses
                Under 18 U.S.C. § 1030.—In the case of an offense under 18
                U.S.C. § 1030, actual loss includes the following pecuniary
                harm, regardless of whether such pecuniary harm was reasonably
                foreseeable: any reasonable cost to any victim, including the
                cost of responding to an offense, conducting a damage
                assessment, and restoring the data, program, system, or
                information to its condition prior to the offense, and any
                revenue lost, cost incurred, or other damages incurred because
                of interruption of service.
              </p>
            </TitleContentBlock>
            <TitleContentBlock>
              <p className="container-font-light-Ea">
                <span className="container-font-light-C">(B) </span> Gain.—The
                court shall use the gain that resulted from the offense as an
                alternative measure of loss only if there is a loss but it
                reasonably cannot be determined.
              </p>
            </TitleContentBlock>
            <TitleContentBlock>
              <p className="container-font-light-Ea">
                <span className="container-font-light-C">(C) </span> Estimation
                of Loss.—The court need only make a reasonable estimate of the
                loss. The sentencing judge is in a unique position to assess the
                evidence and estimate the loss based upon that evidence. For
                this reason, the court’s loss determination is entitled to
                appropriate deference. See 18 U.S.C. § 3742(e) and (f).
              </p>
              <p className="container-font-light-Ea">
                The estimate of the loss shall be based on available
                information, taking into account, as appropriate and practicable
                under the circumstances, factors such as the following:
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(i) </span> The fair
                market value of the property unlawfully taken, copied, or
                destroyed; or, if the fair market value is impracticable to
                determine or inadequately measures the harm, the cost to the
                victim of replacing that property.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(ii) </span> In the
                case of proprietary information (e.g., trade secrets), the cost
                of developing that information or the reduction in the value of
                that information that resulted from the offense.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(iii) </span> The cost
                of repairs to damaged property.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(iv) </span> The
                approximate number of victims multiplied by the average loss to
                each victim.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(v) </span> The
                reduction that resulted from the offense in the value of equity
                securities or other corporate assets.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(vi) </span> More
                general factors, such as the scope and duration of the offense
                and revenues generated by similar operations.
              </p>
            </TitleContentBlock>
            <TitleContentBlock>
              <p className="container-font-light-Ea">
                <span className="container-font-light-C">(D) </span> Exclusions
                from Loss.—Loss shall not include the following:
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(i) </span> Interest of
                any kind, finance charges, late fees, penalties, amounts based
                on an agreed-upon return or rate of return, or other similar
                costs.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(ii) </span> Costs to
                the government of, and costs incurred by victims primarily to
                aid the government in, the prosecution and criminal
                investigation of an offense.
              </p>
            </TitleContentBlock>
            <TitleContentBlock>
              <p className="container-font-light-Ea">
                <span className="container-font-light-C">(E) </span> Credits
                Against Loss.—Loss shall be reduced by the following:
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(i) </span> The money
                returned, and the fair market value of the property returned and
                the services rendered, by the defendant or other persons acting
                jointly with the defendant, to the victim before the offense was
                detected. The time of detection of the offense is the earlier of
                (I) the time the offense was discovered by a victim or
                government agency; or (II) the time the defendant knew or
                reasonably should have known that the offense was detected or
                about to be detected by a victim or government agency.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(ii) </span> In a case
                involving collateral pledged or otherwise provided by the
                defendant, the amount the victim has recovered at the time of
                sentencing from disposition of the collateral, or if the
                collateral has not been disposed of by that time, the fair
                market value of the collateral at the time of sentencing.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(iii) </span>{' '}
                Notwithstanding clause (ii), in the case of a fraud involving a
                mortgage loan, if the collateral has not been disposed of by the
                time of sentencing, use the fair market value of the collateral
                as of the date on which the guilt of the defendant has been
                established, whether by guilty plea, trial, or plea of nolo
                contendere.
              </p>
              <p className="container-font-light-Eb">
                In such a case, there shall be a rebuttable presumption that the
                most recent tax assessment value of the collateral is a
                reasonable estimate of the fair market value. In determining
                whether the most recent tax assessment value is a reasonable
                estimate of the fair market value, the court may consider, among
                other factors, the recency of the tax assessment and the extent
                to which the jurisdiction’s tax assessment practices reflect
                factors not relevant to fair market value..
              </p>
            </TitleContentBlock>
            <ContentBlock>
              <p className="container-font-light-Ea">
                <span className="container-font-light-C">(F) </span> Special
                Rules.—Notwithstanding subdivision (A), the following special
                rules shall be used to assist in determining loss in the cases
                indicated:
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(i) </span> Stolen or
                Counterfeit Credit Cards and Access Devices; Purloined Numbers
                and Codes.—In a case involving any counterfeit access device or
                unauthorized access device, loss includes any unauthorized
                charges made with the counterfeit access device or unauthorized
                access device and shall be not less than $500 per access device.
                However, if the unauthorized access device is a means of
                telecommunications access that identifies a specific
                telecommunications instrument or telecommunications account
                (including an electronic serial number/mobile identification
                number (ESN/MIN) pair), and that means was only possessed, and
                not used, during the commission of the offense, loss shall be
                not less than $100 per unused means. For purposes of this
                subdivision, “counterfeit access device” and “unauthorized
                access device” have the meaning given those terms in Application
                Note 10(A).
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(ii) </span> Government
                Benefits.—In a case involving government benefits (e.g., grants,
                loans, entitlement program payments), loss shall be considered
                to be not less than the value of the benefits obtained by
                unintended recipients or diverted to unintended uses, as the
                case may be. For example, if the defendant was the intended
                recipient of food stamps having a value of $100 but fraudulently
                received food stamps having a value of $150, loss is $50.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(iii) </span>{' '}
                Davis–Bacon Act Violations.—In a case involving a Davis–Bacon
                Act violation (i.e., a violation of 40 U.S.C. § 3142, criminally
                prosecuted under 18 U.S.C. § 1001), the value of the benefits
                shall be considered to be not less than the difference between
                the legally required wages and actual wages paid.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(iv) </span> Ponzi and
                Other Fraudulent Investment Schemes.—In a case involving a
                fraudulent investment scheme, such as a Ponzi scheme, loss shall
                not be reduced by the money or the value of the property
                transferred to any individual investor in the scheme in excess
                of that investor’s principal investment (i.e., the gain to an
                individual investor in the scheme shall not be used to offset
                the loss to another individual investor in the scheme).
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(v) </span> Certain
                Other Unlawful Misrepresentation Schemes.—In a case involving a
                scheme in which (I) services were fraudulently rendered to the
                victim by persons falsely posing as licensed professionals; (II)
                goods were falsely represented as approved by a governmental
                regulatory agency; or (III) goods for which regulatory approval
                by a government agency was required but not obtained, or was
                obtained by fraud, loss shall include the amount paid for the
                property, services or goods transferred, rendered, or
                misrepresented, with no credit provided for the value of those
                items or services.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(vi) </span> Value of
                Controlled Substances.—In a case involving controlled
                substances, loss is the estimated street value of the controlled
                substances.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(vii) </span> Value of
                Cultural Heritage Resources or Paleontological Resources.—In a
                case involving a cultural heritage resource or paleontological
                resource, loss attributable to that resource shall be determined
                in accordance with the rules for determining the “value of the
                resource” set forth in Application Note 2 of the Commentary to
                §2B1.5.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(viii) </span> Federal
                Health Care Offenses Involving Government Health Care
                Programs.—In a case in which the defendant is convicted of a
                Federal health care offense involving a Government health care
                program, the aggregate dollar amount of fraudulent bills
                submitted to the Government health care program shall constitute
                prima facie evidence of the amount of the intended loss, i.e.,
                is evidence sufficient to establish the amount of the intended
                loss, if not rebutted.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(ix) </span> Fraudulent
                Inflation or Deflation in Value of Securities or Commodities.—In
                a case involving the fraudulent inflation or deflation in the
                value of a publicly traded security or commodity, the court in
                determining loss may use any method that is appropriate and
                practicable under the circumstances. One such method the court
                may consider is a method under which the actual loss
                attributable to the change in value of the security or commodity
                is the amount determined by—
              </p>
              <p className="container-font-light-Ec">
                <span className="container-font-light-C">(i) </span> calculating
                the difference between the average price of the security or
                commodity during the period that the fraud occurred and the
                average price of the security or commodity during the 90-day
                period after the fraud was disclosed to the market, and
              </p>
              <p className="container-font-light-Ec">
                <span className="container-font-light-C">(ii) </span>{' '}
                multiplying the difference in average price by the number of
                shares outstanding.
              </p>
              <p className="container-font-light-Eb">
                <span className="container-font-light-C">(ii) </span> In
                determining whether the amount so determined is a reasonable
                estimate of the actual loss attributable to the change in value
                of the security or commodity, the court may consider, among
                other factors, the extent to which the amount so determined
                includes significant changes in value not resulting from the
                offense (e.g., changes caused by external market forces, such as
                changed economic circumstances, changed investor expectations,
                and new industry-specific or firm-specific facts, conditions, or
                events).
              </p>
            </ContentBlock>
          </Blockset>
        </section>
      </div>
    );
  }
}

export default LossTable;
