import React, {Component} from 'react';

import Modal from "../../../stateless/dummy/UI/Modal/Modal";
import Aux from "../../../stateless/hoc/Aux/Aux";
import Burger from "../../../stateless/dummy/Burger/Burger";
import BuildControls from "../../../stateless/dummy/Burger/BuildControls/BuildControls";
import OrderSummary from "../../../stateless/dummy/Burger/OrderSummary/OrderSummary";
import Spinner from "../../../stateless/dummy/UI/Spinner/Spinner";
import withErrorHandler from "../../../stateless/hoc/withErrorHandler/withErrorHandler";
import baseClient from "../../../../client-base";
import {connect} from "react-redux";
import * as burgerBuilderActions from '../../../../store/action';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };


    componentDidMount() {
        this.props.onInitIngredients();
    }


    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.history.push({pathname: '/checkout'});
    };

    updatePurchaseState() {
        const ingredients = this.props.ingredients;
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner/>;
        let orderSummary = null;
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        totalPrice={this.props.price}
                        purchaseable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler}/>
                </Aux>);

            orderSummary = <OrderSummary
                totalPrice={this.props.price}
                ingredients={this.props.ingredients}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCanceled={this.purchaseCancelHandler}/>;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredient())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, baseClient));
