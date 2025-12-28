'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Users, X, Heart, Send } from 'lucide-react';

interface RSVPSectionProps {
  groomName: string;
  brideName: string;
}

type RSVPStatus = 'pending' | 'attending' | 'not-attending';

export default function RSVPSection({ groomName, brideName }: RSVPSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [name, setName] = useState('');
  const [guests, setGuests] = useState(1);
  const [status, setStatus] = useState<RSVPStatus>('pending');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Telegram Bot config
  const TELEGRAM_BOT_TOKEN = '8545973451:AAHjMDNzLE3HykBsiTtF1jZBlg0EtX-9huQ';
  const TELEGRAM_CHAT_ID = '-1003676349570';

  const sendToTelegram = async (data: {
    name: string;
    guests: number;
    status: RSVPStatus;
    message: string;
  }) => {
    const statusText = data.status === 'attending' ? '✅ SẼ THAM DỰ' : '❌ KHÔNG THAM DỰ';
    const guestText = data.status === 'attending' ? `\n👥 Số người: ${data.guests}` : '';
    const messageText = data.message ? `\n💬 Lời nhắn: ${data.message}` : '';
    
    const text = `🎊 *XÁC NHẬN THAM DỰ MỚI*\n\n👤 Họ tên: *${data.name}*\n📋 Trạng thái: ${statusText}${guestText}${messageText}\n\n⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'Markdown',
        }),
      });
      
      const result = await response.json();
      return result.ok;
    } catch (error) {
      console.error('Telegram error:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && status !== 'pending') {
      setIsSubmitting(true);
      
      // Gửi đến Telegram
      const success = await sendToTelegram({ name, guests, status, message });
      
      if (success) {
        console.log('Đã gửi thông báo đến Telegram');
      } else {
        console.log('Lỗi gửi Telegram, nhưng vẫn hiển thị thành công cho người dùng');
      }
      
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section ref={ref} className="w-full py-4 px-6 bg-linear-to-b from-[#faf8f5] to-[#fff5f5]">
      <div className="max-w-lg mx-auto">
        {/* Header - simplified since RibbonBanner is above */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-2"
          >
            <Users className="w-8 h-8 text-[#c41e3a] mx-auto" />
          </motion.div>
          <h2 className="font-script text-2xl text-[#c41e3a] mb-1">Xác Nhận Tham Dự</h2>
          <p className="text-[#9b7b5b]/70 text-xs">Vui lòng xác nhận để chúng tôi chuẩn bị chu đáo</p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#c41e3a]/10 flex items-center justify-center"
            >
              <Heart className="w-10 h-10 text-[#c41e3a] fill-[#c41e3a]" />
            </motion.div>
            <h3 className="font-script text-2xl text-[#c41e3a] mb-2">Cảm ơn bạn!</h3>
            <p className="text-[#9b7b5b]">
              {status === 'attending' 
                ? `Chúng tôi rất vui được đón tiếp ${name}${guests > 1 ? ` cùng ${guests - 1} khách mời` : ''}!`
                : 'Chúng tôi rất tiếc khi bạn không thể tham dự'}
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 border border-[#c41e3a]/20 shadow-lg"
          >
            {/* Name */}
            <div className="mb-5">
              <label className="block text-sm text-[#9b7b5b] mb-2 font-elegant">Họ và tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-[#c41e3a]/20 rounded-xl focus:outline-none focus:border-[#c41e3a] text-[#3d3d3d] placeholder-[#9b7b5b]/40"
                placeholder="Nhập họ tên của bạn"
                required
              />
            </div>

            {/* Attendance status */}
            <div className="mb-5">
              <label className="block text-sm text-[#9b7b5b] mb-3 font-elegant">Bạn có thể tham dự?</label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => setStatus('attending')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    status === 'attending'
                      ? 'border-[#c41e3a] bg-[#c41e3a]/10 text-[#c41e3a]'
                      : 'border-[#c9a962]/30 hover:border-[#c41e3a]/50'
                  }`}
                >
                  <Check className={`w-6 h-6 ${status === 'attending' ? 'text-[#c41e3a]' : 'text-[#9b7b5b]'}`} />
                  <span className="font-elegant text-sm">Tôi sẽ tham dự</span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setStatus('not-attending')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    status === 'not-attending'
                      ? 'border-[#9b7b5b] bg-[#9b7b5b]/10 text-[#9b7b5b]'
                      : 'border-[#c9a962]/30 hover:border-[#9b7b5b]/50'
                  }`}
                >
                  <X className={`w-6 h-6 ${status === 'not-attending' ? 'text-[#9b7b5b]' : 'text-[#9b7b5b]/50'}`} />
                  <span className="font-elegant text-sm">Không thể tham dự</span>
                </motion.button>
              </div>
            </div>

            {/* Number of guests */}
            {status === 'attending' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-5"
              >
                <label className="block text-sm text-[#9b7b5b] mb-2 font-elegant">Số người tham dự</label>
                <div className="flex items-center gap-4">
                  <motion.button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full border border-[#c41e3a]/30 flex items-center justify-center text-[#c41e3a] hover:bg-[#c41e3a]/10"
                  >
                    -
                  </motion.button>
                  <span className="text-2xl font-elegant text-[#c41e3a] w-12 text-center">{guests}</span>
                  <motion.button
                    type="button"
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full border border-[#c41e3a]/30 flex items-center justify-center text-[#c41e3a] hover:bg-[#c41e3a]/10"
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Message */}
            <div className="mb-5">
              <label className="block text-sm text-[#9b7b5b] mb-2 font-elegant">Lời nhắn (tùy chọn)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-white/50 border border-[#c41e3a]/20 rounded-xl focus:outline-none focus:border-[#c41e3a] text-[#3d3d3d] placeholder-[#9b7b5b]/40 resize-none"
                placeholder="Gửi lời chúc hoặc ghi chú..."
              />
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={!name.trim() || status === 'pending' || isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-[#c41e3a] hover:bg-[#a01830] disabled:bg-[#ccc] disabled:cursor-not-allowed text-white rounded-xl font-elegant tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Đang gửi...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Gửi xác nhận
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
