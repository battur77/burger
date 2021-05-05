import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Burger from "../../components/Burger";
import ContactData from "../../components/ContactData";
import Button from "../../components/General/Button";
import css from "./style.module.css";

class ShippingPage extends React.Component {
  cancelOrder = () => {
    this.props.history.goBack();
  };

  showContactData = () => {
    this.props.history.replace("/ship/contact");
  };

  render() {
    return (
      <div className={css.ShippingPage}>
        <p style={{ fontSize: "20px" }}>
          <strong>Таны захиалга амттай байх болно...</strong>
        </p>
        <p style={{ fontSize: "20px" }}>
          <strong>Дүн: {this.props.price}₮</strong>
        </p>
        <Burger />
        <Button
          clicked={this.cancelOrder}
          btnType="Danger"
          text="ЗАХИАЛГА ЦУЦЛАХ"
        />
        <Button
          clicked={this.showContactData}
          btnType="Success"
          text="Хүргэлтийн мэдээлэл оруулах"
        />
        <Route path="/ship/contact">
          <ContactData />
        </Route>

        {/* ene  2 ijil
        
        <Route
          path="/ship/contact"
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
            />
          )}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
  };
};

export default connect(mapStateToProps)(ShippingPage);
