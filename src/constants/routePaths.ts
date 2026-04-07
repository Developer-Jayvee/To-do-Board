
export const RoutePath = {
  LOGIN: "/login",
  REGISTER: "/register",
  BOARD: "/board",
  HISTORY: "/history",
  CONFIG: "/configurations"
} as const;


export const Routes = {
  LOGIN : { url : '/login' , name : 'Login' },
  REGISTER : { url : '/register' , name : 'Register' },
  BOARD : { url : '/board' , name : 'Board' },
  HISTORY : { url : '/history' , name : 'History' },
  CONFIG : { url : '/configurations' , name : 'Configurations' },
}
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