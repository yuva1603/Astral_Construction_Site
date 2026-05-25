import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ShieldCheck, Loader2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { closeEnquiryModal, submitEnquiry, resetEnquiryState } from '../../store/enquirySlice';
import toast from 'react-hot-toast';

// Zod Schema
const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[0-9+() -]{10,15}$/, 'Please enter a valid phone number (10-15 digits)'),
  city: z.string().optional(),
  projectInterested: z.string().min(1, 'Please select a project'),
  message: z.string().optional(),
  type: z.enum(['brochure', 'general', 'nri', 'career']).default('general')
});

export const EnquiryModal = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedProjectName, loading, success, error } = useSelector((state) => state.enquiry);

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
      projectInterested: '',
      message: '',
      type: 'general'
    }
  });

  // Pre-fill selected project name
  useEffect(() => {
    if (selectedProjectName) {
      setValue('projectInterested', selectedProjectName);
      setValue('type', 'brochure'); // assume brochure request if triggered from cards
    } else {
      setValue('projectInterested', '');
      setValue('type', 'general');
    }
  }, [selectedProjectName, setValue, isOpen]);

  // Handle toasts
  useEffect(() => {
    if (success) {
      toast.success('Thank you! Our relationship team will contact you shortly.', {
        duration: 5000,
        style: {
          background: '#16213e',
          color: '#f5f0e8',
          border: '1px solid #c9a84c'
        }
      });
      reset();
      dispatch(closeEnquiryModal());
      dispatch(resetEnquiryState());
    }
    if (error) {
      toast.error(error || 'Submission failed. Please try again.', {
        style: {
          background: '#16213e',
          color: '#f5f0e8',
          border: '1px solid #ef4444'
        }
      });
      dispatch(resetEnquiryState());
    }
  }, [success, error, reset, dispatch]);

  const onSubmit = (data) => {
    dispatch(submitEnquiry(data));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/90 backdrop-blur-md">
          {/* Modal Background click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeEnquiryModal())}
            className="absolute inset-0 cursor-pointer"
          />

          {/* Modal body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative z-10 w-full max-w-xl glass-panel rounded-sm shadow-2xl p-6 md:p-8 bg-surface-2 overflow-y-auto max-h-[90vh]"
          >
            {/* Close button */}
            <button
              onClick={() => dispatch(closeEnquiryModal())}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-6 border-b border-border/10 pb-4">
              <span className="text-secondary font-accent uppercase tracking-widest text-sm">Privilege Access</span>
              <h2 className="font-heading text-3xl text-white mt-1">Request Private Consultation</h2>
              <p className="text-text-muted text-xs mt-1">
                Leave your credentials to schedule a priority walkthrough and secure early-booking benefits.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                  Full Name <span className="text-secondary">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Shri Pavan Kumar"
                  {...register('name')}
                  className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-sm"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Contact info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                    Email Address <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="pavan@voora.co.in"
                    {...register('email')}
                    className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-sm"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                    Phone Number <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98400 12345"
                    {...register('phone')}
                    className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-sm"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              {/* City and Project Interested Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                    City of Residence
                  </label>
                  <input
                    type="text"
                    placeholder="Chennai"
                    {...register('city')}
                    className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-sm"
                  />
                </div>

                {/* Project Interested In */}
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                    Project of Interest <span className="text-secondary">*</span>
                  </label>
                  <select
                    {...register('projectInterested')}
                    className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-sm cursor-pointer"
                  >
                    <option value="" disabled className="bg-surface-2 text-text-muted">Select Project</option>
                    <option value="Voora One Sea" className="bg-surface-2 text-white">Voora One Sea (ECR)</option>
                    <option value="Voora Westside" className="bg-surface-2 text-white">Voora Westside (Ramapuram)</option>
                    <option value="Voora Beckford" className="bg-surface-2 text-white">Voora Beckford (Nungambakkam)</option>
                    <option value="Voora Highway Haven" className="bg-surface-2 text-white">Voora Highway Haven (Kanchipuram)</option>
                    <option value="Voora Agastya" className="bg-surface-2 text-white">Voora Agastya (Tondiarpet)</option>
                    <option value="Voora Tech Edge" className="bg-surface-2 text-white">Voora Tech Edge (Guindy)</option>
                    <option value="General Inquiry" className="bg-surface-2 text-white">General Voora Inquiry</option>
                  </select>
                  {errors.projectInterested && <p className="text-red-400 text-xs mt-1">{errors.projectInterested.message}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                  Message / Comments
                </label>
                <textarea
                  rows="3"
                  placeholder="I am interested in scheduling a site visit."
                  {...register('message')}
                  className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-sm"
                />
              </div>

              {/* Submit and safety info */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold h-12 flex items-center justify-center gap-2 cursor-pointer font-bold tracking-widest"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Transmitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Secure Consulting Slot</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-text-muted justify-center mt-3 border-t border-border/5 pt-3">
                <ShieldCheck size={12} className="text-secondary" />
                <span>Your details are fully protected under Voora privacy code guidelines.</span>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
