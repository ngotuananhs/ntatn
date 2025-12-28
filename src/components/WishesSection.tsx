'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, User, Heart, MessageCircle, Check } from 'lucide-react';

interface Wish {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
}

export default function WishesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      message: 'Chúc mừng hạnh phúc hai bạn! Trăm năm hạnh phúc! 💕',
      timestamp: new Date()
    },
    {
      id: 2,
      name: 'Trần Thị B',
      message: 'Chúc anh chị trăm năm hạnh phúc, sớm có thiên thần nhỏ! 🎊',
      timestamp: new Date()
    }
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      const newWish: Wish = {
        id: wishes.length + 1,
        name: name.trim(),
        message: message.trim(),
        timestamp: new Date()
      };
      setWishes([newWish, ...wishes]);
      setName('');
      setMessage('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section ref={ref} className="w-full py-8 px-6 bg-pattern flex flex-col justify-center">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <MessageCircle className="w-8 h-8 mx-auto text-[#c9a962] mb-4" />
          <h2 className="font-script text-3xl text-[#9b7b5b] mb-2">Sổ Lưu Bút</h2>
          <p className="text-[#9b7b5b]/70 text-sm">Gửi lời chúc đến cô dâu chú rể</p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 border border-[#c9a962]/20 shadow-lg mb-8"
        >
          <div className="mb-4">
            <label className="block text-sm text-[#9b7b5b] mb-2 font-elegant">Tên của bạn</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c9a962]/50" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-[#c9a962]/30 rounded-xl focus:outline-none focus:border-[#c9a962] text-[#3d3d3d] placeholder-[#9b7b5b]/40"
                placeholder="Nhập tên của bạn"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-[#9b7b5b] mb-2 font-elegant">Lời chúc</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white/50 border border-[#c9a962]/30 rounded-xl focus:outline-none focus:border-[#c9a962] text-[#3d3d3d] placeholder-[#9b7b5b]/40 resize-none"
              placeholder="Gửi lời chúc của bạn..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#9b7b5b] hover:bg-[#8a6a4a] text-white rounded-xl font-elegant tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            {submitted ? (
              <>
                <Check className="w-5 h-5" />
                Đã gửi!
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Gửi lời chúc
              </>
            )}
          </button>
        </motion.form>

        {/* Wishes list */}
        <div className="space-y-4">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass rounded-xl p-4 border border-[#c9a962]/10"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9a962]/10 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-[#c9a962]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-[#3d3d3d] text-sm">{wish.name}</h4>
                    <Heart className="w-3 h-3 text-[#e8c4c4] fill-[#e8c4c4]" />
                  </div>
                  <p className="text-[#9b7b5b] text-sm leading-relaxed">{wish.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
