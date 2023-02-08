import { LoginLayout } from '../layout';

import Home from '../pages/Home';
import LichTheoTuan from '../pages/LichTheoTuan';
import DangKyHocPhan from '../pages/DangKyHocPhan';
import SignIn from '../pages/Login';
import routeConfig from '../configRoutes';
//public
const publicRoutes = [
    {
        path: routeConfig.routeConfig.home,
        component: Home,
    },
    {
        path: routeConfig.routeConfig.lichTheoTuan,
        component: LichTheoTuan,
    },
    {
        path: routeConfig.routeConfig.dangKyHP,
        component: DangKyHocPhan,
    },
    {
        path: routeConfig.routeConfig.signIn,
        component: SignIn,
        layout: LoginLayout,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
