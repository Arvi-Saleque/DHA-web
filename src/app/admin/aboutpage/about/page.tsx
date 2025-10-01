'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/app/admin/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

interface AboutUsPageData {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  historyTitle: string;
  historyContent1: string;
  historyContent2: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton1Text: string;
  ctaButton1Link: string;
  ctaButton2Text: string;
  ctaButton2Link: string;
}

interface AboutSectionData {
  id: number;
  mission: string;
  vision: string;
  description: string;
  yearEstablished: string;
  totalStudents: string;
  graduatedStudents: string;
  qualifiedTeachers: string;
}

interface Statistic {
  id?: number;
  title: string;
  value: string;
  iconType: string;
  color: string;
  displayOrder: number;
  isActive: boolean;
}

interface CoreValue {
  id?: number;
  title: string;
  description: string;
  iconType: string;
  displayOrder: number;
  isActive: boolean;
}

interface LeadershipMember {
  id?: number;
  name: string;
  position: string;
  description: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
  displayOrder: number;
  isActive: boolean;
}

export default function AboutUsManagementPage() {
  const [aboutUsPage, setAboutUsPage] = useState<AboutUsPageData | null>(null);
  const [aboutSection, setAboutSection] = useState<AboutSectionData | null>(null);
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [leadership, setLeadership] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('page-content');
  
  // Modal states
  const [showStatModal, setShowStatModal] = useState(false);
  const [showValueModal, setShowValueModal] = useState(false);
  const [showLeaderModal, setShowLeaderModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('/api/admin/about-us');
      const data = await response.json();
      
      setAboutUsPage(data.aboutUsPage);
      setAboutSection(data.aboutSection);
      setStatistics(data.statistics || []);
      setCoreValues(data.coreValues || []);
      setLeadership(data.leadership || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePageContent = async () => {
    if (!aboutUsPage || !aboutSection) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/admin/about-us/page-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aboutUsPage, aboutSection })
      });
      
      if (response.ok) {
        alert('Page content saved successfully!');
      }
    } catch (error) {
      console.error('Error saving page content:', error);
      alert('Error saving page content');
    } finally {
      setSaving(false);
    }
  };

  const saveStatistic = async (stat: Statistic) => {
    try {
      const response = await fetch('/api/admin/about-us/statistics', {
        method: stat.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stat)
      });
      
      if (response.ok) {
        loadData();
        setShowStatModal(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Error saving statistic:', error);
    }
  };

  const saveCoreValue = async (value: CoreValue) => {
    try {
      const response = await fetch('/api/admin/about-us/core-values', {
        method: value.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      });
      
      if (response.ok) {
        loadData();
        setShowValueModal(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Error saving core value:', error);
    }
  };

  const saveLeadershipMember = async (member: LeadershipMember) => {
    try {
      const response = await fetch('/api/admin/about-us/leadership', {
        method: member.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member)
      });
      
      if (response.ok) {
        loadData();
        setShowLeaderModal(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Error saving leadership member:', error);
    }
  };

  const deleteItem = async (type: string, id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const response = await fetch(`/api/admin/about-us/${type}/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        loadData();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading About Us management...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">About Us Page Management</h2>
              <p className="text-blue-100">
                Manage all content for the About Us page including statistics, core values, and leadership team.
              </p>
            </div>
            <div className="hidden lg:block">
              <svg className="w-16 h-16 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'page-content', name: 'Page Content', icon: '📄' },
                { id: 'statistics', name: 'Statistics', icon: '📊' },
                { id: 'core-values', name: 'Core Values', icon: '⭐' },
                { id: 'leadership', name: 'Leadership', icon: '👥' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'page-content' && (
              <div className="space-y-8">
                {/* Hero Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                      <Input
                        value={aboutUsPage?.heroTitle || ''}
                        onChange={(e) => setAboutUsPage(prev => prev ? {...prev, heroTitle: e.target.value} : null)}
                        placeholder="About Our Madrasa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                      <textarea
                        value={aboutUsPage?.heroSubtitle || ''}
                        onChange={(e) => setAboutUsPage(prev => prev ? {...prev, heroSubtitle: e.target.value} : null)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Dedicated to providing exceptional Islamic education..."
                      />
                    </div>
                  </div>
                </div>

                {/* Mission & Vision */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mission & Vision</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mission Statement</label>
                      <textarea
                        value={aboutSection?.mission || ''}
                        onChange={(e) => setAboutSection(prev => prev ? {...prev, mission: e.target.value} : null)}
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Our mission is to provide exceptional Islamic education..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vision Statement</label>
                      <textarea
                        value={aboutSection?.vision || ''}
                        onChange={(e) => setAboutSection(prev => prev ? {...prev, vision: e.target.value} : null)}
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="To be a leading institution in Islamic education..."
                      />
                    </div>
                  </div>
                </div>

                {/* History Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">History Section</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">History Title</label>
                      <Input
                        value={aboutUsPage?.historyTitle || ''}
                        onChange={(e) => setAboutUsPage(prev => prev ? {...prev, historyTitle: e.target.value} : null)}
                        placeholder="Our History"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">History Content 1</label>
                      <textarea
                        value={aboutUsPage?.historyContent1 || ''}
                        onChange={(e) => setAboutUsPage(prev => prev ? {...prev, historyContent1: e.target.value} : null)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Established in 2010 with a vision..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">History Content 2</label>
                      <textarea
                        value={aboutUsPage?.historyContent2 || ''}
                        onChange={(e) => setAboutUsPage(prev => prev ? {...prev, historyContent2: e.target.value} : null)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="From humble beginnings..."
                      />
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Call to Action Section</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CTA Title</label>
                      <Input
                        value={aboutUsPage?.ctaTitle || ''}
                        onChange={(e) => setAboutUsPage(prev => prev ? {...prev, ctaTitle: e.target.value} : null)}
                        placeholder="Join Our Community"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CTA Subtitle</label>
                      <textarea
                        value={aboutUsPage?.ctaSubtitle || ''}
                        onChange={(e) => setAboutUsPage(prev => prev ? {...prev, ctaSubtitle: e.target.value} : null)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Become part of our educational family..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button 1 Text</label>
                      <Input
                        value={aboutUsPage?.ctaButton1Text || ''}
                        onChange={(e) => setAboutUsPage(prev => prev ? {...prev, ctaButton1Text: e.target.value} : null)}
                        placeholder="Apply for Admission"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button 1 Link</label>
                      <Input
                        value={aboutUsPage?.ctaButton1Link || ''}
                        onChange={(e) => setAboutUsPage(prev => prev ? {...prev, ctaButton1Link: e.target.value} : null)}
                        placeholder="/admissions/apply"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button 2 Text</label>
                      <Input
                        value={aboutUsPage?.ctaButton2Text || ''}
                        onChange={(e) => setAboutUsPage(prev => prev ? {...prev, ctaButton2Text: e.target.value} : null)}
                        placeholder="Contact Us"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button 2 Link</label>
                      <Input
                        value={aboutUsPage?.ctaButton2Link || ''}
                        onChange={(e) => setAboutUsPage(prev => prev ? {...prev, ctaButton2Link: e.target.value} : null)}
                        placeholder="/contact"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={savePageContent}
                    loading={saving}
                    variant="primary"
                    size="lg"
                  >
                    Save Page Content
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'statistics' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Statistics Management</h3>
                  <Button
                    onClick={() => {
                      setEditingItem(null);
                      setShowStatModal(true);
                    }}
                    variant="primary"
                  >
                    Add Statistic
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {statistics.map((stat) => (
                    <Card key={stat.id} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-${stat.color}-100`}>
                            <svg className={`w-6 h-6 text-${stat.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">{stat.title}</h4>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem(stat);
                              setShowStatModal(true);
                            }}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            title="Edit Statistic"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteItem('statistics', stat.id!)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            title="Delete Statistic"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                        <span className="flex items-center">
                          <span className={`w-3 h-3 rounded-full bg-${stat.color}-500 mr-2`}></span>
                          {stat.iconType} • Order: {stat.displayOrder}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stat.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {stat.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'core-values' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Core Values Management</h3>
                  <Button
                    onClick={() => {
                      setEditingItem(null);
                      setShowValueModal(true);
                    }}
                    variant="primary"
                  >
                    Add Core Value
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {coreValues.map((value) => (
                    <Card key={value.id} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-purple-500">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg">{value.title}</h4>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem(value);
                              setShowValueModal(true);
                            }}
                            className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            title="Edit Core Value"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteItem('core-values', value.id!)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            title="Delete Core Value"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{value.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                        <span className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                          {value.iconType} • Order: {value.displayOrder}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${value.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {value.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'leadership' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Leadership Team Management</h3>
                  <Button
                    onClick={() => {
                      setEditingItem(null);
                      setShowLeaderModal(true);
                    }}
                    variant="primary"
                  >
                    Add Team Member
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {leadership.map((member) => (
                    <Card key={member.id} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                            {member.imageUrl ? (
                              <img 
                                src={member.imageUrl} 
                                alt={member.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                            ) : (
                              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg">{member.name}</h4>
                            <p className="text-green-600 font-medium">{member.position}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem(member);
                              setShowLeaderModal(true);
                            }}
                            className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            title="Edit Team Member"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteItem('leadership', member.id!)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            title="Delete Team Member"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.description}</p>
                      {(member.email || member.phone) && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
                          {member.email && (
                            <div className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              {member.email}
                            </div>
                          )}
                          {member.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {member.phone}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                          Order: {member.displayOrder}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${member.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {member.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                <p className="text-sm text-gray-500">See how your changes will look on the About Us page</p>
              </div>
            </div>
            <a
              href="/aboutus/about"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View About Us Page
            </a>
          </div>
          <p className="text-gray-600">
            To see your changes, save the content above and then visit the About Us page. 
            All changes are applied immediately to the live website.
          </p>
        </Card>
      </div>

      {/* Statistics Modal */}
      {showStatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {editingItem ? 'Edit Statistic' : 'Add New Statistic'}
                </h3>
                <button
                  onClick={() => {
                    setShowStatModal(false);
                    setEditingItem(null);
                  }}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <StatisticForm
                statistic={editingItem}
                onSave={saveStatistic}
                onCancel={() => {
                  setShowStatModal(false);
                  setEditingItem(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Core Values Modal */}
      {showValueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  {editingItem ? 'Edit Core Value' : 'Add New Core Value'}
                </h3>
                <button
                  onClick={() => {
                    setShowValueModal(false);
                    setEditingItem(null);
                  }}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <CoreValueForm
                coreValue={editingItem}
                onSave={saveCoreValue}
                onCancel={() => {
                  setShowValueModal(false);
                  setEditingItem(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Leadership Modal */}
      {showLeaderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {editingItem ? 'Edit Team Member' : 'Add New Team Member'}
                </h3>
                <button
                  onClick={() => {
                    setShowLeaderModal(false);
                    setEditingItem(null);
                  }}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <LeadershipForm
                member={editingItem}
                onSave={saveLeadershipMember}
                onCancel={() => {
                  setShowLeaderModal(false);
                  setEditingItem(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

// Statistic Form Component
function StatisticForm({ 
  statistic, 
  onSave, 
  onCancel 
}: { 
  statistic?: Statistic | null; 
  onSave: (stat: Statistic) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState<Statistic>({
    title: statistic?.title || '',
    value: statistic?.value || '',
    iconType: statistic?.iconType || 'calendar',
    color: statistic?.color || 'blue',
    displayOrder: statistic?.displayOrder || 1,
    isActive: statistic?.isActive ?? true,
    ...(statistic?.id && { id: statistic.id })
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Years of Excellence"
            className="h-12 text-base"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Value</label>
          <Input
            value={formData.value}
            onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
            placeholder="15+"
            className="h-12 text-base"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Icon Type</label>
          <select
            value={formData.iconType}
            onChange={(e) => setFormData(prev => ({ ...prev, iconType: e.target.value }))}
            className="w-full h-12 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
          >
            <option value="calendar">📅 Calendar</option>
            <option value="students">👥 Students</option>
            <option value="graduation">🎓 Graduation</option>
            <option value="teachers">👨‍🏫 Teachers</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Color Theme</label>
          <select
            value={formData.color}
            onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
            className="w-full h-12 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
          >
            <option value="blue">🔵 Blue</option>
            <option value="green">🟢 Green</option>
            <option value="purple">🟣 Purple</option>
            <option value="yellow">🟡 Yellow</option>
            <option value="red">🔴 Red</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Display Order</label>
          <Input
            type="number"
            value={formData.displayOrder.toString()}
            onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) || 1 }))}
            min="1"
            className="h-12 text-base"
            required
          />
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center bg-gray-50 rounded-xl p-4 w-full">
            <input
              type="checkbox"
              id="statActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="statActive" className="ml-3 block text-base font-medium text-gray-900">
              Active Status
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="px-8 py-3 text-base font-medium"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="primary"
          className="px-8 py-3 text-base font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          {statistic ? '✅ Update' : '➕ Create'} Statistic
        </Button>
      </div>
    </form>
  );
}

// Core Value Form Component
function CoreValueForm({ 
  coreValue, 
  onSave, 
  onCancel 
}: { 
  coreValue?: CoreValue | null; 
  onSave: (value: CoreValue) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState<CoreValue>({
    title: coreValue?.title || '',
    description: coreValue?.description || '',
    iconType: coreValue?.iconType || 'excellence',
    displayOrder: coreValue?.displayOrder || 1,
    isActive: coreValue?.isActive ?? true,
    ...(coreValue?.id && { id: coreValue.id })
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Excellence in Education"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="We strive for the highest standards in Islamic education..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Icon Type</label>
        <select
          value={formData.iconType}
          onChange={(e) => setFormData(prev => ({ ...prev, iconType: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="excellence">Excellence</option>
          <option value="compassion">Compassion</option>
          <option value="integrity">Integrity</option>
          <option value="community">Community</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
        <Input
          type="number"
          value={formData.displayOrder.toString()}
          onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) || 1 }))}
          min="1"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="valueActive"
          checked={formData.isActive}
          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="valueActive" className="ml-2 block text-sm text-gray-900">
          Active
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {coreValue ? 'Update' : 'Create'} Core Value
        </Button>
      </div>
    </form>
  );
}

// Leadership Form Component
function LeadershipForm({ 
  member, 
  onSave, 
  onCancel 
}: { 
  member?: LeadershipMember | null; 
  onSave: (member: LeadershipMember) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState<LeadershipMember>({
    name: member?.name || '',
    position: member?.position || '',
    description: member?.description || '',
    imageUrl: member?.imageUrl || '',
    email: member?.email || '',
    phone: member?.phone || '',
    displayOrder: member?.displayOrder || 1,
    isActive: member?.isActive ?? true,
    ...(member?.id && { id: member.id })
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Dr. Muhammad Abdullah"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
        <Input
          value={formData.position}
          onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
          placeholder="Principal & Chief Administrator"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="With over 20 years of experience in Islamic education..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (Optional)</label>
        <Input
          value={formData.imageUrl || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
          <Input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="principal@madrasa.edu"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
          <Input
            value={formData.phone || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
        <Input
          type="number"
          value={formData.displayOrder.toString()}
          onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) || 1 }))}
          min="1"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="memberActive"
          checked={formData.isActive}
          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="memberActive" className="ml-2 block text-sm text-gray-900">
          Active
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {member ? 'Update' : 'Create'} Team Member
        </Button>
      </div>
    </form>
  );
}
