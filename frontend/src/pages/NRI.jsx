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
import { pageVariants, scrollReveal, staggerContainer, staggerItem } from '../animations/pageTransitions';
import { ShieldCheck, Scale, Globe, Landmark, CircleCheck, HelpCircle, Loader2, ArrowUpRight } from 'lucide-react';

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
      icon: <Globe className="text-secondary" />
    },
    {
      title: 'High Rental Yields',
      desc: 'OMR and ECR corridors yield 4.5% - 6% gross annual rental returns driven by continuous corporate expansions.',
      icon: <Landmark className="text-secondary" />
    },
    {
      title: 'Simplified FEMA Legal Code',
      desc: 'RBI allows NRIs to hold properties directly. No specific prior approval is needed for resident acquisitions.',
      icon: <Scale className="text-secondary" />
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
        duration: 5000,
        style: { background: '#16213e', color: '#f5f0e8', border: '1px solid #c9a84c' }
      });
      reset();
      dispatch(resetEnquiryState());
    }
    if (error) {
      toast.error(error || 'Submission failed. Please check connectivity.', {
        style: { background: '#16213e', color: '#f5f0e8', border: '1px solid #ef4444' }
      });
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
      className="w-full relative py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <Helmet>
        <title>NRI Real Estate Investments Chennai | Voora Gated Communities</title>
        <meta name="description" content="Dedicated NRI Real Estate investment support desk. FEMA guidelines, currency trends charts, taxation advice, and repatriation check-lists." />
      </Helmet>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 pt-6">
        <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Exclusive Lounge</span>
        <h1 className="font-display text-4xl md:text-5xl text-white leading-tight">
          Global Indian Portfolios
        </h1>
        <div className="w-16 h-0.5 bg-secondary mx-auto mt-4 mb-4" />
        <p className="text-text-muted text-sm leading-relaxed">
          Tailored property consultation, currency gains analysis, and complete FEMA-RBI regulatory check assistance for our global NRI clients.
        </p>
      </div>

      {/* NRI INVESTMENT DRIVERS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {nriBenefits.map((item, idx) => (
          <div key={idx} className="p-6 bg-surface-2 rounded-sm border border-border/10 flex flex-col items-center text-center gap-4">
            <div className="p-3 bg-secondary/15 rounded-full border border-secondary/25">
              {item.icon}
            </div>
            <h4 className="font-heading text-xl text-white">{item.title}</h4>
            <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* DUAL COLUMN: CURRENCY CHART & COMPLIANCE TIMELINE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-center">
        
        {/* USD Exchange gains */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-secondary font-accent uppercase tracking-widest text-xs block">Financial Trends</span>
          <h3 className="font-heading text-3xl text-white">USD to INR Exchange Trends</h3>
          <p className="text-text-muted text-xs leading-relaxed">
            The steady upward trajectory of key international currencies against the Indian Rupee presents a unique investment window for NRI clients, providing immediate capital leverage.
          </p>
          <div className="h-60 bg-surface-2/40 p-4 rounded-sm border border-border/5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={exchangeTrendData}>
                <XAxis dataKey="year" stroke="#a09880" fontSize={10} tickLine={false} />
                <YAxis stroke="#a09880" fontSize={10} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip
                  contentStyle={{ background: '#16213e', border: '1px solid #c9a84c', fontSize: '11px' }}
                  labelStyle={{ color: '#c9a84c' }}
                />
                <Line type="monotone" dataKey="usdToInr" stroke="#c9a84c" strokeWidth={2} dot={{ fill: '#c9a84c', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Repatriation checklist */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-secondary font-accent uppercase tracking-widest text-xs block">Workflow</span>
          <h3 className="font-heading text-3xl text-white">Capital Repatriation Checklist</h3>
          <div className="space-y-4">
            {[
              'Acquire residential/commercial property using transparent NRE/NRO channels.',
              'Submit basic declaration models to the Authorized Dealer Bank within 90 days.',
              'Declare annual rental yields under regular Form-16 Income clearances.',
              'During asset disposal, secure TDS clearance certifications under Section 195.',
              'Smoothly repatriate up to 2 properties capital proceeds per fiscal year.'
            ].map((p, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <CircleCheck className="text-secondary shrink-0 mt-0.5" size={16} />
                <p className="text-text-muted text-xs leading-normal">{p}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* DEDICATED NRI DESK REQUEST FORM */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 scroll-mt-28">
        
        {/* Compliance FAQs */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-secondary font-accent uppercase tracking-widest text-xs block">Knowledge Base</span>
          <h3 className="font-heading text-3xl text-white">Investment Compliance FAQs</h3>
          
          <div className="space-y-6">
            {complianceFaqs.map((faq, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <HelpCircle className="text-secondary shrink-0 mt-1" size={18} />
                <div>
                  <h5 className="font-heading font-semibold text-white text-base">{faq.q}</h5>
                  <p className="text-text-muted text-xs leading-relaxed mt-1.5">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Consulting Request Form */}
        <div className="lg:col-span-6 glass-panel p-8 rounded-sm bg-surface-2 border border-border/10">
          <div className="mb-6">
            <span className="text-secondary font-accent uppercase tracking-widest text-xs">NRI Concierge Desk</span>
            <h3 className="font-heading text-2xl text-white mt-1">Book Premium Consultation</h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Ramesh Krishnan"
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
                  placeholder="ramesh@nri.com"
                  {...register('email')}
                  className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-xs"
                />
                {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                  Country of Residence *
                </label>
                <input
                  type="text"
                  placeholder="United States"
                  {...register('city')}
                  className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-xs"
                />
                {errors.city && <p className="text-red-400 text-[10px] mt-1">{errors.city.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                  International Phone *
                </label>
                <input
                  type="tel"
                  placeholder="+1 408 123 4567"
                  {...register('phone')}
                  className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-xs"
                />
                {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                  Preferred Landmark *
                </label>
                <select
                  {...register('projectInterested')}
                  className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-xs cursor-pointer"
                >
                  <option value="General NRI Consultation">General NRI Consultation</option>
                  <option value="Voora One Sea">Voora One Sea (ECR)</option>
                  <option value="Voora Westside">Voora Westside (Ramapuram)</option>
                  <option value="Voora Beckford">Voora Beckford (Nungambakkam)</option>
                  <option value="Voora Highway Haven">Voora Highway Haven (NH-48)</option>
                  <option value="Voora Tech Edge">Voora Tech Edge (Guindy)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                Special Directives / Repatriation Queries
              </label>
              <textarea
                rows="3"
                placeholder="I am interested in legal details about USD repatriation."
                {...register('message')}
                className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold h-11 flex items-center justify-center gap-2 cursor-pointer font-bold tracking-widest"
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
              <ShieldCheck size={10} className="text-secondary" />
              <span>Full compliance backed under banking guidelines and FEMA codes.</span>
            </div>
          </form>
        </div>

      </section>

    </motion.div>
  );
};

export default NRI;
