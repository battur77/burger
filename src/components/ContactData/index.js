import React from "react";
import { connect } from "react-redux";
import Button from "../General/Button";
import css from "./style.module.css";
import Spinner from "../General/Spinner";
import { withRouter } from "react-router-dom";
import * as actions from "../../redux/actions/orderActions";

class ContactData extends React.Component {
  state = {
    name: null,
    city: null,
    street: null,
  };

  changeName = (e) => {
    this.setState({ name: e.target.value });
  };
  city = (e) => {
    this.setState({ city: e.target.value });
  };
  street = (e) => {
    this.setState({ street: e.target.value });
  };

  componentDidUpdate() {
    if (
      this.props.newOrderStatus.finished &&
      !this.props.newOrderStatus.error
    ) {
      this.props.history.replace("/orders");
    }
  }

  saveOrder = () => {
    const newOrder = {
      userId: this.props.userId,
      orts: this.props.ingredients,
      dun: this.props.price,
      hayag: {
        name: this.state.name,
        city: this.state.city,
        street: this.state.street,
      },
    };

    this.props.saveOrderAction(newOrder);
    // this.setState({ loading: true });
  };

  render() {
    return (
      <div className={css.ContactData}>
        Дүн: {this.props.price}₮
        <div>
          {this.props.newOrderStatus.error &&
            `Алдаа гарлаа: ${this.props.newOrderStatus.error}`}
        </div>
        {this.props.newOrderStatus.saving ? (
          <Spinner />
        ) : (
          <div>
            <input
              onChange={this.changeName}
              type="text"
              name="name"
              placeholder="таны нэр"
            />
            <input
              onChange={this.street}
              type="text"
              name="street"
              placeholder="таны гэрийн хаяг"
            />
            <input
              onChange={this.city}
              type="text"
              name="city"
              placeholder="таны хот"
            />
            <Button text="Илгээх" btnType="Success" clicked={this.saveOrder} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
    ingredients: state.burgerReducer.ingredients,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.signupReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderAction: (newOrder) => dispatch(actions.saveOrder(newOrder)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
