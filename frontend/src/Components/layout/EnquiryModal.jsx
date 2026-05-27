import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ShieldCheck, Loader2, User, Mail, Phone, MapPin, Building2, Award, CheckCircle2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { closeEnquiryModal, submitEnquiry, resetEnquiryState } from '../../store/enquirySlice';
import toast from 'react-hot-toast';

// Zod Schema
const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid international number'),
  city: z.string().optional(),
  projectInterested: z.string().min(1, 'Please select a project'),
  message: z.string().optional(),
  type: z.enum(['brochure', 'general', 'nri', 'career']).default('general')
});

export const EnquiryModal = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedProjectName, loading, success, error } = useSelector((state) => state.enquiry);

  const [isScrolled, setIsScrolled] = useState(false);
  const [formScrollTop, setFormScrollTop] = useState(0);
  const [formScrollHeight, setFormScrollHeight] = useState(0);
  const [formClientHeight, setFormClientHeight] = useState(0);

  // Monitor scroll to sync top position dynamically with the navbar height
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormScroll = (e) => {
    setFormScrollTop(e.target.scrollTop);
    setFormScrollHeight(e.target.scrollHeight);
    setFormClientHeight(e.target.clientHeight);
  };

  // Prevent body scroll and initialize modal scroll metrics
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        const el = document.getElementById('modal-scroll-fields');
        if (el) {
          setFormScrollHeight(el.scrollHeight);
          setFormClientHeight(el.clientHeight);
          setFormScrollTop(el.scrollTop);
        }
      }, 150);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const canScrollUp = formScrollTop > 4;
  const canScrollDown = formScrollHeight - formScrollTop - formClientHeight > 4;

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
        duration: 5000
      });
      reset();
      dispatch(closeEnquiryModal());
      dispatch(resetEnquiryState());
    }
    if (error) {
      toast.error(error || 'Submission failed. Please try again.');
      dispatch(resetEnquiryState());
    }
  }, [success, error, reset, dispatch]);

  const onSubmit = (data) => {
    dispatch(submitEnquiry(data));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className={`fixed left-0 right-0 bottom-0 z-40 flex items-start justify-center p-4 pt-0 bg-white/40 backdrop-blur-md overflow-y-auto border-t border-border/10 transition-all duration-500 ${
            isScrolled ? 'top-[64px]' : 'top-[76px]'
          }`}
        >
          
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
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative z-10 w-full max-w-4xl glass-panel rounded-t-none rounded-b-[2.5rem] shadow-2xl p-7 md:p-9 bg-white/95 border-t-0 border-white/60 mt-0 mb-4"
          >
            {/* Close button */}
            <button
              onClick={() => dispatch(closeEnquiryModal())}
              className="absolute top-5 right-5 p-2 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-full text-primary transition-all duration-300 cursor-pointer flex items-center justify-center shadow-sm z-35"
            >
              <X size={15} />
            </button>

            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Form */}
              <div className="lg:col-span-7">
                {/* Header */}
                <div className="mb-6 border-b border-border/10 pb-4">
                  <span className="text-secondary font-extrabold uppercase tracking-widest text-[10px] bg-secondary/10 border border-secondary/10 px-3.5 py-1 rounded-full inline-block">Privilege Access</span>
                  <h2 className="font-display text-3xl font-black text-primary uppercase tracking-tight mt-3">Request Consultation</h2>
                  <p className="text-text-muted text-xs mt-1.5 leading-relaxed">
                    Leave your credentials to schedule a priority walkthrough and secure early-booking benefits.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  
                  {/* Form fields with custom fade-scroll effects */}
                  <div className="relative">
                    {/* Top Scroll Fade Mask */}
                    <div className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-25 transition-opacity duration-300 ${canScrollUp ? 'opacity-100' : 'opacity-0'}`} />
                    
                    {/* Bottom Scroll Fade Mask */}
                    <div className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-25 transition-opacity duration-300 ${canScrollDown ? 'opacity-100' : 'opacity-0'}`} />

                    <div 
                      id="modal-scroll-fields"
                      onScroll={handleFormScroll}
                      className="max-h-[260px] md:max-h-[300px] overflow-y-auto pr-1.5 space-y-4 scrollbar-thin pb-2 pt-1"
                    >
                      {/* Name */}
                      <div>
                        <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                          Full Name <span className="text-secondary">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <User className="absolute left-4 text-primary/40" size={14} />
                          <input
                            type="text"
                            placeholder="Shri Pavan Kumar"
                            {...register('name')}
                            className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-2.5 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-semibold"
                          />
                        </div>
                        {errors.name && <p className="text-red-500 text-[10px] mt-1 pl-4 font-bold">{errors.name.message}</p>}
                      </div>

                      {/* Contact info grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email */}
                        <div>
                          <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                            Email Address <span className="text-secondary">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <Mail className="absolute left-4 text-primary/40" size={14} />
                            <input
                              type="email"
                              placeholder="pavan@voora.co.in"
                              {...register('email')}
                              className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-2.5 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-semibold"
                            />
                          </div>
                          {errors.email && <p className="text-red-500 text-[10px] mt-1 pl-4 font-bold">{errors.email.message}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                            Phone Number <span className="text-secondary">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <Phone className="absolute left-4 text-primary/40" size={14} />
                            <input
                              type="tel"
                              placeholder="+91 98400 12345"
                              {...register('phone')}
                              className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-2.5 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-semibold"
                            />
                          </div>
                          {errors.phone && <p className="text-red-500 text-[10px] mt-1 pl-4 font-bold">{errors.phone.message}</p>}
                        </div>
                      </div>

                      {/* City and Project Interested Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* City */}
                        <div>
                          <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                            City of Residence
                          </label>
                          <div className="relative flex items-center">
                            <MapPin className="absolute left-4 text-primary/40" size={14} />
                            <input
                              type="text"
                              placeholder="Chennai"
                              {...register('city')}
                              className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-2.5 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-semibold"
                            />
                          </div>
                        </div>

                        {/* Project Interested In */}
                        <div>
                          <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                            Project of Interest <span className="text-secondary">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <Building2 className="absolute left-4 text-primary/40" size={14} />
                            <select
                              {...register('projectInterested')}
                              className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-2.5 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-bold uppercase tracking-wider cursor-pointer appearance-none"
                            >
                              <option value="" disabled>Select Project</option>
                              <option value="Voora One Sea">Voora One Sea (ECR)</option>
                              <option value="Voora Westside">Voora Westside (Ramapuram)</option>
                              <option value="Voora Beckford">Voora Beckford (Nungambakkam)</option>
                              <option value="Voora Highway Haven">Voora Highway Haven (NH-48)</option>
                              <option value="Voora Agastya">Voora Agastya (Tondiarpet)</option>
                              <option value="Voora Tech Edge">Voora Tech Edge (Guindy)</option>
                              <option value="General Inquiry">General Voora Inquiry</option>
                            </select>
                          </div>
                          {errors.projectInterested && <p className="text-red-500 text-[10px] mt-1 pl-4 font-bold">{errors.projectInterested.message}</p>}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                          Message / Comments
                        </label>
                        <textarea
                          rows="3"
                          placeholder="Describe your property requirements or consultation inquiries in brief..."
                          {...register('message')}
                          className="w-full bg-white/50 border border-border/80 text-primary rounded-[1.5rem] px-5 py-4 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-medium resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit and safety info */}
                  <div className="pt-2 border-t border-border/10">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-gold h-12 flex items-center justify-center gap-2 cursor-pointer font-bold tracking-widest text-xs uppercase shadow-lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Transmitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Secure Consulting Slot</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-[9px] text-text-muted justify-center mt-3 pt-3 border-t border-border/5">
                    <ShieldCheck size={11} className="text-primary shrink-0" />
                    <span className="font-bold uppercase tracking-wider">Your details are protected under Voora guidelines.</span>
                  </div>
                </form>
              </div>

              {/* Right Column: Image with gradient border transition */}
              <div className="lg:col-span-5 hidden lg:block self-stretch flex flex-col justify-center pl-4 border-l border-border/10">
                <div className="relative p-[3.5px] rounded-[2rem] bg-gradient-to-tr from-primary via-secondary to-accent hover:from-secondary hover:via-accent hover:to-primary transition-all duration-700 ease-out shadow-[0_10px_30px_rgba(99,70,229,0.04)] hover:shadow-[0_20px_45px_rgba(99,70,229,0.22)] group/img h-[390px] cursor-pointer">
                  
                  {/* Outer border mask */}
                  <div className="rounded-[1.8rem] overflow-hidden w-full h-full bg-white relative">
                    <img
                      src="/images/arkhe_villa.png"
                      alt="Voora Premium Showcase Facade"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                    />
                    
                    {/* Brand legacy floating glass badge (Small, Perfect, Animated) */}
                    <div className="absolute left-4 bottom-4 z-20 bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/50 shadow-lg flex flex-col gap-2 max-w-[130px] transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:border-primary/25 group/badge select-none">
                      <div className="flex items-center gap-2 border-b border-border/20 pb-2">
                        <div className="w-5.5 h-5.5 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0 transition-transform duration-500 group-hover/badge:rotate-12">
                          <Award size={11} />
                        </div>
                        <div className="leading-none">
                          <p className="font-display text-[10.5px] font-black text-primary leading-none uppercase">VOORA</p>
                          <span className="text-[6.5px] font-extrabold text-text-muted uppercase tracking-widest mt-0.5 block">ESTD 1996</span>
                        </div>
                      </div>

                      <div className="space-y-1 text-text-muted">
                        <div className="flex items-center gap-1.5 transition-transform duration-300 group-hover/badge:translate-x-0.5">
                          <CheckCircle2 size={9} className="text-primary shrink-0" />
                          <span className="text-[8px] font-extrabold uppercase tracking-wider">30+ Yrs Legacy</span>
                        </div>
                        <div className="flex items-center gap-1.5 transition-transform duration-300 group-hover/badge:translate-x-0.5 delay-75">
                          <CheckCircle2 size={9} className="text-primary shrink-0" />
                          <span className="text-[8px] font-extrabold uppercase tracking-wider">5M+ Sqft Built</span>
                        </div>
                        <div className="flex items-center gap-1.5 transition-transform duration-300 group-hover/badge:translate-x-0.5 delay-150">
                          <CheckCircle2 size={9} className="text-primary shrink-0" />
                          <span className="text-[8px] font-extrabold uppercase tracking-wider">5k+ Families</span>
                        </div>
                        <div className="flex items-center gap-1.5 transition-transform duration-300 group-hover/badge:translate-x-0.5 delay-200">
                          <CheckCircle2 size={9} className="text-primary shrink-0" />
                          <span className="text-[8px] font-extrabold uppercase tracking-wider">50+ Landmarks</span>
                        </div>
                      </div>
                    </div>

                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
