'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/app/admin/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface AdvisoryCommitteeData {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introContent: string;
  rolesTitle: string;
  rolesContent: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  ctaButtonLink: string;
}

interface CommitteeMember {
  id?: number;
  name: string;
  position: string;
  expertise: string;
  bio: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export default function AdvisoryCommitteeManagementPage() {
  const [advisoryCommitteeData, setAdvisoryCommitteeData] = useState<AdvisoryCommitteeData | null>(null);
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  
  // Modal states
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);
  const [memberFormData, setMemberFormData] = useState<CommitteeMember>({
    name: '',
    position: '',
    expertise: '',
    bio: '',
    imageUrl: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    displayOrder: 0,
    isActive: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('/api/admin/advisory-committee');
      const data = await response.json();
      
      setAdvisoryCommitteeData(data.advisoryCommittee);
      setCommitteeMembers(data.committeeMembers || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePageContent = async () => {
    if (!advisoryCommitteeData) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/admin/advisory-committee/page-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ advisoryCommittee: advisoryCommitteeData })
      });
      
      if (response.ok) {
        alert('Advisory Committee content saved successfully!');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const openMemberModal = (member?: CommitteeMember) => {
    if (member) {
      setEditingMember(member);
      setMemberFormData(member);
    } else {
      setEditingMember(null);
      setMemberFormData({
        name: '',
        position: '',
        expertise: '',
        bio: '',
        imageUrl: '',
        email: '',
        phone: '',
        linkedinUrl: '',
        displayOrder: committeeMembers.length + 1,
        isActive: true
      });
    }
    setShowMemberModal(true);
  };

  const closeMemberModal = () => {
    setShowMemberModal(false);
    setEditingMember(null);
    setMemberFormData({
      name: '',
      position: '',
      expertise: '',
      bio: '',
      imageUrl: '',
      email: '',
      phone: '',
      linkedinUrl: '',
      displayOrder: 0,
      isActive: true
    });
  };

  const saveMember = async () => {
    try {
      const url = editingMember 
        ? `/api/admin/advisory-committee/members/${editingMember.id}`
        : '/api/admin/advisory-committee/members';
      
      const method = editingMember ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberFormData)
      });
      
      if (response.ok) {
        await loadData();
        closeMemberModal();
        alert(`Committee member ${editingMember ? 'updated' : 'created'} successfully!`);
      }
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Error saving member');
    }
  };

  const deleteMember = async (id: number) => {
    if (!confirm('Are you sure you want to delete this committee member?')) return;
    
    try {
      const response = await fetch(`/api/admin/advisory-committee/members/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await loadData();
        alert('Committee member deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Error deleting member');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Advisory Committee management...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Advisory Committee Management</h2>
              <p className="text-indigo-100">
                Manage your institution's advisory committee content and member profiles.
              </p>
            </div>
            <div className="hidden lg:block">
              <svg className="w-16 h-16 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'content', name: 'Page Content', icon: '📄' },
                { id: 'members', name: 'Committee Members', icon: '👥' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
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
            {activeTab === 'content' && (
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
                      <p className="text-sm text-gray-500">Main title and subtitle for the page header</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Hero Title</label>
                      <Input
                        value={advisoryCommitteeData?.heroTitle || ''}
                        onChange={(e) => setAdvisoryCommitteeData(prev => prev ? {...prev, heroTitle: e.target.value} : null)}
                        placeholder="Advisory Committee"
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Hero Subtitle</label>
                      <textarea
                        value={advisoryCommitteeData?.heroSubtitle || ''}
                        onChange={(e) => setAdvisoryCommitteeData(prev => prev ? {...prev, heroSubtitle: e.target.value} : null)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                        placeholder="Distinguished leaders and experts guiding our institution..."
                      />
                    </div>
                  </div>
                </div>

                {/* Introduction Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Introduction Section</h3>
                      <p className="text-sm text-gray-500">Overview of the advisory board</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Introduction Title</label>
                      <Input
                        value={advisoryCommitteeData?.introTitle || ''}
                        onChange={(e) => setAdvisoryCommitteeData(prev => prev ? {...prev, introTitle: e.target.value} : null)}
                        placeholder="Our Advisory Board"
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Introduction Content</label>
                      <textarea
                        value={advisoryCommitteeData?.introContent || ''}
                        onChange={(e) => setAdvisoryCommitteeData(prev => prev ? {...prev, introContent: e.target.value} : null)}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="Our Advisory Committee comprises distinguished professionals..."
                      />
                    </div>
                  </div>
                </div>

                {/* Roles Section */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Roles & Responsibilities</h3>
                      <p className="text-sm text-gray-500">Committee roles and responsibilities section</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Roles Title</label>
                      <Input
                        value={advisoryCommitteeData?.rolesTitle || ''}
                        onChange={(e) => setAdvisoryCommitteeData(prev => prev ? {...prev, rolesTitle: e.target.value} : null)}
                        placeholder="Committee Roles & Responsibilities"
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Roles Content</label>
                      <textarea
                        value={advisoryCommitteeData?.rolesContent || ''}
                        onChange={(e) => setAdvisoryCommitteeData(prev => prev ? {...prev, rolesContent: e.target.value} : null)}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base"
                        placeholder="The Advisory Committee plays a crucial role in shaping..."
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={savePageContent}
                    loading={saving}
                    variant="primary"
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
                  >
                    💾 Save Page Content
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className="space-y-6">
                {/* Add Member Button */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Committee Members</h3>
                    <p className="text-sm text-gray-500">Manage advisory committee member profiles</p>
                  </div>
                  <Button
                    onClick={() => openMemberModal()}
                    variant="primary"
                    className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
                  >
                    ➕ Add Member
                  </Button>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {committeeMembers.map((member) => (
                    <Card key={member.id} className="border border-gray-200 shadow-lg" padding="lg">
                      <div className="text-center mb-4">
                        {member.imageUrl ? (
                          <img 
                            src={member.imageUrl} 
                            alt={member.name}
                            className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-indigo-100"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto flex items-center justify-center border-2 border-indigo-100">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <h4 className="text-lg font-bold text-gray-900 mb-1 text-center">{member.name}</h4>
                      <p className="text-indigo-600 font-semibold mb-2 text-center text-sm">{member.position}</p>
                      <p className="text-gray-600 text-sm mb-3 text-center">{member.expertise}</p>
                      <p className="text-gray-700 text-xs leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
                      
                      <div className="flex justify-center space-x-2">
                        <Button
                          onClick={() => openMemberModal(member)}
                          variant="outline"
                          size="sm"
                          className="text-indigo-600 border-indigo-300 hover:bg-indigo-50"
                        >
                          ✏️ Edit
                        </Button>
                        <Button
                          onClick={() => deleteMember(member.id!)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          🗑️ Delete
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Member Modal */}
        {showMemberModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6 rounded-t-xl">
                <h3 className="text-xl font-bold">
                  {editingMember ? '✏️ Edit Committee Member' : '➕ Add Committee Member'}
                </h3>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                    <Input
                      value={memberFormData.name}
                      onChange={(e) => setMemberFormData(prev => ({...prev, name: e.target.value}))}
                      placeholder="Dr. Ahmed Hassan"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Position *</label>
                    <Input
                      value={memberFormData.position}
                      onChange={(e) => setMemberFormData(prev => ({...prev, position: e.target.value}))}
                      placeholder="Chairman"
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expertise *</label>
                  <Input
                    value={memberFormData.expertise}
                    onChange={(e) => setMemberFormData(prev => ({...prev, expertise: e.target.value}))}
                    placeholder="Islamic Studies & Educational Leadership"
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Biography *</label>
                  <textarea
                    value={memberFormData.bio}
                    onChange={(e) => setMemberFormData(prev => ({...prev, bio: e.target.value}))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Brief biography and background..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <Input
                      value={memberFormData.email || ''}
                      onChange={(e) => setMemberFormData(prev => ({...prev, email: e.target.value}))}
                      placeholder="email@example.com"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <Input
                      value={memberFormData.phone || ''}
                      onChange={(e) => setMemberFormData(prev => ({...prev, phone: e.target.value}))}
                      placeholder="+1-555-0101"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                    <Input
                      value={memberFormData.imageUrl || ''}
                      onChange={(e) => setMemberFormData(prev => ({...prev, imageUrl: e.target.value}))}
                      placeholder="https://example.com/image.jpg"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
                    <Input
                      value={memberFormData.linkedinUrl || ''}
                      onChange={(e) => setMemberFormData(prev => ({...prev, linkedinUrl: e.target.value}))}
                      placeholder="https://linkedin.com/in/username"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                    <Input
                      type="number"
                      value={memberFormData.displayOrder.toString()}
                      onChange={(e) => setMemberFormData(prev => ({...prev, displayOrder: parseInt(e.target.value) || 0}))}
                      min="1"
                      className="h-12"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={memberFormData.isActive}
                        onChange={(e) => setMemberFormData(prev => ({...prev, isActive: e.target.checked}))}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Active Member</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end space-x-3">
                <Button
                  onClick={closeMemberModal}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveMember}
                  variant="primary"
                  className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
                >
                  {editingMember ? 'Update Member' : 'Add Member'}
                </Button>
              </div>
            </div>
          </div>
        )}

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
                <p className="text-sm text-gray-500">See how your changes will look on the Advisory Committee page</p>
              </div>
            </div>
            <a
              href="/aboutus/committee"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Advisory Committee Page
            </a>
          </div>
          <p className="text-gray-600">
            To see your changes, save the content above and then visit the Advisory Committee page. 
            All changes are applied immediately to the live website.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
