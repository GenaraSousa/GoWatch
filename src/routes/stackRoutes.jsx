import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Detail"
                component={Detail}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    title:"Sua busca",
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#141a30',
                    },
                    headerTitleStyle: {
                        color: "#fff",
                    }
                }}
            />
            
        </Stack.Navigator>
    )
}