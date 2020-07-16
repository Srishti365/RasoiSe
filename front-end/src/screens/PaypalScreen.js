import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { WebView } from 'react-native-webview'
import { AsyncStorage } from 'react-native';
// var token = await AsyncStorage.getItem('token')

// class PaypalScreen extends React.Component {
//     state = {
//         showModal: false,
//         status: "Pending",
//         token: null
//     };

//     // async later() {
//     //     console.log('hiii')
//     //     const token1 = await AsyncStorage.getItem('token')
//     //     this.setState({ token: token1})
//     // }

//     // async componentDidMount(){
//     //     const token2 = await AsyncStorage.getItem('token')
//     //     this.setState({ token:token2 })
//     // }

    

//     handleResponse = data => {
//         // console.log('hello');
//         if (data.title === "success") {
//             this.setState({ showModal: false, status: "Complete" });
//         } else if (data.title === "cancel") {
//             this.setState({ showModal: false, status: "Cancelled" });
//         } else {
//             return;
//         }
//     };
//     render() {
      
//         return (
//             <View style={{ marginTop: 100 }}>
//                 <Modal
//                     visible={this.state.showModal}
//                     onRequestClose={() => this.setState({ showModal: false })}
//                 >
//                     <WebView
//                         source={{ 
//                             uri: 'http://6af37b26.ngrok.io/payment'
//                             // headers: {
//                             //     'Accept': 'application/json',
//                             //     'Authorization': `Bearer ${this.state.token}`
                                
//                             // }
//                         }}
//                         onNavigationStateChange={data =>
//                             this.handleResponse(data)
//                         }
//                         injectedJavaScript={`document.f1.submit()`}
//                     />
//                 </Modal>
//                 <TouchableOpacity
//                     style={{ width: 300, height: 100 }}
//                     onPress={this.setState({ showModal: true })}
//                 >
//                     <Text>Pay with Paypal</Text>
//                 </TouchableOpacity>
//                 <Text>Payment Status: {this.state.status}</Text>
//             </View>
//         );
//     }
// }

class Foo{
    async doStuff(){
      return token = await AsyncStorage.getItem('token');
    } 
  }
  
let foo = new Foo()
var token = foo.doStuff()

class PaypalScreen extends React.Component {
    state = {
        showModal: false,
        status: "Pending"
    };
    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };
    render() {
        return (
            <View style={{ marginTop: 100 }}>
                <Modal
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                >
                    <WebView
                        source={{ uri: 
                            `https://4fd65e24.ngrok.io/payment/paypal`,
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': `Bearer ${token}`
                                
                            }
                        }}
                        onNavigationStateChange={data =>
                            this.handleResponse(data)
                        }
                        injectedJavaScript={`document.f1.submit()`}
                    />
                </Modal>
                <TouchableOpacity
                    style={{ width: 300, height: 100 }}
                    onPress={() => this.setState({ showModal: true })}
                >
                    <Text>Pay with Paypal</Text>
                </TouchableOpacity>
                <Text>Payment Status: {this.state.status}</Text>
            </View>
        );
    }
}





export default PaypalScreen;