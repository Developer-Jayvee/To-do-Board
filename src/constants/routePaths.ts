
export const RoutePath = {
  LOGIN: "/login",
  REGISTER: "/register",
  BOARD: "/board",
  HISTORY: "/history",
  CONFIG: "/configurations"
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