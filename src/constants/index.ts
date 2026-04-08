export const TOKEN_NAME = "user-token";
export const USER_INFO_NAME = "user-info";
export const USER_NOTIFS = "user-notifs";
export const DESCRIPTION_NAME ="description-input"
export const HAS_NOTIF = "hasNotif";
export const DAY_LIST = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
export const MONTH_LIST = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
export const TICKET_STATUS_LEVEL = {
    5: 'yellow-300',
    2: 'orange-400',
    0 : 'red-600',
    'default' : 'greem-500',
    'closed' : 'black'
}
export const TICKET_STATUS_LEVEL_NAME = {
    5 : 'Expiring Soon',
    2 : 'Expiring Soon',
    0 : 'Expiring Today',
    'default' : 'Good',
    'closed' : 'Closed'
}
export const levels : Record <number , string> = {
    1: "Very Weak",
    2: "Weak",
    3: "Medium",
    4: "Strong",
};