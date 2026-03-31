export const RoutePath = {
  LOGIN: "/login",
  REGISTER: "/register",
  BOARD: "/board",
  HISTORY: "/history",
} as const;

export const Links = {
  board: {
    link : RoutePath.BOARD,
    label: "Board",
  },
  history: {
    link : RoutePath.HISTORY,
    label: "History",
  }
} as const;