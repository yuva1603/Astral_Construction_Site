import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  ShieldAlert, Lock, Users, Briefcase, Mail, Phone,
  FileCheck, LayoutGrid, CheckSquare, Trash2, Edit3, Plus, LogOut, CheckCircle2, AlertCircle
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

  const COLORS = ['#c9a84c', '#4b23b5', '#10b981'];

  // Render Login Screen
  if (!token) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <Helmet>
          <title>Admin Privilege Suite | Voora Real Estate</title>
        </Helmet>
        
        <div className="w-full max-w-md glass-panel p-8 rounded-sm bg-surface-2 shadow-2xl border border-border/10">
          <div className="text-center mb-8 border-b border-border/10 pb-4">
            <Lock size={32} className="text-secondary mx-auto mb-3" />
            <h2 className="font-heading text-3xl text-white">Privilege Secure Login</h2>
            <p className="text-text-muted text-[10px] uppercase tracking-widest mt-1">Authorized access console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                Username Credentials
              </label>
              <input
                type="text"
                placeholder="voora_admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-xs"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1.5">
                Private Key Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-4 py-2.5 focus:border-secondary focus:outline-none transition-colors text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full btn-gold h-11 flex items-center justify-center gap-2 cursor-pointer font-bold tracking-widest text-xs uppercase"
            >
              {isLoggingIn ? 'Decrypting Access Key...' : 'Unlock Administrative Console'}
            </button>
          </form>

          <div className="flex items-center justify-center gap-1.5 text-[9px] text-text-muted mt-6">
            <ShieldAlert size={12} className="text-secondary" />
            <span>Encrypted tunnel active. Failed logins logged.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <Helmet>
        <title>Privilege Control Dashboard | Voora Real Estate</title>
      </Helmet>

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-border/10 pb-6 mb-8 gap-4">
        <div>
          <span className="text-secondary font-accent uppercase tracking-widest text-xs">Secure Console</span>
          <h1 className="font-heading text-4xl text-white mt-1">Privilege Suite Dashboard</h1>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500 text-red-200 hover:text-white rounded-sm flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
        >
          <LogOut size={14} />
          <span>Exit Suite</span>
        </button>
      </div>

      {/* DASHBOARD SUMMARY CARDS BAR */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-5 bg-surface-2 border border-border/10 rounded-sm">
          <Users size={20} className="text-secondary mb-2" />
          <p className="text-2xl font-bold text-white">{enquiries.length}</p>
          <p className="text-[9px] text-text-muted uppercase tracking-widest font-bold">Total Enquiries</p>
        </div>
        <div className="p-5 bg-surface-2 border border-border/10 rounded-sm">
          <CheckSquare size={20} className="text-blue-400 mb-2" />
          <p className="text-2xl font-bold text-white">{enquiries.filter(e => e.status === 'new').length}</p>
          <p className="text-[9px] text-text-muted uppercase tracking-widest font-bold">New Leads</p>
        </div>
        <div className="p-5 bg-surface-2 border border-border/10 rounded-sm">
          <AlertCircle size={20} className="text-amber-400 mb-2" />
          <p className="text-2xl font-bold text-white">{enquiries.filter(e => e.status === 'contacted').length}</p>
          <p className="text-[9px] text-text-muted uppercase tracking-widest font-bold">Contacted Leads</p>
        </div>
        <div className="p-5 bg-surface-2 border border-border/10 rounded-sm">
          <CheckCircle2 size={20} className="text-emerald-400 mb-2" />
          <p className="text-2xl font-bold text-white">{enquiries.filter(e => e.status === 'converted').length}</p>
          <p className="text-[9px] text-text-muted uppercase tracking-widest font-bold">Converted Sales</p>
        </div>
      </div>

      {/* TAB TOGGLES */}
      <div className="flex gap-4 border-b border-border/10 pb-4 mb-8">
        {[
          { id: 'enquiries', name: 'Leads Inbox' },
          { id: 'projects', name: 'Landmark Inventory' },
          { id: 'stats', name: 'Visual Analytics' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors duration-300 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-secondary text-surface'
                : 'bg-surface-2 text-text-muted hover:text-white border border-border/10'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* TAB 1: ENQUIRIES TABLE TABLE */}
      {activeTab === 'enquiries' && (
        <div className="glass-panel overflow-hidden border border-border/10 rounded-sm bg-surface-2">
          {loadingData ? (
            <div className="text-center py-16 text-text-muted animate-pulse">Syncing leads...</div>
          ) : enquiries.length === 0 ? (
            <div className="text-center py-16 text-text-muted">Inbox is completely clear!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-surface/50 border-b border-border/10 text-secondary uppercase font-bold tracking-widest">
                    <th className="p-4">Customer</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Landmark Interest</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Interventions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/5">
                  {enquiries.map((item) => (
                    <tr key={item._id} className="hover:bg-surface/30">
                      <td className="p-4">
                        <div className="font-bold text-white">{item.name}</div>
                        <div className="text-text-muted text-[10px]">{item.city || 'No City'}</div>
                      </td>
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-1 text-text-muted">
                          <Phone size={10} />
                          <span>{item.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-text-muted">
                          <Mail size={10} />
                          <span>{item.email}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-white">{item.projectInterested}</span>
                        {item.message && <p className="text-text-muted text-[10px] mt-1 italic max-w-xs truncate" title={item.message}>"{item.message}"</p>}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 border border-white/10 rounded-full text-[9px] font-bold uppercase bg-black/40 text-text-muted">
                          {item.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide border rounded-full ${
                          item.status === 'new'
                            ? 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                            : item.status === 'contacted'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => updateEnquiryStatus(item._id, 'contacted')}
                            className="px-2.5 py-1 text-[9px] font-semibold border border-amber-500/30 text-amber-300 hover:bg-amber-500 hover:text-white transition-all cursor-pointer rounded-sm"
                          >
                            Call Lock
                          </button>
                          <button
                            onClick={() => updateEnquiryStatus(item._id, 'converted')}
                            className="px-2.5 py-1 text-[9px] font-semibold border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer rounded-sm"
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
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-heading text-2xl text-white">Delivered Inventory Portfolio</h3>
            <button
              onClick={() => setShowAddProject(!showAddProject)}
              className="btn-gold text-[10px] px-4 py-2 cursor-pointer font-bold tracking-widest flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>Register Landmark</span>
            </button>
          </div>

          {/* Quick Create Project form drawer drawer */}
          {showAddProject && (
            <form onSubmit={handleAddProjectSubmit} className="glass-panel p-6 rounded-sm bg-surface-2/70 border border-border/15 max-w-3xl space-y-4">
              <h4 className="font-heading text-lg font-bold text-secondary">Register New Landmark Property</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">Project Title</label>
                  <input
                    type="text" required placeholder="Voora One Sea"
                    value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">Pricing Range</label>
                  <input
                    type="text" required placeholder="1.2 Cr Onwards"
                    value={newProject.price} onChange={(e) => setNewProject({...newProject, price: e.target.value})}
                    className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">Specific Location</label>
                  <input
                    type="text" required placeholder="Kanathur, ECR"
                    value={newProject.location} onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">Sizes (sqft)</label>
                  <input
                    type="text" placeholder="1,112 – 1,584 sqft"
                    value={newProject.sizeRange} onChange={(e) => setNewProject({...newProject, sizeRange: e.target.value})}
                    className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">Class Type</label>
                  <select
                    value={newProject.type} onChange={(e) => setNewProject({...newProject, type: e.target.value})}
                    className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-secondary cursor-pointer"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="plot">Gated Plot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">Status Code</label>
                  <select
                    value={newProject.status} onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                    className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-secondary cursor-pointer"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ready">Ready to Occupy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">BHK Configs</label>
                  <input
                    type="text" placeholder="2 BHK, 3 BHK"
                    value={newProject.bhkTypes} onChange={(e) => setNewProject({...newProject, bhkTypes: e.target.value})}
                    className="w-full bg-surface/60 border border-border/20 text-white rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-end pt-2">
                <button
                  type="button" onClick={() => setShowAddProject(false)}
                  className="px-4 py-2 border border-border/20 text-xs uppercase text-text-muted hover:text-white rounded-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold text-[10px] px-6 py-2 cursor-pointer font-bold tracking-widest"
                >
                  Confirm Landmark
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p._id} className="p-5 bg-surface-2 border border-border/10 rounded-sm flex flex-col justify-between h-44">
                <div>
                  <div className="flex justify-between items-start">
                    <h5 className="font-heading text-lg font-bold text-white truncate max-w-[80%]">{p.name}</h5>
                    <span className="text-[8px] border border-secondary/20 rounded-full px-2 py-0.5 font-bold uppercase tracking-wider text-secondary">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-text-muted text-[10px] uppercase mt-1 tracking-widest">{p.location}</p>
                  <p className="text-secondary font-semibold text-xs mt-3">{p.price}</p>
                </div>

                <div className="flex justify-between items-center border-t border-border/5 pt-4">
                  <span className="text-[9px] text-text-muted uppercase font-bold">{p.type}</span>
                  <button
                    onClick={() => handleDeleteProject(p._id)}
                    className="p-2 bg-red-500/10 border border-red-500/20 rounded-full hover:bg-red-500 hover:text-white text-red-300 transition-all cursor-pointer"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Bar Chart leads interest */}
          <div className="glass-panel p-6 rounded-sm bg-surface-2 border border-border/10">
            <h4 className="font-heading text-lg font-bold text-white mb-6 border-b border-border/10 pb-2">
              Leads Distribution by Property
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getEnquiriesByProjectData()}>
                  <XAxis dataKey="name" stroke="#a09880" fontSize={8} tickLine={false} />
                  <YAxis stroke="#a09880" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#16213e', border: '1px solid #c9a84c' }} />
                  <Bar dataKey="count" fill="#c9a84c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart lead status */}
          <div className="glass-panel p-6 rounded-sm bg-surface-2 border border-border/10 flex flex-col justify-between">
            <div>
              <h4 className="font-heading text-lg font-bold text-white mb-6 border-b border-border/10 pb-2">
                Leads Funnel Performance
              </h4>
              <div className="h-56">
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
                    <Tooltip contentStyle={{ background: '#16213e', border: '1px solid #c9a84c' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="flex justify-center gap-6 text-[10px] font-bold uppercase tracking-widest border-t border-border/5 pt-4">
              <span className="flex items-center gap-1.5 text-secondary">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span>New</span>
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Contacted</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
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
