import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";
import { RoutePath , Routes } from "src/constants/routePaths";
export default [
  layout("./layouts/GuestLayout.tsx", [
    index("pages/Login/LoginPage.tsx"),
    // route(RoutePath.LOGIN,'pages/Login/LoginPage.tsx'),
    route(RoutePath.REGISTER, "pages/Register/RegisterPage.tsx"),
  ]),
  layout("./layouts/AuthLayout.tsx", [
    route(RoutePath.BOARD, "pages/Board/BoardPage.tsx"),
    route(RoutePath.HISTORY, "pages/History/HistoryPage.tsx"),
    route(RoutePath.CONFIG,"pages/Config/ConfigPage.tsx")
  ]),
] satisfies RouteConfig;
