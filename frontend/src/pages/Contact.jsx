import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { submitEnquiry, resetEnquiryState } from '../store/enquirySlice';
import toast from 'react-hot-toast';
import { pageVariants } from '../animations/pageTransitions';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, MessageCircle, Loader2, User, HelpCircle } from 'lucide-react';

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
      icon: <MapPin className="text-primary" size={20} />
    },
    {
      title: 'Concierge Lines',
      desc: '+91 44 2822 4545 / +91 98400 12345',
      icon: <Phone className="text-primary" size={20} />
    },
    {
      title: 'Email Correspondence',
      desc: 'info@voora.co.in / concierge@voora.co.in',
      icon: <Mail className="text-primary" size={20} />
    },
    {
      title: 'Lounge Hours',
      desc: 'Monday - Saturday: 09:30 AM - 06:30 PM (IST)\nSunday: Closed',
      icon: <Clock className="text-primary" size={20} />
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
        duration: 5000
      });
      reset();
      dispatch(resetEnquiryState());
    }
    if (error) {
      toast.error(error || 'Failed to submit. Check network connectivity.');
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
      className="w-full relative py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto overflow-x-hidden"
    >
      <Helmet>
        <title>Contact Voora Real Estate | Premium Real Estate Chennai</title>
        <meta name="description" content="Get in touch with Voora Real Estate Corporate Head Office in Nungambakkam. Contact phone numbers, office locations maps, and WhatsApp chat support." />
      </Helmet>

      {/* Decorative glowing blobs */}
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-secondary/5 blur-[100px] pointer-events-none select-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 pt-6 relative z-10">
        <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Concierge Desk</span>
        <h1 className="font-display text-4xl md:text-5xl font-black text-primary leading-tight uppercase tracking-tight">
          Request Site Consultation
        </h1>
        <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        <p className="text-text-muted text-xs sm:text-sm mt-4 leading-relaxed max-w-xl mx-auto uppercase tracking-wider font-semibold">
          Plan your site visit with our senior portfolio counselors. Secure priority access bookings and customized financing timelines.
        </p>
      </div>

      {/* TWO COLUMNS: CONTACT DETAILS & CONTACT FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start relative z-10">
        
        {/* Contact details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-[10px] font-extrabold uppercase tracking-widest">
              Information desk
            </span>
            <h3 className="font-display text-3xl font-black text-primary uppercase tracking-tight">Direct Connects</h3>
          </div>

          <div className="space-y-6">
            {contactMethods.map((m, idx) => (
              <div key={idx} className="flex gap-4.5 p-6 glass-panel bg-white/70 border border-white/50 rounded-[2rem] hover:shadow-md hover:border-primary/20 transition-all duration-300 hover:translate-y-[-2px] shadow-sm">
                <div className="p-3.5 bg-primary/10 rounded-2xl border border-primary/15 text-primary shrink-0 self-start">
                  {m.icon}
                </div>
                <div>
                  <h5 className="font-display font-black text-primary text-base uppercase tracking-wide">{m.title}</h5>
                  <p className="text-text-muted text-xs leading-relaxed mt-2 whitespace-pre-line font-medium">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp Direct link */}
          <div className="p-6 bg-emerald-500/8 border border-emerald-500/20 rounded-[2rem] flex items-center justify-between shadow-[0_15px_40px_rgba(16,185,129,0.03)] hover:border-emerald-500/30 transition-all duration-300">
            <div>
              <h5 className="font-display font-black text-emerald-700 text-sm uppercase tracking-wider">Fast Concierge Desk</h5>
              <p className="text-text-muted text-[9px] uppercase mt-1 tracking-widest font-extrabold">Instant reply over WhatsApp</p>
            </div>
            <a
              href="https://wa.me/919840012345?text=Hi%20Voora,%20I'm%20interested%20in%20a%20site%20walkthrough."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-7 glass-panel p-8 rounded-[2.5rem] bg-white/70 border border-white/50 shadow-2xl">
          <div className="mb-6">
            <span className="text-secondary font-extrabold uppercase tracking-widest text-[10px] bg-secondary/10 border border-secondary/10 px-3.5 py-1 rounded-full inline-block">Secure Consulting portal</span>
            <h3 className="font-display text-2.5xl font-black text-primary uppercase tracking-tight mt-3">Book Premium Consultation</h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                Full Name *
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-4 text-primary/40" size={14} />
                <input
                  type="text"
                  placeholder="Shri Pavan Suman"
                  {...register('name')}
                  className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-3 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-semibold"
                />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] mt-1 pl-4 font-bold">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                  Email Address *
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-primary/40" size={14} />
                  <input
                    type="email"
                    placeholder="pavan@voora.co.in"
                    {...register('email')}
                    className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-3 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-semibold"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[10px] mt-1 pl-4 font-bold">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                  Phone Number *
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-4 text-primary/40" size={14} />
                  <input
                    type="tel"
                    placeholder="+91 98400 12345"
                    {...register('phone')}
                    className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-3 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-semibold"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-[10px] mt-1 pl-4 font-bold">{errors.phone.message}</p>}
              </div>
            </div>

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
                    className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-3 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Preferred Project */}
              <div>
                <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                  Project of Interest *
                </label>
                <select
                  required
                  {...register('projectInterested')}
                  className="w-full bg-white/50 border border-border/80 text-primary rounded-full px-5 py-3 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-bold uppercase tracking-wider appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Project</option>
                  <option value="Voora One Sea">Voora One Sea (ECR)</option>
                  <option value="Voora Westside">Voora Westside (Ramapuram)</option>
                  <option value="Voora Beckford">Voora Beckford (Nungambakkam)</option>
                  <option value="Voora Highway Haven">Voora Highway Haven (NH-48)</option>
                  <option value="Voora Tech Edge">Voora Tech Edge (Guindy)</option>
                  <option value="General Inquiry">General Corporate Inquiry</option>
                </select>
                {errors.projectInterested && <p className="text-red-500 text-[10px] mt-1 pl-4 font-bold">{errors.projectInterested.message}</p>}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                Detailed message *
              </label>
              <textarea
                rows="4"
                placeholder="I would like to schedule a private visit to Voora One Sea on Saturday..."
                {...register('message')}
                className="w-full bg-white/50 border border-border/80 text-primary rounded-[1.5rem] px-5 py-4 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-medium resize-none"
              />
              {errors.message && <p className="text-red-500 text-[10px] mt-1 pl-4 font-bold">{errors.message.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold h-12 flex items-center justify-center gap-2 cursor-pointer font-bold tracking-widest text-xs uppercase shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Transmitting Security Lines...</span>
                </>
              ) : (
                <>
                  <Send size={13} />
                  <span>Transmit Consulting Request</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5 text-[9px] text-text-muted justify-center mt-3 pt-2">
              <ShieldCheck size={11} className="text-primary shrink-0" />
              <span className="font-bold uppercase tracking-wider">Full compliance backed under security codes.</span>
            </div>
          </form>
        </div>

      </div>

      {/* MAPS EMBED */}
      <section className="w-full rounded-[2.5rem] overflow-hidden border border-white/60 h-80 shadow-2xl relative bg-white/40 z-10">
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
