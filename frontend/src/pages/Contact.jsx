import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { submitEnquiry, resetEnquiryState } from '../store/enquirySlice';
import toast from 'react-hot-toast';
import { pageVariants, scrollReveal } from '../animations/pageTransitions';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, MessageCircle, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[0-9+() -]{10,15}$/, 'Please enter a valid phone number'),
  city: z.string().optional(),
  projectInterested: z.string().min(1, 'Please select a project'),
  message: z.string().min(5, 'Message must be at least 5 characters')
});

export const Contact = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.enquiry);

  const contactMethods = [
    {
      title: 'Corporate Headquarters',
      desc: 'Voora Towers, Old No. 12, New No. 23, College Road, Nungambakkam, Chennai - 600006',
      icon: <MapPin className="text-secondary" />
    },
    {
      title: 'Concierge Lines',
      desc: '+91 44 2822 4545 / +91 98400 12345',
      icon: <Phone className="text-secondary" />
    },
    {
      title: 'Email Correspondence',
      desc: 'info@voora.co.in / concierge@voora.co.in',
      icon: <Mail className="text-secondary" />
    },
    {
      title: 'Lounge Hours',
      desc: 'Monday - Saturday: 09:30 AM - 06:30 PM (IST)\nSunday: Closed',
      icon: <Clock className="text-secondary" />
    }
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
      projectInterested: '',
      message: ''
    }
  });

  // Handle toasts
  React.useEffect(() => {
    if (success) {
      toast.success('Your message has been secure-transmitted. Relationships Desk will call back shortly.', {
        duration: 5000,
        style: { background: '#16213e', color: '#f5f0e8', border: '1px solid #c9a84c' }
      });
      reset();
      dispatch(resetEnquiryState());
    }
    if (error) {
      toast.error(error || 'Failed to submit. Check network connectivity.', {
        style: { background: '#16213e', color: '#f5f0e8', border: '1px solid #ef4444' }
      });
      dispatch(resetEnquiryState());
    }
  }, [success, error, reset, dispatch]);

  const onSubmit = (data) => {
    dispatch(submitEnquiry({ ...data, type: 'general' }));
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full relative py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <Helmet>
        <title>Contact Voora Real Estate | Premium Real Estate Chennai</title>
        <meta name="description" content="Get in touch with Voora Real Estate Corporate Head Office in Nungambakkam. Contact phone numbers, office locations maps, and WhatsApp chat support." />
      </Helmet>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 pt-6">
        <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Concierge Desk</span>
        <h1 className="font-display text-4xl md:text-5xl text-white leading-tight">
          Request Site Consultation
        </h1>
        <div className="w-16 h-0.5 bg-secondary mx-auto mt-4 mb-4" />
        <p className="text-text-muted text-sm leading-relaxed">
          Plan your site visit with our senior portfolio counselors. Secure priority access bookings and customized financing timelines.
        </p>
      </div>

      {/* TWO COLUMNS: CONTACT DETAILS & CONTACT FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
        
        {/* Contact details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-secondary font-accent uppercase tracking-widest text-xs block">Information desk</span>
            <h3 className="font-heading text-3xl text-white">Direct Connects</h3>
          </div>

          <div className="space-y-6">
            {contactMethods.map((m, idx) => (
              <div key={idx} className="flex gap-4 p-5 bg-surface-2 rounded-sm border border-border/5">
                <div className="p-3 bg-secondary/15 rounded-sm border border-secondary/25 shrink-0 self-start">
                  {m.icon}
                </div>
                <div>
                  <h5 className="font-heading font-semibold text-white text-base">{m.title}</h5>
                  <p className="text-text-muted text-xs leading-relaxed mt-2 whitespace-pre-line">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp Direct link */}
          <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-sm flex items-center justify-between">
            <div>
              <h5 className="font-bold text-white text-sm uppercase tracking-wider">Fast Concierge Desk</h5>
              <p className="text-text-muted text-[10px] uppercase mt-1 tracking-widest font-semibold">Instant reply over WhatsApp</p>
            </div>
            <a
              href="https://wa.me/919840012345?text=Hi%20Voora,%20I'm%20interested%20in%20a%20site%20walkthrough."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-emerald-500 text-surface rounded-full flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-7 glass-panel p-8 rounded-sm bg-surface-2 border border-border/10">
          <div className="mb-6">
            <span className="text-secondary font-accent uppercase tracking-widest text-xs">Secure Consulting portal</span>
            <h3 className="font-heading text-2xl text-white mt-1">Book Premium Consultation</h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Shri Pavan Suman"
                {...register('name')}
                className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-xs"
              />
              {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="pavan@voora.co.in"
                  {...register('email')}
                  className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-xs"
                />
                {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98400 12345"
                  {...register('phone')}
                  className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-xs"
                />
                {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                  City of Residence
                </label>
                <input
                  type="text"
                  placeholder="Chennai"
                  {...register('city')}
                  className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                  Project of Interest *
                </label>
                <select
                  {...register('projectInterested')}
                  className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-xs cursor-pointer"
                >
                  <option value="" disabled>Select Project</option>
                  <option value="Voora One Sea">Voora One Sea (ECR)</option>
                  <option value="Voora Westside">Voora Westside (Ramapuram)</option>
                  <option value="Voora Beckford">Voora Beckford (Nungambakkam)</option>
                  <option value="Voora Highway Haven">Voora Highway Haven (NH-48)</option>
                  <option value="Voora Tech Edge">Voora Tech Edge (Guindy)</option>
                  <option value="General Inquiry">General Corporate Inquiry</option>
                </select>
                {errors.projectInterested && <p className="text-red-400 text-[10px] mt-1">{errors.projectInterested.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                Detailed message *
              </label>
              <textarea
                rows="4"
                placeholder="I would like to schedule a private visit to Voora One Sea on Saturday..."
                {...register('message')}
                className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-xs"
              />
              {errors.message && <p className="text-red-400 text-[10px] mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold h-11 flex items-center justify-center gap-2 cursor-pointer font-bold tracking-widest text-xs uppercase"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Transmitting Security Lines...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Transmit Consulting Request</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5 text-[9px] text-text-muted justify-center mt-3 pt-2">
              <ShieldCheck size={10} className="text-secondary" />
              <span>Full compliance backed under security codes.</span>
            </div>
          </form>
        </div>

      </div>

      {/* MAPS EMBED */}
      <section className="w-full rounded-sm overflow-hidden border border-border/15 h-80 shadow-2xl relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.29!2d80.24!3d13.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzM2LjAiTiA4MMKwMTQnMjQuMCJF!5e0!3m2!1sen!2sin!4v1620000000002"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full border-0"
          title="Voora Headquarters Map"
        />
      </section>

    </motion.div>
  );
};

export default Contact;
