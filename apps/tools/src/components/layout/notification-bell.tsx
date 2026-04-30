"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/use-notifications";
import { NotificationItem } from "./notification-item";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const { notifications, unreadCount, markRead, markAllRead, refetch } = useNotifications();
  const [open, setOpen] = useState(false);

  function handleToggle() {
    if (!open) {
      // Refresh on open
      refetch();
    }
    setOpen(!open);
  }

  function handleClickNotification(id: string, isRead: boolean) {
    if (!isRead) {
      markRead([id]);
    }
  }

  function handleMarkAllRead() {
    markAllRead();
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className="relative h-9 w-9"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-copper px-1 text-[10px] font-semibold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border-0 bg-card shadow-warm-lg">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/30 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper/60">Notifications</p>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[11px] font-semibold uppercase tracking-[0.15em] text-copper hover:text-copper/80"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto p-1">
              {notifications.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No notifications
                </p>
              ) : (
                notifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    notification={n}
                    onClick={() => handleClickNotification(n.id, n.is_read)}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
