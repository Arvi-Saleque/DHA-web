'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/app/admin/DashboardLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import DeleteConfirmButton from '@/components/DeleteConfirmButton';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { 
  createContactInfo, 
  updateContactInfo, 
  toggleContactInfoActive, 
  deleteContactInfo,
  updateSubmissionStatus,
  deleteSubmission,
  getContactInfos,
  getContactSubmissions
} from '@/lib/contact-actions';

interface ContactInfo {
  id?: number;
  title: string;
  address: string;
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
  phone?: string;
  email?: string;
  fax?: string;
  website?: string;
  workingHours?: string;
  mapEmbedUrl?: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
}

interface ContactSubmission {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: string;
  isRead: boolean;
  isReplied: boolean;
  priority: string;
  status: string;
  adminNotes?: string;
  repliedBy?: string;
  repliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default function ContactManagementPage() {
  const [contactInfos, setContactInfos] = useState<ContactInfo[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactInfo | null>(null);
  const [viewingSubmission, setViewingSubmission] = useState<ContactSubmission | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'submissions'>('info');
  const [loading, setLoading] = useState(true);

  const [contactFormData, setContactFormData] = useState<ContactInfo>({
    title: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Bangladesh',
    phone: '',
    email: '',
    fax: '',
    website: '',
    workingHours: '',
    mapEmbedUrl: '',
    description: '',
    displayOrder: 0,
    isActive: true,
  });

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contactInfosResult, submissionsResult] = await Promise.all([
        getContactInfos(),
        getContactSubmissions(),
      ]);
      
      if (contactInfosResult.success) {
        setContactInfos(contactInfosResult.data);
      }
      
      if (submissionsResult.success) {
        setSubmissions(submissionsResult.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContact = async () => {
    const result = await createContactInfo(contactFormData);
    if (result.success) {
      await fetchData();
      closeContactModal();
    }
  };

  const handleUpdateContact = async () => {
    if (editingContact?.id) {
      const result = await updateContactInfo(editingContact.id, contactFormData);
      if (result.success) {
        await fetchData();
        closeContactModal();
      }
    }
  };

  const handleToggleContactActive = async (id: number) => {
    const result = await toggleContactInfoActive(id);
    if (result.success) {
      await fetchData();
    }
  };

  const handleDeleteContact = async (id: number) => {
    const result = await deleteContactInfo(id);
    if (result.success) {
      await fetchData();
    }
  };

  const handleUpdateSubmissionStatus = async (id: number, status: string, isRead?: boolean, adminNotes?: string) => {
    const result = await updateSubmissionStatus(id, status, isRead, adminNotes);
    if (result.success) {
      await fetchData();
    }
  };

  const handleDeleteSubmission = async (id: number) => {
    const result = await deleteSubmission(id);
    if (result.success) {
      await fetchData();
    }
  };

  const openContactModal = (contact?: ContactInfo) => {
    if (contact) {
      setEditingContact(contact);
      setContactFormData(contact);
    } else {
      setEditingContact(null);
      setContactFormData({
        title: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Bangladesh',
        phone: '',
        email: '',
        fax: '',
        website: '',
        workingHours: '',
        mapEmbedUrl: '',
        description: '',
        displayOrder: contactInfos.length + 1,
        isActive: true,
      });
    }
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
    setEditingContact(null);
  };

  const openSubmissionModal = (submission: ContactSubmission) => {
    setViewingSubmission(submission);
    setShowSubmissionModal(true);
    if (!submission.isRead) {
      handleUpdateSubmissionStatus(submission.id, submission.status, true);
    }
  };

  const closeSubmissionModal = () => {
    setShowSubmissionModal(false);
    setViewingSubmission(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
            <p className="text-gray-600">Manage contact information and form submissions</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('info')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'info'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contact Information ({contactInfos.length})
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'submissions'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Form Submissions ({submissions.filter(s => !s.isRead).length} unread)
            </button>
          </nav>
        </div>

        {/* Contact Information Tab */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
              <Button
                onClick={() => openContactModal()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Contact Info
              </Button>
            </div>

            <div className="grid gap-6">
              {contactInfos.map((contact) => (
                <div key={contact.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{contact.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          contact.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {contact.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <p><strong>Address:</strong> {contact.address}</p>
                          <p><strong>City:</strong> {contact.city}</p>
                          {contact.state && <p><strong>State:</strong> {contact.state}</p>}
                          {contact.zipCode && <p><strong>Zip:</strong> {contact.zipCode}</p>}
                          <p><strong>Country:</strong> {contact.country}</p>
                        </div>
                        <div>
                          {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
                          {contact.email && <p><strong>Email:</strong> {contact.email}</p>}
                          {contact.fax && <p><strong>Fax:</strong> {contact.fax}</p>}
                          {contact.website && <p><strong>Website:</strong> {contact.website}</p>}
                          {contact.workingHours && <p><strong>Hours:</strong> {contact.workingHours}</p>}
                        </div>
                      </div>
                      
                      {contact.description && (
                        <p className="mt-3 text-sm text-gray-600">{contact.description}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        onClick={() => openContactModal(contact)}
                        variant="outline"
                        size="sm"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleToggleContactActive(contact.id!)}
                        variant="outline"
                        size="sm"
                        className={contact.isActive ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                      >
                        {contact.isActive ? <XMarkIcon className="h-4 w-4" /> : <CheckIcon className="h-4 w-4" />}
                      </Button>
                      <DeleteConfirmButton
                        onConfirm={() => handleDeleteContact(contact.id!)}
                        title="Delete Contact Info"
                        message="Are you sure you want to delete this contact information? This action cannot be undone."
                      >
                        <TrashIcon className="h-4 w-4" />
                      </DeleteConfirmButton>
                    </div>
                  </div>
                </div>
              ))}
              
              {contactInfos.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No contact information found. Add your first contact info to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Contact Form Submissions</h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.map((submission) => (
                      <tr key={submission.id} className={!submission.isRead ? 'bg-blue-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {submission.firstName} {submission.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{submission.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{submission.subject}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full capitalize">
                            {submission.inquiryType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getPriorityColor(submission.priority)}`}>
                            {submission.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(submission.status)}`}>
                            {submission.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => openSubmissionModal(submission)}
                              variant="outline"
                              size="sm"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <DeleteConfirmButton
                              onConfirm={() => handleDeleteSubmission(submission.id)}
                              title="Delete Submission"
                              message="Are you sure you want to delete this submission? This action cannot be undone."
                            >
                              <TrashIcon className="h-4 w-4" />
                            </DeleteConfirmButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {submissions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No contact submissions found.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact Info Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {editingContact ? 'Edit Contact Information' : 'Add Contact Information'}
                </h3>
                
                <div className="space-y-4">
                  <Input
                    label="Title"
                    value={contactFormData.title}
                    onChange={(e) => setContactFormData(prev => ({...prev, title: e.target.value}))}
                    placeholder="Main Office"
                    required
                  />
                  
                  <Input
                    label="Address"
                    value={contactFormData.address}
                    onChange={(e) => setContactFormData(prev => ({...prev, address: e.target.value}))}
                    placeholder="123 Main Street"
                    required
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="City"
                      value={contactFormData.city}
                      onChange={(e) => setContactFormData(prev => ({...prev, city: e.target.value}))}
                      placeholder="Dhaka"
                      required
                    />
                    <Input
                      label="State/Province"
                      value={contactFormData.state || ''}
                      onChange={(e) => setContactFormData(prev => ({...prev, state: e.target.value}))}
                      placeholder="Dhaka Division"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Zip Code"
                      value={contactFormData.zipCode || ''}
                      onChange={(e) => setContactFormData(prev => ({...prev, zipCode: e.target.value}))}
                      placeholder="1000"
                    />
                    <Input
                      label="Country"
                      value={contactFormData.country}
                      onChange={(e) => setContactFormData(prev => ({...prev, country: e.target.value}))}
                      placeholder="Bangladesh"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Phone"
                      value={contactFormData.phone || ''}
                      onChange={(e) => setContactFormData(prev => ({...prev, phone: e.target.value}))}
                      placeholder="+880-2-123-4567"
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={contactFormData.email || ''}
                      onChange={(e) => setContactFormData(prev => ({...prev, email: e.target.value}))}
                      placeholder="info@madrasa.edu"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Fax"
                      value={contactFormData.fax || ''}
                      onChange={(e) => setContactFormData(prev => ({...prev, fax: e.target.value}))}
                      placeholder="+880-2-123-4568"
                    />
                    <Input
                      label="Website"
                      value={contactFormData.website || ''}
                      onChange={(e) => setContactFormData(prev => ({...prev, website: e.target.value}))}
                      placeholder="https://madrasa.edu"
                    />
                  </div>
                  
                  <Input
                    label="Working Hours"
                    value={contactFormData.workingHours || ''}
                    onChange={(e) => setContactFormData(prev => ({...prev, workingHours: e.target.value}))}
                    placeholder="Sunday - Thursday: 8:00 AM - 5:00 PM"
                  />
                  
                  <Input
                    label="Google Maps Embed URL"
                    value={contactFormData.mapEmbedUrl || ''}
                    onChange={(e) => setContactFormData(prev => ({...prev, mapEmbedUrl: e.target.value}))}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={contactFormData.description || ''}
                      onChange={(e) => setContactFormData(prev => ({...prev, description: e.target.value}))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Additional information about this contact location..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Display Order"
                      type="number"
                      value={contactFormData.displayOrder.toString()}
                      onChange={(e) => setContactFormData(prev => ({...prev, displayOrder: parseInt(e.target.value) || 0}))}
                      min="0"
                    />
                    <div className="flex items-center pt-6">
                      <input
                        type="checkbox"
                        id="contactActive"
                        checked={contactFormData.isActive}
                        onChange={(e) => setContactFormData(prev => ({...prev, isActive: e.target.checked}))}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="contactActive" className="ml-2 block text-sm text-gray-900">
                        Active
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={closeContactModal}>
                    Cancel
                  </Button>
                  <Button
                    onClick={editingContact ? handleUpdateContact : handleCreateContact}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {editingContact ? 'Update' : 'Create'} Contact Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submission Detail Modal */}
        {showSubmissionModal && viewingSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Contact Submission Details</h3>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(viewingSubmission.status)}`}>
                      {viewingSubmission.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(viewingSubmission.priority)}`}>
                      {viewingSubmission.priority}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="text-sm text-gray-900">{viewingSubmission.firstName} {viewingSubmission.lastName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-sm text-gray-900">{viewingSubmission.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-sm text-gray-900">{viewingSubmission.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Inquiry Type</label>
                      <p className="text-sm text-gray-900 capitalize">{viewingSubmission.inquiryType}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <p className="text-sm text-gray-900">{viewingSubmission.subject}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">{viewingSubmission.message}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Submitted</label>
                    <p className="text-sm text-gray-900">{new Date(viewingSubmission.createdAt).toLocaleString()}</p>
                  </div>
                  
                  {viewingSubmission.adminNotes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Admin Notes</label>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-900">{viewingSubmission.adminNotes}</p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                    <div className="flex gap-2">
                      {['new', 'in_progress', 'resolved', 'closed'].map((status) => (
                        <Button
                          key={status}
                          onClick={() => handleUpdateSubmissionStatus(viewingSubmission.id, status)}
                          variant={viewingSubmission.status === status ? 'primary' : 'outline'}
                          size="sm"
                          className="capitalize"
                        >
                          {status.replace('_', ' ')}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={closeSubmissionModal}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
