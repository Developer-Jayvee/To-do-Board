import type { ReactNode } from "react";


interface NotificationProps {
    children?: ReactNode;
    hasNotif?: boolean;
}
export default function Notification(
    {
        children,
        hasNotif = false
    } : NotificationProps
) {
  return (
    <div className="notif inline-block mr-4 relative">
      {children}
      {hasNotif && (
        <div className="rounded-full bg-red-700 w-3 h-3 absolute top-0 right-[-5px]">
          {" "}
          &nbsp;
        </div>
      )}
    </div>
  );
}
