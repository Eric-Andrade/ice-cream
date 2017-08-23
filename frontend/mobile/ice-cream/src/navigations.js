import React, { Component } from 'react';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from './utils/constants';
import AnalyticsScreen from './screens/AnalyticsScreen';
import MenuScreen from './screens/MenuScreen';
import OrdersScreen from './screens/OrdersScreen';
import ChatsScreen from './screens/ChatsScreen';
import ConfigsScreen from './screens/ConfigsScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';

const tabIcon = 27;
const TabNav = TabNavigator({
    Analytics: {
        screen: AnalyticsScreen,
        navigationOptions:() =>({
            headerTitle: 'Analytics',
            tabBarIcon: ({ tintColor, focused }) =>( 
                <Icon name={focused ? 'ios-analytics' : 'ios-analytics-outline'} size={tabIcon} style={{color: tintColor}}/>
            )
        })
    },
    Menu: {
        screen: MenuScreen,
        navigationOptions:() =>({
            headerTitle: 'Menu',
            tabBarIcon: ({ tintColor, focused }) =>( 
                <Icon name={focused ? 'ios-keypad' : 'ios-keypad-outline'} size={tabIcon} style={{color: tintColor}}/>
            )
        })
    },
    Orders: {
        screen: OrdersScreen,
        navigationOptions:() =>({
            headerTitle: 'Orders',
            tabBarLabel: ' ',
            tabBarIcon: ({ tintColor, focused }) =>( 
                <Icon name={focused ? 'ios-add-circle' : 'ios-radio-button-on-outline'} size={56} style={{color: tintColor, marginTop:20, flexDirection: 'row', justifyContent:'center'}}/>
            )
        })
    },
    Chats: {
        screen: ChatsScreen,
        navigationOptions:() =>({
            headerTitle: 'Chats',
            tabBarIcon: ({ tintColor, focused }) =>( 
                <Icon name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'} size={tabIcon} style={{color: tintColor}}/>
            )
        })
    },
    Config: {
        screen: ConfigsScreen,
        navigationOptions:() =>({
            headerTitle: 'Configs',
            tabBarIcon: ({ tintColor }) =>( 
                <Icon name='ios-cog' size={tabIcon} style={{color: tintColor}}/>
            )
        })
    },
},{
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false, 
    initialRouteName: 'Orders',
    tabBarOptions:{
        showIcon: true,
        showLabel: true,
        activeTintColor: colors.PRIMARY,
        inactiveTintColor: '#333',
        style:{
            backgroundColor: colors.WHITE,
            height: 47,
            paddingVertical: 5
        }
    }
})
const AppMainNav = StackNavigator({
    Home: {
        screen: TabNav
    }
},{
    cardStyle: {
        backgroundColor: '#f5f5f5'
    },
    navigationOptions: () => ({
        headerStyle:{
            backgroundColor: colors.WHITE
        },
        headerTitleStyle:{
            fontWeight: 'bold',
            color: colors.SECONDARY
        }
    })
});

class AppNavigator extends Component {
    state = {  }
    render() {
        const nav = addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav
        })
        if (!this.props.clients.isAuthenticated) {
            return <AuthenticationScreen/>
        }
        return <AppMainNav navigation={nav}/>
    }
}

export default connect(state =>({
    nav: state.nav,
    clients: state.clients
}))(AppNavigator);

export const router = AppMainNav.router;