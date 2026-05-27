import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { submitEnquiry, resetEnquiryState } from '../store/enquirySlice';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { pageVariants } from '../animations/pageTransitions';
import { ShieldCheck, Scale, Globe, Landmark, CircleCheck, HelpCircle, Loader2, User, Mail, Phone, MapPin } from 'lucide-react';

const nriEnquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid international number'),
  city: z.string().min(1, 'Country of residence is required'),
  projectInterested: z.string().min(1, 'Please select a project'),
  message: z.string().optional()
});

export const NRI = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.enquiry);

  // Recharts Currency exchange trend mock data (USD to INR over last few years)
  const exchangeTrendData = [
    { year: '2020', usdToInr: 74.1 },
    { year: '2021', usdToInr: 75.8 },
    { year: '2022', usdToInr: 81.3 },
    { year: '2023', usdToInr: 82.8 },
    { year: '2024', usdToInr: 83.5 },
    { year: '2026', usdToInr: 84.6 }
  ];

  const nriBenefits = [
    {
      title: 'Favorable Exchange Gains',
      desc: 'With the strengthening of foreign currencies, NRI buyers gain up to 25% larger relative value in Indian assets.',
      icon: <Globe className="text-primary" size={22} />
    },
    {
      title: 'High Rental Yields',
      desc: 'OMR and ECR corridors yield 4.5% - 6% gross annual rental returns driven by continuous corporate expansions.',
      icon: <Landmark className="text-primary" size={22} />
    },
    {
      title: 'Simplified FEMA Legal Code',
      desc: 'RBI allows NRIs to hold properties directly. No specific prior approval is needed for resident acquisitions.',
      icon: <Scale className="text-primary" size={22} />
    }
  ];

  const complianceFaqs = [
    { q: 'Can an NRI acquire residential real estate in India?', a: 'Yes. Under general permission granted by the RBI, NRIs can acquire any residential or commercial property in India without any prior approval.' },
    { q: 'How can NRIs handle payment transactions?', a: 'Payments must be routed through banking channels using NRE, NRO, or FCNR accounts in India. Direct cash transactions or foreign currency handovers are strictly prohibited.' },
    { q: 'Is repatriation of sale proceeds allowed?', a: 'Yes. You can repatriate sale proceeds of up to two residential properties back to your country of residence, subject to tax clearances (TDS under FEMA regulations).' }
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(nriEnquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
      projectInterested: 'General NRI Consultation',
      message: ''
    }
  });

  // Handle toasts
  React.useEffect(() => {
    if (success) {
      toast.success('Your dedicated NRI Desk request has been secured. A specialist will call shortly.', {
        duration: 5000
      });
      reset();
      dispatch(resetEnquiryState());
    }
    if (error) {
      toast.error(error || 'Submission failed. Please check connectivity.');
      dispatch(resetEnquiryState());
    }
  }, [success, error, reset, dispatch]);

  const onSubmit = (data) => {
    dispatch(submitEnquiry({ ...data, type: 'nri' }));
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
        <title>NRI Real Estate Investments Chennai | Voora Gated Communities</title>
        <meta name="description" content="Dedicated NRI Real Estate investment support desk. FEMA guidelines, currency trends charts, taxation advice, and repatriation check-lists." />
      </Helmet>

      {/* Decorative glowing blobs */}
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-secondary/5 blur-[100px] pointer-events-none select-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 pt-6 relative z-10">
        <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Exclusive Lounge</span>
        <h1 className="font-display text-4xl md:text-5xl font-black text-primary leading-tight uppercase tracking-tight">
          Global Indian Portfolios
        </h1>
        <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        <p className="text-text-muted text-xs sm:text-sm mt-4 leading-relaxed max-w-xl mx-auto uppercase tracking-wider font-semibold">
          Tailored property consultation, currency gains analysis, and complete FEMA-RBI regulatory check assistance for our global NRI clients.
        </p>
      </div>

      {/* NRI INVESTMENT DRIVERS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative z-10">
        {nriBenefits.map((item, idx) => (
          <div key={idx} className="glass-panel p-8 bg-white/70 border border-white/50 rounded-[2rem] text-center flex flex-col items-center gap-4 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 hover:border-primary/25 shadow-sm">
            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/15 text-primary flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <h4 className="font-display text-xl font-black text-primary uppercase tracking-wide">{item.title}</h4>
            <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* DUAL COLUMN: CURRENCY CHART & COMPLIANCE TIMELINE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center relative z-10">
        
        {/* USD Exchange gains */}
        <div className="lg:col-span-6 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-[10px] font-extrabold uppercase tracking-widest">
            Financial Trends
          </span>
          <h3 className="font-display text-3xl font-black text-primary uppercase tracking-tight">USD to INR Exchange Trends</h3>
          <p className="text-text-muted text-xs leading-relaxed">
            The steady upward trajectory of key international currencies against the Indian Rupee presents a unique investment window for NRI clients, providing immediate capital leverage.
          </p>
          <div className="h-64 bg-white/70 p-5 rounded-[2.5rem] border border-white/50 shadow-md">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={exchangeTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="year" stroke="#5e5296" fontSize={10} tickLine={false} style={{ fontWeight: 600 }} />
                <YAxis stroke="#5e5296" fontSize={10} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} style={{ fontWeight: 600 }} />
                <Tooltip
                  contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(99, 70, 229, 0.2)', borderRadius: '16px', fontSize: '11px', boxShadow: '0 10px 25px rgba(99, 70, 229, 0.05)' }}
                  labelStyle={{ color: '#3b22a1', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="usdToInr" stroke="#6346e5" strokeWidth={3} dot={{ fill: '#3b22a1', r: 5, strokeWidth: 2, stroke: '#ffffff' }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Repatriation checklist */}
        <div className="lg:col-span-6 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-[10px] font-extrabold uppercase tracking-widest">
            Workflow
          </span>
          <h3 className="font-display text-3xl font-black text-primary uppercase tracking-tight">Capital Repatriation Checklist</h3>
          <div className="space-y-4">
            {[
              'Acquire residential/commercial property using transparent NRE/NRO channels.',
              'Submit basic declaration models to the Authorized Dealer Bank within 90 days.',
              'Declare annual rental yields under regular Form-16 Income clearances.',
              'During asset disposal, secure TDS clearance certifications under Section 195.',
              'Smoothly repatriate up to 2 properties capital proceeds per fiscal year.'
            ].map((p, idx) => (
              <div key={idx} className="flex gap-3.5 items-start">
                <CircleCheck className="text-primary shrink-0 mt-0.5" size={17} />
                <p className="text-text-muted text-xs leading-normal font-medium">{p}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* DEDICATED NRI DESK REQUEST FORM */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12 scroll-mt-28 relative z-10">
        
        {/* Compliance FAQs */}
        <div className="lg:col-span-6 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-[10px] font-extrabold uppercase tracking-widest">
            Knowledge Base
          </span>
          <h3 className="font-display text-3xl font-black text-primary uppercase tracking-tight">Investment Compliance FAQs</h3>
          
          <div className="space-y-6">
            {complianceFaqs.map((faq, idx) => (
              <div key={idx} className="flex gap-3.5 items-start">
                <HelpCircle className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <h5 className="font-display font-black text-primary text-base uppercase tracking-wide">{faq.q}</h5>
                  <p className="text-text-muted text-xs leading-relaxed mt-1.5">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Consulting Request Form */}
        <div className="lg:col-span-6 glass-panel p-8 rounded-[2.5rem] bg-white/70 border border-white/50 shadow-2xl">
          <div className="mb-6">
            <span className="text-secondary font-extrabold uppercase tracking-widest text-[10px] bg-secondary/10 border border-secondary/10 px-3.5 py-1 rounded-full inline-block">NRI Concierge Desk</span>
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
                  placeholder="Ramesh Krishnan"
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
                    placeholder="ramesh@nri.com"
                    {...register('email')}
                    className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-3 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-semibold"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[10px] mt-1 pl-4 font-bold">{errors.email.message}</p>}
              </div>

              {/* Residence */}
              <div>
                <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                  Country of Residence *
                </label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-4 text-primary/40" size={14} />
                  <input
                    type="text"
                    placeholder="United States"
                    {...register('city')}
                    className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-3 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-semibold"
                  />
                </div>
                {errors.city && <p className="text-red-500 text-[10px] mt-1 pl-4 font-bold">{errors.city.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                  International Phone *
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-4 text-primary/40" size={14} />
                  <input
                    type="tel"
                    placeholder="+1 408 123 4567"
                    {...register('phone')}
                    className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-3 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-semibold"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-[10px] mt-1 pl-4 font-bold">{errors.phone.message}</p>}
              </div>

              {/* Landmark Selection */}
              <div>
                <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                  Preferred Landmark *
                </label>
                <select
                  required
                  {...register('projectInterested')}
                  className="w-full bg-white/50 border border-border/80 text-primary rounded-full px-5 py-3 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-bold uppercase tracking-wider appearance-none cursor-pointer"
                >
                  <option value="">Preferred Landmark</option>
                  <option value="General NRI Consultation">General NRI Consultation</option>
                  <option value="Voora One Sea">Voora One Sea (ECR)</option>
                  <option value="Voora Westside">Voora Westside (Ramapuram)</option>
                  <option value="Voora Beckford">Voora Beckford (Nungambakkam)</option>
                  <option value="Voora Highway Haven">Voora Highway Haven (NH-48)</option>
                  <option value="Voora Tech Edge">Voora Tech Edge (Guindy)</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                Special Directives / Repatriation Queries
              </label>
              <textarea
                rows="3"
                placeholder="Describe any legal details about USD repatriation or property search requirements in brief..."
                {...register('message')}
                className="w-full bg-white/50 border border-border/80 text-primary rounded-[1.5rem] px-5 py-4 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-medium resize-none"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold h-12 flex items-center justify-center gap-2 cursor-pointer font-bold tracking-widest text-xs uppercase shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Configuring Direct Link...</span>
                </>
              ) : (
                <>
                  <CircleCheck size={14} />
                  <span>Secure Privileged Consulting slot</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5 text-[9px] text-text-muted justify-center mt-3 pt-2">
              <ShieldCheck size={11} className="text-primary shrink-0" />
              <span className="font-bold uppercase tracking-wider">Full compliance backed under banking guidelines and FEMA codes.</span>
            </div>
          </form>
        </div>

      </section>

    </motion.div>
  );
};

export default NRI;
