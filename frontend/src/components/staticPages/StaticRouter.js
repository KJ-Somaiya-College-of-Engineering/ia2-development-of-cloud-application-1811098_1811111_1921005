import React from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router";
import AboutUs from "./AboutUs";
import DamagePolicy from "./DamagePolicy";
import FAQ from "./faq";
import HowItWorks from "./HowItWorks";
import PrivacyPolicy from "./PrivacyPolicy";
import RentalPolicy from "./RentalPolicy";
import TermsAndConditions from "./TermsAndConditions";

const StaticRouter = (props) => {
  console.log("abcd");
  return (
    // <Container fluid>
    <Switch>
      <Route
        exact
        path="/static/terms_conditions"
        component={TermsAndConditions}
      />
      <Route exact path="/static/Privacy_policy" component={PrivacyPolicy} />
      <Route exact path="/static/Damage_policy" component={DamagePolicy} />
      <Route exact path="/static/Rental_policy" component={RentalPolicy} />
      <Route exact path="/static/how_it_works" component={HowItWorks} />
      <Route exact path="/static/about_us" component={AboutUs} />
      <Route exact path="/static/faq" component={FAQ} />
    </Switch>
    // </Container>
  );
};

export default StaticRouter;
