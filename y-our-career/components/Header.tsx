import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Notification } from '../types';

interface HeaderProps {
  notifications: Notification[];
  onNotificationRead: () => void;
}

export const Header: React.FC<HeaderProps> = ({ notifications, onNotificationRead }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hasUnread = notifications.some(n => !n.isRead);

  const toggleDropdown = () => {
    if (!isOpen && hasUnread) {
      onNotificationRead(); // Mark read when opening
    }
    setIsOpen(!isOpen);
  };

  // Close click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full h-[80px] border-b border-border bg-white flex items-center justify-center px-[24px] sticky top-0 z-40">
      <div className="w-full max-w-[1440px] flex items-center justify-between">
        {/* Logo */}
        <div className="text-[24px] font-bold text-primary cursor-pointer select-none">
          Y-OUR Career
        </div>

        {/* Navigation / Notification Area */}
        <div className="relative" ref={dropdownRef}>
          {/* Bell Icon Wrapper - D5 Spec */}
          <div 
            className="cursor-pointer relative mr-[32px] p-1"
            onClick={toggleDropdown}
          >
            <Bell size={24} color="#242424" strokeWidth={2} />
            
            {/* Badge: 10px circle (#FF4D4D), Border 2px white, offset -4px */}
            {hasUnread && (
              <span className="
                absolute -top-[4px] -right-[4px] 
                w-[10px] h-[10px] 
                bg-status-badge 
                rounded-full 
                ring-2 ring-white
              " />
            )}
          </div>

          {/* Notification Dropdown (Simple implementation) */}
          {isOpen && (
            <div className="absolute right-[32px] top-[40px] w-[320px] bg-white border border-border rounded-[12px] shadow-modal z-50 overflow-hidden">
              <div className="p-4 border-b border-border bg-bg-light">
                <h4 className="font-bold text-text-main">Notifications</h4>
              </div>
              <ul className="max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <li className="p-4 text-center text-text-gray text-sm">No notifications</li>
                ) : (
                  notifications.map(n => (
                    <li key={n.id} className="p-4 border-b border-border hover:bg-bg-light transition-colors last:border-0">
                      <p className="text-[14px] text-text-main mb-1">{n.message}</p>
                      <span className="text-[12px] text-text-gray">{n.timestamp}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};