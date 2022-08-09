import {
  CardParagraph,
  CardSubheader,
  HeaderText,
  LinkText,
} from 'components/Text'
import { space } from 'classnames/tailwind'
import Card from 'components/Card'
import CardSection from 'components/CardSection'

export default function () {
  return (
    <Card>
      <div className={space('space-y-4')}>
        <HeaderText>Terms of Service</HeaderText>
        <div className={space('space-y-4')}>
          <CardSection smallPadding>
            <CardSubheader>Terms</CardSubheader>
            <CardParagraph>
              By accessing this Website, you are agreeing to be bound by these
              Website Terms and Conditions of Use and agree that you are
              responsible for the agreement with any applicable local laws. If
              you disagree with any of these terms, you are prohibited from
              accessing this site. The materials contained in this Website are
              protected by copyright and trade mark law.
            </CardParagraph>
          </CardSection>
          <CardSection smallPadding>
            <CardSubheader>Disclaimer</CardSubheader>
            <CardParagraph>
              All the materials on Service’s Website are provided "as is".
              Service makes no warranties, may it be expressed or implied,
              therefore negates all other warranties. Furthermore, Service does
              not make any representations concerning the accuracy or
              reliability of the use of the materials on its Website or
              otherwise relating to such materials or any sites linked to this
              Website.
            </CardParagraph>
          </CardSection>
          <CardSection smallPadding>
            <CardSubheader>Limitations</CardSubheader>
            <CardParagraph>
              Service or its suppliers will not be hold accountable for any
              damages that will arise with the use or inability to use the
              materials on Service’s Website, even if Service or an authorize
              representative of this Website has been notified, orally or
              written, of the possibility of such damage. Some jurisdiction does
              not allow limitations on implied warranties or limitations of
              liability for incidental damages, these limitations may not apply
              to you.
            </CardParagraph>
          </CardSection>
          <CardSection smallPadding>
            <CardSubheader>Revisions and Errata</CardSubheader>
            <CardParagraph>
              The materials appearing on Service’s Website may include
              technical, typographical, or photographic errors. Service will not
              promise that any of the materials in this Website are accurate,
              complete, or current. Service may change the materials contained
              on its Website at any time without notice. Service does not make
              any commitment to update the materials.
            </CardParagraph>
          </CardSection>
          <CardSection smallPadding>
            <CardSubheader>Links</CardSubheader>
            <CardParagraph>
              Service has not reviewed all of the sites linked to its Website
              and is not responsible for the contents of any such linked site.
              The presence of any link does not imply endorsement by Service of
              the site. The use of any linked website is at the user’s own risk.
            </CardParagraph>
          </CardSection>
          <CardSection smallPadding>
            <CardSubheader>Site Terms of Use Modifications</CardSubheader>
            <CardParagraph>
              Service may revise these Terms of Use for its Website at any time
              without prior notice. By using this Website, you are agreeing to
              be bound by the current version of these Terms and Conditions of
              Use.
            </CardParagraph>
          </CardSection>
          <CardSection smallPadding>
            <CardSubheader>Your Privacy</CardSubheader>
            <CardParagraph>
              Please read our{' '}
              <LinkText internal url="/privacy">
                Privacy Policy
              </LinkText>
            </CardParagraph>
          </CardSection>
          <CardSection smallPadding>
            <CardSubheader>Governing Law</CardSubheader>
            <CardParagraph>
              Any claim related to Service's Website shall be governed by the
              laws of ca without regards to its conflict of law provisions.
            </CardParagraph>
          </CardSection>
          <CardSection smallPadding>
            <CardSubheader>Encryption</CardSubheader>
            <CardParagraph>
              In case if the user enables encryption, there is no way to decrypt
              the data without the password specified by the user.
            </CardParagraph>
          </CardSection>
        </div>
      </div>
    </Card>
  )
}
