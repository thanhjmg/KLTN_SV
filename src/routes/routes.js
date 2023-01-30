import { LoginLayout } from '../layout';

import Home from '../pages/Home';

import SignIn from '../pages/Login';
import routeConfig from '../configRoutes';
//public
const publicRoutes = [
    {
        path: routeConfig.routeConfig.home,
        component: Home,
    },
   
    {
        path: routeConfig.routeConfig.signIn,
        component: SignIn,
        layout: LoginLayout,
    },
    
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
