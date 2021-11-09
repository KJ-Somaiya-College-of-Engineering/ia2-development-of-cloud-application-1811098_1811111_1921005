import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import MetaTags from "react-meta-tags";
const PrivacyPolicy = (props) => {
  return (
    <Container fluid className="p-0 mb-5">
      <MetaTags>
        <title>Privacy Policy - Martolex.com </title>
        <meta
          name="description"
          content="Martolex is strongly committed to protecting the privacy of the users. Privacy policy contains the terms involved in registering to your service. "
        />
      </MetaTags>
      <Row className="w-100 m-0">
        <Col md={12} className="w-100 m-0 p-0 mb-2">
          <h2 className="h1 text-primary text-center">PRIVACY POLICY</h2>
        </Col>
      </Row>
      <Row className="px-3">
        <Container fluid className="lead">
          <Row>
            <Col>
              We take your privacy very seriously. We focus on highest standards
              for secure transactions and customer data privacy. Following
              document illustrates our policies & purposes for receiving your
              data.
              <br />
              <br />
              By visiting this website you agree to be bound by the terms and
              conditions of this Privacy Policy. If you do not agree please do
              not use or access our Website. By mere use of the Website, you
              expressly consent to our use and disclosure of your personal
              information in accordance with this Privacy Policy. This Privacy
              Policy is incorporated into and subject to the Terms of Use.
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <strong>Privacy</strong>
            </Col>
            <Col>
              Martolex is strongly committed to protecting the privacy of users.
              This privacy policy document contains information which you should
              go through so that you fully understand the terms involved in
              registering to our service, and how we use the personal
              information submitted by you to avail this service
              <br />
              When you register at Martolex, we ask you to provide us with your
              personal information. Personal information means information that
              can be used to identify and contact you. These include your name,
              postal delivery address, e-mail address, payment method, telephone
              number, Date of birth, as well as other information when such
              information is combined with your personal information. We use
              this information to process your orders and to communicate with
              you about the status of your orders. We use your email address to
              send you messages about Martolex special offers, promotional
              announcements and consumer surveys. We also send email to reply to
              your queries that you may have about Martolex.
              <br />
              We use your telephone number only if there is order/delivery
              related issue. We may also use that information to let you know of
              additional products and services in which you might be interested.
              We may ask you for information about your interests and
              preferences to serve you better, but it’s your choice to respond
              or not. . As part of our service, we collect and store your
              personal information which is provided by you from time to time.
              Our primary goal in doing so is to provide you a safe, efficient,
              smooth and customized experience. This allows us to provide
              services and features that most likely meet your needs, and to
              customize our services to make your experience better and easier.
              More importantly, while doing so we collect personal information
              from you that we consider necessary for achieving this purpose.
              <br />
              You can browse the Website without becoming our user. But once you
              become our user, you are not anonymous to us. Where possible, we
              indicate which fields are required and which fields are optional.
              You always have the option to not provide information by choosing
              not to use a particular service or feature on the service. We may
              automatically track your reading behaviour based on the books you
              buy. We use this information to do merchandise planning &
              recommendations to you and users like you. This information is
              compiled and analysed on an aggregated basis. This information may
              include the URL that you just came from (whether this URL is on
              our Website or not), which URL you next go to (whether this URL is
              on our Website or not), your computer browser information, and
              your IP address.
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <strong>Disclosure</strong>
            </Col>
            <Col>
              Except as described in this section, we will not sell, rent or
              disclose your personal identification to third parties without
              notifying you of our intent to share the information and giving
              you an opportunity to prevent your information from being shared.
              We occasionally use other companies, agents or contractors to
              perform services necessary to our operations. For example, we have
              partnered with other companies to personalize our Web pages,
              process payment transactions, analyse customers' interaction with
              our site and process consumer surveys. We also provide postal
              addresses to the Courier Service for delivery purposes. In the
              course of providing such services, these companies may have
              contact with your personal identification. We will not be liable
              for any damages that may result from the misuse of your personal
              information by these companies. From time to time, we may partner
              with companies whose products we believe will interest our
              members. In conjunction with these partners, we occasionally send
              promotional announcements to particular members. Martolex also
              reserves the right to disclose personal information when
              disclosure is required by law, if we reasonably believe disclosure
              is necessary to establish or exercise legal rights, or in
              situations involving potential threats to physical safety. We also
              provide analyses of our members in the aggregate to prospective
              partners, advertisers and other third parties. We do this so that
              we, and our advertisers can understand you better, and so we can
              keep bringing you the best services. We may also disclose, on an
              anonymous basis, literal statements made by our members. At no
              time, however, will we disclose personal information about
              specific members. Members should check back for updates to this
              policy.
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <strong>Security and My Account</strong>
            </Col>
            <Col>
              You can access your account from every page on the site by
              clicking the “My Account” tab after logging in to update and
              correct your name, password, postal address, payment information
              and update your Bookshelf. We have implemented technology and
              security features, as well as strict internal guidelines, to
              safeguard the privacy of your personal information from
              unauthorized access or improper use. We will continue to enhance
              our security procedures as new technology becomes available. No
              security system can be guaranteed to be 100% secure. Accordingly,
              we cannot guarantee the security of your personal information and
              cannot assume liability for improper access to it. By using this
              Web site, or providing personal information to us through any
              means, you agree that we can communicate with you electronically
              regarding security, privacy, and administrative issues relating to
              your use of this site.
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <strong>Changes to this Policy</strong>
            </Col>
            <Col>
              We may make changes to this policy as and when needed. You should
              check back for updates to this policy from periodically. The
              privacy policy can be viewed any time by visiting the Privacy
              Policy page on Martolex website.
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
