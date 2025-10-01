'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/app/admin/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { UploadButton } from '@/lib/uploadthing';

interface ChairmanMessageData {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  chairmanName: string;
  chairmanTitle: string;
  chairmanImage: string;
  messageTitle: string;
  messageContent: string;
  visionTitle: string;
  visionContent: string;
  achievementsTitle: string;
  achievementsContent: string;
  closingMessage: string;
  signature: string;
}

export default function ChairmanMessageManagementPage() {
  const [chairmanMessageData, setChairmanMessageData] = useState<ChairmanMessageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [uploadStatus, setUploadStatus] = useState<{type: 'success' | 'error' | 'loading', message: string} | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('/api/admin/chairman-message');
      const data = await response.json();
      
      setChairmanMessageData(data.chairmanMessage);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async () => {
    if (!chairmanMessageData) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/admin/chairman-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chairmanMessage: chairmanMessageData })
      });
      
      if (response.ok) {
        alert('Chairman Message content saved successfully!');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // This function is no longer needed as we use UploadThing exclusively
    // Keeping it for backward compatibility but redirecting to cloud storage
    setUploadStatus({ 
      type: 'error', 
      message: 'Please use the cloud storage upload button below.' 
    });
    
    // Clear the input
    event.target.value = '';
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Chairman Message management...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Chairman Message Management</h2>
              <p className="text-blue-100">
                Manage your Chairman's message content and personal information.
              </p>
            </div>
            <div className="hidden lg:block">
              <svg className="w-16 h-16 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'hero', name: 'Hero Section', icon: '🎯' },
                { id: 'chairman', name: 'Chairman Info', icon: '👤' },
                { id: 'message', name: 'Main Message', icon: '💬' },
                { id: 'vision', name: 'Vision Section', icon: '👁️' },
                { id: 'achievements', name: 'Achievements', icon: '🏆' },
                { id: 'closing', name: 'Closing & Signature', icon: '✍️' }
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
            {activeTab === 'hero' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        value={chairmanMessageData?.heroTitle || ''}
                        onChange={(e) => setChairmanMessageData(prev => prev ? {...prev, heroTitle: e.target.value} : null)}
                        placeholder="Chairman's Message"
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Hero Subtitle</label>
                      <textarea
                        value={chairmanMessageData?.heroSubtitle || ''}
                        onChange={(e) => setChairmanMessageData(prev => prev ? {...prev, heroSubtitle: e.target.value} : null)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="A message from our esteemed Chairman about our vision..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chairman' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Chairman Information</h3>
                      <p className="text-sm text-gray-500">Personal details and image of the Chairman</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Chairman Name</label>
                      <Input
                        value={chairmanMessageData?.chairmanName || ''}
                        onChange={(e) => setChairmanMessageData(prev => prev ? {...prev, chairmanName: e.target.value} : null)}
                        placeholder="Dr. Muhammad Al-Rashid"
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Chairman Title</label>
                      <Input
                        value={chairmanMessageData?.chairmanTitle || ''}
                        onChange={(e) => setChairmanMessageData(prev => prev ? {...prev, chairmanTitle: e.target.value} : null)}
                        placeholder="Chairman of the Board"
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Chairman Image</label>
                      
                      {/* Current Image Preview */}
                      {chairmanMessageData?.chairmanImage && (
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                          <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                          <div className="flex items-center space-x-4">
                            <img 
                              src={chairmanMessageData.chairmanImage} 
                              alt="Chairman" 
                              className="w-20 h-20 object-cover rounded-lg border"
                              onError={(e) => {
                                e.currentTarget.src = '/images/placeholder-avatar.jpg';
                              }}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-700 break-all">
                                {chairmanMessageData.chairmanImage}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* File Upload - Removed local upload, keeping UI for cloud storage only */}
                      <div className="space-y-4">
                        {/* Upload Status */}
                        {uploadStatus && (
                          <div className={`p-3 rounded-lg text-sm ${
                            uploadStatus.type === 'success' 
                              ? 'bg-green-50 text-green-700 border border-green-200' 
                              : uploadStatus.type === 'error'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {uploadStatus.message}
                          </div>
                        )}

                        {/* UploadThing Cloud Storage */}
                        <div className="pt-4">
                          <label className="block text-sm font-medium text-gray-600 mb-3">Upload Chairman Image:</label>
                          <UploadButton
                            endpoint="chairmanImage"
                            onClientUploadComplete={(res) => {
                              if (res && res[0]) {
                                setChairmanMessageData(prev => prev ? {...prev, chairmanImage: res[0].url} : null);
                                setUploadStatus({ type: 'success', message: 'Image uploaded to cloud storage successfully!' });
                                setTimeout(() => setUploadStatus(null), 3000);
                              }
                            }}
                            onUploadError={(error: Error) => {
                              setUploadStatus({ type: 'error', message: `Upload failed: ${error.message}` });
                            }}
                            className="ut-button:bg-blue-600 ut-button:hover:bg-blue-700"
                          />
                        </div>

                        {/* Manual URL Input (Alternative) */}
                        <div className="pt-4 border-t border-gray-200">
                          <label className="block text-sm font-medium text-gray-600 mb-2">Or enter image URL manually:</label>
                          <Input
                            value={chairmanMessageData?.chairmanImage || ''}
                            onChange={(e) => setChairmanMessageData(prev => prev ? {...prev, chairmanImage: e.target.value} : null)}
                            placeholder="https://utfs.io/f/your-image-url"
                            className="h-10 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'message' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Main Message</h3>
                      <p className="text-sm text-gray-500">Primary welcome message from the Chairman</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Message Title</label>
                      <Input
                        value={chairmanMessageData?.messageTitle || ''}
                        onChange={(e) => setChairmanMessageData(prev => prev ? {...prev, messageTitle: e.target.value} : null)}
                        placeholder="Welcome to Our Institution"
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Message Content</label>
                      <textarea
                        value={chairmanMessageData?.messageContent || ''}
                        onChange={(e) => setChairmanMessageData(prev => prev ? {...prev, messageContent: e.target.value} : null)}
                        rows={8}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base"
                        placeholder="Assalamu Alaikum wa Rahmatullahi wa Barakatuh..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Vision Section</h3>
                      <p className="text-sm text-gray-500">Chairman's vision for the future</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Vision Title</label>
                      <Input
                        value={chairmanMessageData?.visionTitle || ''}
                        onChange={(e) => setChairmanMessageData(prev => prev ? {...prev, visionTitle: e.target.value} : null)}
                        placeholder="Our Vision for the Future"
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Vision Content</label>
                      <textarea
                        value={chairmanMessageData?.visionContent || ''}
                        onChange={(e) => setChairmanMessageData(prev => prev ? {...prev, visionContent: e.target.value} : null)}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                        placeholder="We envision a future where our graduates become beacons of knowledge..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Achievements Section</h3>
                      <p className="text-sm text-gray-500">Institutional achievements and milestones</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Achievements Title</label>
                      <Input
                        value={chairmanMessageData?.achievementsTitle || ''}
                        onChange={(e) => setChairmanMessageData(prev => prev ? {...prev, achievementsTitle: e.target.value} : null)}
                        placeholder="Our Achievements and Milestones"
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Achievements Content</label>
                      <textarea
                        value={chairmanMessageData?.achievementsContent || ''}
                        onChange={(e) => setChairmanMessageData(prev => prev ? {...prev, achievementsContent: e.target.value} : null)}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-base"
                        placeholder="Over the years, we have achieved remarkable milestones..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'closing' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Closing & Signature</h3>
                      <p className="text-sm text-gray-500">Final message and Chairman's signature</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Closing Message</label>
                      <textarea
                        value={chairmanMessageData?.closingMessage || ''}
                        onChange={(e) => setChairmanMessageData(prev => prev ? {...prev, closingMessage: e.target.value} : null)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="I invite you to join us in this noble journey..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Signature</label>
                      <Input
                        value={chairmanMessageData?.signature || ''}
                        onChange={(e) => setChairmanMessageData(prev => prev ? {...prev, signature: e.target.value} : null)}
                        placeholder="Dr. Muhammad Al-Rashid"
                        className="h-12 text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <Button
                onClick={saveData}
                loading={saving}
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
              >
                💾 Save All Changes
              </Button>
            </div>
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
                <p className="text-sm text-gray-500">See how your changes will look on the Chairman Message page</p>
              </div>
            </div>
            <a
              href="/aboutus/chairman"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Chairman Message Page
            </a>
          </div>
          <p className="text-gray-600">
            To see your changes, save the content above and then visit the Chairman Message page. 
            All changes are applied immediately to the live website.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
