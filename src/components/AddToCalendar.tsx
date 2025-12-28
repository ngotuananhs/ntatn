'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, CalendarPlus, ExternalLink } from 'lucide-react';

interface AddToCalendarProps {
  eventTitle: string;
  eventDate: Date;
  eventLocation: string;
  eventDescription: string;
}

export default function AddToCalendar({ eventTitle, eventDate, eventLocation, eventDescription }: AddToCalendarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const formatGoogleDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const googleCalendarUrl = () => {
    const startDate = formatGoogleDate(eventDate);
    const endDate = formatGoogleDate(new Date(eventDate.getTime() + 24 * 60 * 60 * 1000));
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventTitle,
      dates: `${startDate}/${endDate}`,
      details: eventDescription,
      location: eventLocation,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const generateICS = () => {
    const startDate = formatGoogleDate(eventDate);
    const endDate = formatGoogleDate(new Date(eventDate.getTime() + 24 * 60 * 60 * 1000));
    return `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Wedding Invitation//EN\nBEGIN:VEVENT\nDTSTART;VALUE=DATE:${startDate}\nDTEND;VALUE=DATE:${endDate}\nSUMMARY:${eventTitle}\nDESCRIPTION:${eventDescription}\nLOCATION:${eventLocation}\nEND:VEVENT\nEND:VCALENDAR`;
  };

  const downloadICS = () => {
    const icsContent = generateICS();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wedding-invitation.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section ref={ref} className="py-2 px-0">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-1"
          >
            <CalendarPlus className="w-6 h-6 text-[#c41e3a] mx-auto" />
          </motion.div>
          <h2 className="font-script text-xl text-[#c41e3a] leading-tight">Lưu Ngày Trọng Đại</h2>
          <p className="text-[#9b7b5b]/70 text-[11px] mt-0.5">Thêm vào lịch cho tiện</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-2 items-stretch">
          <motion.a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-full flex items-center justify-between p-2.5 bg-white rounded-lg border border-[#c41e3a]/15 shadow-sm hover:shadow-md hover:border-[#c41e3a]/35 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-md bg-[#c41e3a]/10 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div className="text-left leading-tight">
                <p className="font-elegant font-semibold text-sm text-[#3d3d3d]">Google</p>
                <p className="text-[11px] text-[#9b7b5b]">Mở Google Calendar</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#c41e3a] group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.button
            onClick={downloadICS}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.12 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-full w-full flex items-center justify-between p-2.5 bg-white rounded-lg border border-[#c41e3a]/15 shadow-sm hover:shadow-md hover:border-[#c41e3a]/35 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-md bg-[#c41e3a]/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#3d3d3d]" />
              </div>
              <div className="text-left leading-tight">
                <p className="font-elegant font-semibold text-sm text-[#3d3d3d]">Apple</p>
                <p className="text-[11px] text-[#9b7b5b]">Tải file .ics (iOS/macOS)</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-[#c41e3a] group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
