'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Copy, Check, Gift, Heart, ExternalLink } from 'lucide-react';
import { weddingData } from '@/data/wedding';

interface BankAccount {
  bankName: string;
  bankLogo?: string;
  accountNumber: string;
  accountName: string;
  qrImage?: string;
  bankBin: string; // Mã BIN ngân hàng cho VietQR
}

const bankAccounts: { groom: BankAccount; bride: BankAccount } = {
  groom: {
    bankName: 'Techcombank',
    accountNumber: '6349696969',
    accountName: 'NGO TUAN ANH',
    qrImage: '/images/qrtuananh.png',
    bankBin: '970407', // Techcombank BIN
  },
  bride: {
    bankName: 'Techcombank',
    accountNumber: '19073391531011',
    accountName: 'HOANG THAO NGUYEN',
    qrImage: '/images/qrthaonguyen.png',
    bankBin: '970407', // Techcombank BIN
  },
};

// Tạo VietQR deeplink để mở app ngân hàng
function generateVietQRLink(account: BankAccount, amount?: number): string {
  const baseUrl = 'https://img.vietqr.io/image';
  const description = encodeURIComponent('Mung cuoi');
  // Format: https://img.vietqr.io/image/BANK_BIN-ACCOUNT_NO-compact2.png?amount=X&addInfo=Y
  // Hoặc dùng deeplink: https://dl.vietqr.io/pay?app=...
  
  // Dùng VietQR Pay Link - sẽ mở app ngân hàng nếu có
  const vietQRPayLink = `https://api.vietqr.io/v2/generate?bin=${account.bankBin}&accountNumber=${account.accountNumber}&accountName=${encodeURIComponent(account.accountName)}&amount=${amount || ''}&addInfo=${description}`;
  
  // Deeplink đơn giản hơn - redirect tới trang thanh toán
  return `https://qr.sepay.vn/img?acc=${account.accountNumber}&bank=${account.bankBin}&des=${description}`;
}

function BankCard({ 
  account, 
  person, 
  delay 
}: { 
  account: BankAccount; 
  person: 'groom' | 'bride';
  delay: number;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Xử lý chuyển khoản - mở QR hoặc copy số tài khoản
  const handleTransfer = () => {
    // Trên mobile: suggest copy số tài khoản
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      copyToClipboard();
      alert('Đã copy số tài khoản! Vui lòng mở app ngân hàng để chuyển khoản.');
    } else {
      // Desktop: mở link VietQR (fallback)
      window.open(
        `https://img.vietqr.io/image/${account.bankBin}-${account.accountNumber}-compact2.jpg?amount=&addInfo=Mung cuoi&accountName=${encodeURIComponent(account.accountName)}`,
        '_blank'
      );
    }
  };

  const personData = person === 'groom' ? weddingData.groom : weddingData.bride;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-5 border border-[#c41e3a]/20 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-4">
        <div className="w-14 h-14 mx-auto mb-2 rounded-full overflow-hidden border-2 border-[#c41e3a]/30">
          <div className="w-full h-full bg-linear-to-br from-[#c41e3a]/20 to-[#c9a962]/20 flex items-center justify-center">
            <Heart className="w-6 h-6 text-[#c41e3a]" />
          </div>
        </div>
        <h3 className="font-script text-xl text-[#c41e3a]">{personData.name}</h3>
        <p className="text-xs text-[#9b7b5b]/60">
          {person === 'groom' ? 'Chú rể' : 'Cô dâu'}
        </p>
      </div>

      {/* QR Code */}
      <div className="bg-white rounded-xl p-3 mb-4 mx-auto max-w-45 shadow-inner">
        {account.qrImage ? (
          <img 
            src={account.qrImage} 
            alt={`QR ${account.bankName}`}
            className="w-full h-auto"
          />
        ) : (
          <div className="aspect-square bg-linear-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center">
            <Gift className="w-10 h-10 text-[#c41e3a]/40 mb-2" />
            <p className="text-xs text-gray-400 text-center px-2">
              Thay thế bằng<br/>mã QR thật
            </p>
          </div>
        )}
      </div>

      {/* Bank Info */}
      <div className="space-y-2 text-center">
        <div className="inline-block px-3 py-1 bg-[#c41e3a]/10 rounded-full">
          <span className="text-xs font-medium text-[#c41e3a]">
            {account.bankName}
          </span>
        </div>
        
        <div className="bg-white/60 rounded-lg p-3">
          <p className="text-xs text-[#9b7b5b]/60 mb-1">Số tài khoản</p>
          <div className="flex items-center justify-center gap-2">
            <span className="font-mono text-sm text-[#3d3d3d] tracking-wide">
              {account.accountNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={copyToClipboard}
              className="p-1.5 rounded-lg bg-[#c41e3a]/10 hover:bg-[#c41e3a]/20 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-[#c41e3a]" />
              )}
            </motion.button>
          </div>
          <p className="text-xs text-[#9b7b5b] mt-2">{account.accountName}</p>
        </div>

        {/* Nút chuyển khoản nhanh */}
        <motion.button
          onClick={handleTransfer}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 w-full py-2.5 mt-3 bg-[#c41e3a] hover:bg-[#a01830] text-white text-sm font-medium rounded-xl transition-colors shadow-md"
        >
          <ExternalLink className="w-4 h-4" />
          {copied ? 'Đã copy số TK!' : 'Chuyển khoản ngay'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function BankQRSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="w-full px-4 py-8 bg-linear-to-b from-[#fff5f5] via-white to-[#fff5f5] flex flex-col justify-center"
    >
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-[#c41e3a]/10 to-[#c9a962]/10 flex items-center justify-center"
          >
            <Gift className="w-8 h-8 text-[#c41e3a]" />
          </motion.div>
          
          <h2 className="font-script text-3xl text-[#c41e3a] mb-2">
            Mừng Cưới
          </h2>
          <p className="text-[#9b7b5b]/70 text-sm leading-relaxed max-w-xs mx-auto">
            Sự hiện diện của bạn là món quà quý giá nhất. 
            Nếu bạn muốn gửi thêm lời chúc qua quà tặng:
          </p>
        </motion.div>

        {/* Bank Cards */}
        <div className="grid grid-cols-2 gap-4">
          <BankCard 
            account={bankAccounts.groom} 
            person="groom"
            delay={0.3}
          />
          <BankCard 
            account={bankAccounts.bride} 
            person="bride"
            delay={0.4}
          />
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-xs text-[#9b7b5b]/50 mt-6"
        >
          💝 Chân thành cảm ơn bạn 💝
        </motion.p>
      </div>
    </section>
  );
}
