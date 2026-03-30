import {
    type RouteConfig,
    index,
    layout,
    route
} from "@react-router/dev/routes";
import { redirect } from "react-router";
import { RoutePath } from "src/constants/routePaths";
export default [
    layout('./routes/GuestLayout.tsx',[
        index('pages/Login/LoginPage.tsx'),
        // route(RoutePath.LOGIN,'pages/Login/LoginPage.tsx'),
        route(RoutePath.REGISTER,'pages/Register/RegisterPage.tsx')
    ]),
    layout('./routes/AuthLayout.tsx',[
        route(RoutePath.BOARD,'pages/Board/BoardPage.tsx'),
        route(RoutePath.HISTORY,'pages/History/HistoryPage.tsx')
    ])
] satisfies RouteConfig;
