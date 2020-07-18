import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PaymentsStripe as stripe } from 'expo-payments-stripe';
import Button from '../components/Button';
import trackerApi from '../api/tracker';

stripe.setOptionsAsync({
    publishableKey: 'pk_test_51H6GbzGRyyytHUwOCqBBRh3UfzudX96N4aUQhuUnes5frezFFmbuuMyJxt0eRZGSaMCKLoq8NUYNrKTtXfAPPOnT002kdlk00n'
})

// payment gateway screen here

class TipsyStripeScreen extends PureComponent {
    static title = 'Card Form'

    state = {
        loading: false,
        token: null,
    }

    handleCardPayPress = async () => {
        try {
            this.setState({ loading: true, token: null })
            const token = await stripe.paymentRequestWithCardFormAsync({
                // Only iOS support this options
                smsAutofillDisabled: true,
                requiredBillingAddressFields: 'full',
                prefilledInformation: {
                    billingAddress: {
                        name: 'Gunilla Haugeh',
                        line1: 'Canary Place',
                        line2: '3',
                        city: 'Macon',
                        state: 'Georgia',
                        country: 'US',
                        postalCode: '31217',
                        email: 'ghaugeh0@printfriendly.com',
                    },
                },
            })

            this.setState({ loading: false, token })
        } catch (error) {
            this.setState({ loading: false })
        }
    }

    makePayment = async () => {
        try {
            this.setState({ loading: true });

            await trackerApi.post('/payment/', { amount: 100, currency: 'inr', token: this.state.token })
                .then(response => {
                    console.log(response.data);
                    this.setState({ loading: false });
                    if (response.status === 200) {
                        this.props.navigation.navigate('Search');
                    }
                });
        }
        catch (error) {
            console.log(error)
        }

    }

    render() {
        const { loading, token } = this.state

        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Pay For Your Order
        </Text>

                <Button
                    text="Enter Your Card Details Here"
                    loading={loading}
                    onPress={this.handleCardPayPress}
                />
                <View
                    style={styles.token}
                >
                    {token && (
                        <>
                            <Text style={styles.instruction}>
                                Click here to Make the Payment
                            </Text>
                            <Button text="Make Payment" loading={loading}
                                onPress={this.makePayment}
                            />
                        </>
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instruction: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    token: {
        height: 20,
    },
});

export default TipsyStripeScreen;