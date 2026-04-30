"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, Clock, CalendarDays, Briefcase } from "lucide-react";
import type { Notification } from "@/types/brand-hub";

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

function getIcon(type: string) {
  switch (type) {
    case "deliverable_overdue":
      return <AlertCircle className="h-4 w-4 text-destructive" />;
    case "deliverable_due_today":
      return <Clock className="h-4 w-4 text-amber-500" />;
    case "deliverable_due_tomorrow":
      return <CalendarDays className="h-4 w-4 text-copper" />;
    case "deal_starting":
    case "deal_ending":
      return <Briefcase className="h-4 w-4 text-copper" />;
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-accent",
        !notification.is_read && "bg-butter/15"
      )}
    >
      <div className="mt-0.5 shrink-0">{getIcon(notification.type)}</div>
      <div className="flex-1 min-w-0 space-y-0.5">
        <p className={cn("text-sm", !notification.is_read && "font-medium")}>
          {notification.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {notification.message}
        </p>
      </div>
      <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">
        {timeAgo(notification.created_at)}
      </span>
    </button>
  );
}
