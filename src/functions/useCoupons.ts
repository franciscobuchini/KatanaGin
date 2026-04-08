import { useState } from 'react';
import couponsData from '../data/coupons.json';

interface AppliedCoupon {
  discount: number;
  type: string;
}

export const useCoupons = (subtotal: number) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [discountMessage, setDiscountMessage] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

  const applyCoupon = () => {
    const foundCoupon = couponsData.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (foundCoupon) {
      setCouponStatus('valid');
      setAppliedCoupon({ discount: foundCoupon.discount, type: foundCoupon.type });
      
      const message = foundCoupon.type === 'percentage' 
        ? `¡Cupón del ${foundCoupon.discount}% aplicado!` 
        : foundCoupon.type === 'fixed' 
          ? `¡Descuento de $${foundCoupon.discount} aplicado!` 
          : '¡Cupón aplicado exitosamente!';
          
      setDiscountMessage(message);
    } else {
      setCouponStatus('invalid');
      setDiscountMessage('Cupón inválido o expirado.');
    }
  };

  const handleCouponChange = (val: string) => {
    setCouponCode(val);
    if (couponStatus !== 'idle') {
      setCouponStatus('idle');
      setAppliedCoupon(null);
    }
  };

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discountAmount = subtotal * (appliedCoupon.discount / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = appliedCoupon.discount;
    }
  }

  const total = Math.max(0, subtotal - discountAmount);

  return {
    couponCode,
    couponStatus,
    appliedCoupon,
    discountMessage,
    discountAmount,
    total,
    applyCoupon,
    handleCouponChange
  };
};
