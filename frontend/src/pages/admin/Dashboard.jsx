import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  ShieldAlert, Lock, Users, Mail, Phone,
  Trash2, Plus, LogOut, CheckCircle2, AlertCircle, Building2, CheckSquare, Sparkles, KeyRound
} from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const Dashboard = () => {
  // Auth state
  const [token, setToken] = useState(localStorage.getItem('voora_admin_token') || null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // App state
  const [activeTab, setActiveTab] = useState('enquiries'); // 'enquiries' | 'projects' | 'stats'
  const [enquiries, setEnquiries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Project form state (Quick creation support)
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '', type: 'residential', status: 'ongoing', location: '', price: '', bhkTypes: '', sizeRange: ''
  });

  // Verify and fetch data on load if token is active
  useEffect(() => {
    if (token) {
      fetchAdminData();
    }
  }, [token]);

  const fetchAdminData = async () => {
    setLoadingData(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      const enquiriesRes = await axios.get(`${API_URL}/enquiries`, { headers });
      setEnquiries(enquiriesRes.data);

      const projectsRes = await axios.get(`${API_URL}/projects`);
      setProjects(projectsRes.data);
    } catch (err) {
      console.error(err);
      toast.error('Session expired. Please log in again.');
      handleLogout();
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return toast.error('Please enter both username and password.');
    }
    
    setIsLoggingIn(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { username, password });
      const { token: userToken } = res.data;
      
      localStorage.setItem('voora_admin_token', userToken);
      setToken(userToken);
      toast.success('Successfully logged into Privilege Suite.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid admin credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('voora_admin_token');
    setToken(null);
    setUsername('');
    setPassword('');
  };

  const updateEnquiryStatus = async (id, newStatus) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(`${API_URL}/enquiries/${id}/status`, { status: newStatus }, { headers });
      
      // Update local state
      setEnquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
      toast.success(`Lead status updated to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update lead status');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this landmark?')) return;
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${API_URL}/projects/${id}`, { headers });
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success('Project removed successfully');
    } catch (err) {
      toast.error('Failed to remove project');
    }
  };

  const handleAddProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const formattedProject = {
        ...newProject,
        bhkTypes: newProject.bhkTypes.split(',').map(s => s.trim()),
        overview: [`Luxury development in ${newProject.location}`]
      };
      
      const res = await axios.post(`${API_URL}/projects`, formattedProject, { headers });
      setProjects((prev) => [res.data, ...prev]);
      toast.success('New Project Created Successfully!');
      setShowAddProject(false);
      setNewProject({ name: '', type: 'residential', status: 'ongoing', location: '', price: '', bhkTypes: '', sizeRange: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create project');
    }
  };

  // Compile Chart Data
  const getEnquiriesByProjectData = () => {
    const counts = {};
    enquiries.forEach((item) => {
      counts[item.projectInterested] = (counts[item.projectInterested] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  };

  const getLeadsByStatusData = () => {
    const counts = { new: 0, contacted: 0, converted: 0 };
    enquiries.forEach((item) => {
      counts[item.status] = (counts[item.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name: name.toUpperCase(), value }));
  };

  const COLORS = ['#3b22a1', '#6346e5', '#10b981'];

  // Render Login Screen
  if (!token) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-surface relative overflow-hidden">
        <Helmet>
          <title>Admin Privilege Suite | Voora Real Estate</title>
        </Helmet>
        
        {/* Decorative glowing blobs */}
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none select-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-secondary/5 blur-[100px] pointer-events-none select-none" />

        <div className="w-full max-w-md glass-panel p-8 rounded-[2.5rem] bg-white/70 shadow-2xl border border-white/50 relative z-10">
          <div className="text-center mb-8 border-b border-border/10 pb-5">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3 shadow-inner">
              <Lock size={22} className="animate-pulse" />
            </div>
            <h2 className="font-display text-3xl font-black text-primary uppercase tracking-tight">Privilege Secure Suite</h2>
            <p className="text-text-muted text-[9px] uppercase tracking-widest mt-1.5 font-bold">Authorized Admin Console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                Username Credentials
              </label>
              <div className="relative flex items-center">
                <Users className="absolute left-4 text-primary/40" size={14} />
                <input
                  type="text"
                  placeholder="voora_admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-3 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">
                Private Key Password
              </label>
              <div className="relative flex items-center">
                <KeyRound className="absolute left-4 text-primary/40" size={14} />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/50 border border-border/80 text-primary rounded-full pl-11 pr-5 py-3 focus:border-primary focus:bg-white/80 focus:outline-none transition-all text-xs font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full btn-gold h-12 flex items-center justify-center gap-2 cursor-pointer font-bold tracking-widest text-xs uppercase shadow-lg mt-2"
            >
              {isLoggingIn ? 'Decrypting Access Key...' : 'Unlock Administrative Console'}
            </button>
          </form>

          <div className="flex items-center justify-center gap-1.5 text-[9px] text-text-muted mt-6 font-bold uppercase tracking-wider">
            <ShieldAlert size={12} className="text-primary shrink-0 animate-pulse" />
            <span>Encrypted tunnel active. Failed logins logged.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-surface relative overflow-x-hidden">
      <Helmet>
        <title>Privilege Control Dashboard | Voora Real Estate</title>
      </Helmet>

      {/* Decorative glowing blobs */}
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-secondary/5 blur-[100px] pointer-events-none select-none" />

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-border/10 pb-6 mb-8 gap-4 relative z-10">
        <div>
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-[10px] font-extrabold uppercase tracking-widest">
            Secure Console
          </span>
          <h1 className="font-display text-4xl font-black text-primary uppercase tracking-tight mt-3">Privilege Suite Dashboard</h1>
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500 text-red-600 hover:text-white rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
        >
          <LogOut size={13} />
          <span>Exit Suite</span>
        </button>
      </div>

      {/* DASHBOARD SUMMARY CARDS BAR */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10 relative z-10">
        <div className="p-6 bg-white/70 border border-white/50 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
          <div className="w-9 h-9 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mb-3 border border-primary/15">
            <Users size={16} />
          </div>
          <p className="font-display text-3xl font-black text-primary leading-none">{enquiries.length}</p>
          <p className="text-[9px] text-text-muted uppercase tracking-widest font-extrabold mt-1">Total Enquiries</p>
        </div>
        <div className="p-6 bg-white/70 border border-white/50 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
          <div className="w-9 h-9 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 mb-3 border border-blue-500/15">
            <CheckSquare size={16} />
          </div>
          <p className="font-display text-3xl font-black text-blue-600 leading-none">{enquiries.filter(e => e.status === 'new').length}</p>
          <p className="text-[9px] text-text-muted uppercase tracking-widest font-extrabold mt-1">New Leads</p>
        </div>
        <div className="p-6 bg-white/70 border border-white/50 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
          <div className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mb-3 border border-amber-500/15">
            <AlertCircle size={16} />
          </div>
          <p className="font-display text-3xl font-black text-amber-600 leading-none">{enquiries.filter(e => e.status === 'contacted').length}</p>
          <p className="text-[9px] text-text-muted uppercase tracking-widest font-extrabold mt-1">Contacted Leads</p>
        </div>
        <div className="p-6 bg-white/70 border border-white/50 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mb-3 border border-emerald-500/15">
            <CheckCircle2 size={16} />
          </div>
          <p className="font-display text-3xl font-black text-emerald-600 leading-none">{enquiries.filter(e => e.status === 'converted').length}</p>
          <p className="text-[9px] text-text-muted uppercase tracking-widest font-extrabold mt-1">Converted Sales</p>
        </div>
      </div>

      {/* TAB TOGGLES */}
      <div className="flex gap-4 border-b border-border/10 pb-4 mb-8 relative z-10 select-none">
        {[
          { id: 'enquiries', name: 'Leads Inbox' },
          { id: 'projects', name: 'Landmark Inventory' },
          { id: 'stats', name: 'Visual Analytics' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/25'
                : 'bg-white/60 text-text-muted border border-border/15 hover:border-primary/25 hover:text-primary hover:bg-white/95'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* TAB 1: ENQUIRIES TABLE */}
      {activeTab === 'enquiries' && (
        <div className="glass-panel overflow-hidden border border-white/50 rounded-[2rem] bg-white/70 shadow-sm relative z-10">
          {loadingData ? (
            <div className="text-center py-16 text-text-muted font-bold uppercase tracking-widest animate-pulse">Syncing leads...</div>
          ) : enquiries.length === 0 ? (
            <div className="text-center py-16 text-text-muted uppercase tracking-wider text-xs font-bold">Inbox is completely clear!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-primary/5 border-b border-border/10 text-primary uppercase font-extrabold tracking-widest">
                    <th className="p-4.5 pl-6">Customer</th>
                    <th className="p-4.5">Contact</th>
                    <th className="p-4.5">Landmark Interest</th>
                    <th className="p-4.5">Type</th>
                    <th className="p-4.5">Status</th>
                    <th className="p-4.5 text-center pr-6">Interventions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  {enquiries.map((item) => (
                    <tr key={item._id} className="hover:bg-primary/5 transition-colors">
                      <td className="p-4.5 pl-6">
                        <div className="font-bold text-primary text-[13px]">{item.name}</div>
                        <div className="text-text-muted text-[9px] font-extrabold uppercase mt-0.5 tracking-wider">{item.city || 'No City'}</div>
                      </td>
                      <td className="p-4.5 space-y-1">
                        <div className="flex items-center gap-1.5 text-text-muted font-medium">
                          <Phone size={11} className="text-primary/70" />
                          <span>{item.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-text-muted font-medium">
                          <Mail size={11} className="text-primary/70" />
                          <span>{item.email}</span>
                        </div>
                      </td>
                      <td className="p-4.5">
                        <span className="font-extrabold text-primary uppercase tracking-wide">{item.projectInterested}</span>
                        {item.message && <p className="text-text-muted text-[10px] mt-1.5 italic max-w-xs truncate" title={item.message}>"{item.message}"</p>}
                      </td>
                      <td className="p-4.5">
                        <span className="px-3 py-1 border border-primary/10 rounded-full text-[9px] font-extrabold uppercase bg-primary/5 text-primary">
                          {item.type}
                        </span>
                      </td>
                      <td className="p-4.5">
                        <span className={`px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest border rounded-full ${
                          item.status === 'new'
                            ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                            : item.status === 'contacted'
                            ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4.5 pr-6">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => updateEnquiryStatus(item._id, 'contacted')}
                            className="px-3 py-1.5 text-[9px] font-extrabold border border-amber-500/30 text-amber-600 hover:bg-amber-500 hover:text-white transition-all cursor-pointer rounded-full uppercase tracking-wider"
                          >
                            Call Lock
                          </button>
                          <button
                            onClick={() => updateEnquiryStatus(item._id, 'converted')}
                            className="px-3 py-1.5 text-[9px] font-extrabold border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer rounded-full uppercase tracking-wider"
                          >
                            Deal Sign
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PROJECTS MANAGE */}
      {activeTab === 'projects' && (
        <div className="space-y-6 relative z-10">
          <div className="flex justify-between items-center select-none">
            <h3 className="font-display text-2xl font-black text-primary uppercase tracking-tight">Delivered Inventory Portfolio</h3>
            <button
              onClick={() => setShowAddProject(!showAddProject)}
              className="btn-gold text-[9px] px-4 py-2 cursor-pointer font-bold tracking-widest flex items-center gap-1.5 shadow-md"
            >
              <Plus size={13} />
              <span>Register Landmark</span>
            </button>
          </div>

          {/* Quick Create Project form drawer */}
          {showAddProject && (
            <form onSubmit={handleAddProjectSubmit} className="glass-panel p-8 rounded-[2.5rem] bg-white/70 border border-white/50 max-w-3xl space-y-4.5 shadow-lg">
              <h4 className="font-display text-lg font-black text-primary uppercase tracking-wide">Register New Landmark Property</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">Project Title</label>
                  <input
                    type="text" required placeholder="Voora One Sea"
                    value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="w-full bg-white/50 border border-border/80 text-primary rounded-full px-5 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">Pricing Range</label>
                  <input
                    type="text" required placeholder="1.2 Cr Onwards"
                    value={newProject.price} onChange={(e) => setNewProject({...newProject, price: e.target.value})}
                    className="w-full bg-white/50 border border-border/80 text-primary rounded-full px-5 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">Specific Location</label>
                  <input
                    type="text" required placeholder="Kanathur, ECR"
                    value={newProject.location} onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    className="w-full bg-white/50 border border-border/80 text-primary rounded-full px-5 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">Sizes (sqft)</label>
                  <input
                    type="text" placeholder="1,112 – 1,584 sqft"
                    value={newProject.sizeRange} onChange={(e) => setNewProject({...newProject, sizeRange: e.target.value})}
                    className="w-full bg-white/50 border border-border/80 text-primary rounded-full px-5 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">Class Type</label>
                  <select
                    value={newProject.type} onChange={(e) => setNewProject({...newProject, type: e.target.value})}
                    className="w-full bg-white/50 border border-border/80 text-primary rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-primary cursor-pointer appearance-none"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="plot">Gated Plot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">Status Code</label>
                  <select
                    value={newProject.status} onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                    className="w-full bg-white/50 border border-border/80 text-primary rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-primary cursor-pointer appearance-none"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ready">Ready to Occupy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-extrabold text-text-muted uppercase tracking-widest mb-1.5 ml-2">BHK Configs</label>
                  <input
                    type="text" placeholder="2 BHK, 3 BHK"
                    value={newProject.bhkTypes} onChange={(e) => setNewProject({...newProject, bhkTypes: e.target.value})}
                    className="w-full bg-white/50 border border-border/80 text-primary rounded-full px-5 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-end pt-3">
                <button
                  type="button" onClick={() => setShowAddProject(false)}
                  className="px-5 py-2 border border-border/20 text-xs uppercase text-text-muted hover:text-primary rounded-full cursor-pointer font-bold tracking-widest transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold text-[9px] px-6 py-2 cursor-pointer font-bold tracking-widest shadow-md"
                >
                  Confirm Landmark
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p._id} className="p-6 bg-white/70 border border-white/50 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] flex flex-col justify-between h-48">
                <div>
                  <div className="flex justify-between items-start">
                    <h5 className="font-display text-lg font-black text-primary uppercase tracking-tight truncate max-w-[70%]">{p.name}</h5>
                    <span className="text-[8px] border border-primary/20 rounded-full px-2.5 py-1 font-extrabold uppercase tracking-widest text-primary bg-primary/5 shrink-0">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-text-muted text-[8px] uppercase mt-1 tracking-widest font-extrabold">{p.location}</p>
                  <p className="text-secondary font-extrabold text-[13px] mt-4 uppercase tracking-wider">{p.price}</p>
                </div>

                <div className="flex justify-between items-center border-t border-border/10 pt-4">
                  <span className="text-[9px] text-text-muted uppercase font-extrabold tracking-widest bg-black/5 px-2.5 py-0.5 rounded-full">{p.type}</span>
                  <button
                    onClick={() => handleDeleteProject(p._id)}
                    className="p-2 bg-red-500/10 border border-red-500/20 rounded-full hover:bg-red-500 hover:text-white text-red-600 transition-all cursor-pointer shadow-sm"
                    title="Remove Property"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VISUAL STATISTICS */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
          {/* Bar Chart leads interest */}
          <div className="glass-panel p-6 rounded-[2rem] bg-white/70 border border-white/50 shadow-sm">
            <h4 className="font-display text-base font-black text-primary mb-6 border-b border-border/15 pb-3 uppercase tracking-wider">
              Leads Distribution by Property
            </h4>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getEnquiriesByProjectData()}>
                  <XAxis dataKey="name" stroke="#5e5296" fontSize={8} tickLine={false} style={{ fontWeight: 600 }} />
                  <YAxis stroke="#5e5296" fontSize={10} tickLine={false} style={{ fontWeight: 600 }} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(99, 70, 229, 0.2)', borderRadius: '16px', fontSize: '11px', boxShadow: '0 10px 25px rgba(99, 70, 229, 0.05)' }}
                    labelStyle={{ color: '#3b22a1', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="count" fill="#6346e5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart lead status */}
          <div className="glass-panel p-6 rounded-[2rem] bg-white/70 border border-white/50 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="font-display text-base font-black text-primary mb-6 border-b border-border/15 pb-3 uppercase tracking-wider">
                Leads Funnel Performance
              </h4>
              <div className="h-56 sm:h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getLeadsByStatusData()}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {getLeadsByStatusData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(99, 70, 229, 0.2)', borderRadius: '16px', fontSize: '11px', boxShadow: '0 10px 25px rgba(99, 70, 229, 0.05)' }}
                      labelStyle={{ color: '#3b22a1', fontWeight: 'bold' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="flex justify-center gap-6 text-[9px] font-extrabold uppercase tracking-widest border-t border-border/10 pt-4 mt-2">
              <span className="flex items-center gap-1.5 text-primary">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span>New</span>
              </span>
              <span className="flex items-center gap-1.5 text-secondary">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span>Contacted</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Converted</span>
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
