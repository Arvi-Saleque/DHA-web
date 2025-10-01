'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/app/admin/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface MissionVisionData {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  missionTitle: string;
  missionContent: string;
  missionImage?: string;
  visionTitle: string;
  visionContent: string;
  visionImage?: string;
  goalTitle: string;
  goalContent: string;
  goalImage?: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  ctaButtonLink: string;
}

export default function MissionVisionManagementPage() {
  const [missionVisionData, setMissionVisionData] = useState<MissionVisionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('/api/admin/mission-vision');
      const data = await response.json();
      
      setMissionVisionData(data.missionVision);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async () => {
    if (!missionVisionData) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/admin/mission-vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ missionVision: missionVisionData })
      });
      
      if (response.ok) {
        alert('Mission & Vision content saved successfully!');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Mission & Vision management...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Mission & Vision Management</h2>
              <p className="text-purple-100">
                Manage your institution's mission, vision, and core values content.
              </p>
            </div>
            <div className="hidden lg:block">
              <svg className="w-16 h-16 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
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
                { id: 'mission', name: 'Mission', icon: '🎯' },
                { id: 'vision', name: 'Vision', icon: '👁️' },
                { id: 'goals', name: 'Goals Section', icon: '🎯' },
                { id: 'cta', name: 'Call to Action', icon: '📢' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
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
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
                    <p className="text-sm text-gray-500">Main title and subtitle that appears at the top of the page</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Hero Title</label>
                    <Input
                      value={missionVisionData?.heroTitle || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, heroTitle: e.target.value} : null)}
                      placeholder="Our Mission & Vision"
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Hero Subtitle</label>
                    <textarea
                      value={missionVisionData?.heroSubtitle || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, heroSubtitle: e.target.value} : null)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                      placeholder="Guiding principles that shape our educational journey..."
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Mission Statement</h3>
                    <p className="text-sm text-gray-500">Define your institution's primary purpose and goals</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Mission Title</label>
                    <Input
                      value={missionVisionData?.missionTitle || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, missionTitle: e.target.value} : null)}
                      placeholder="Our Mission"
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Mission Content</label>
                    <textarea
                      value={missionVisionData?.missionContent || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, missionContent: e.target.value} : null)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="To provide exceptional Islamic education that nurtures both spiritual growth and academic excellence..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Mission Image URL (Optional)</label>
                    <Input
                      value={missionVisionData?.missionImage || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, missionImage: e.target.value} : null)}
                      placeholder="https://example.com/mission-image.jpg"
                      className="h-12 text-base"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Vision Statement</h3>
                    <p className="text-sm text-gray-500">Describe your institution's future aspirations and long-term goals</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Vision Title</label>
                    <Input
                      value={missionVisionData?.visionTitle || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, visionTitle: e.target.value} : null)}
                      placeholder="Our Vision"
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Vision Content</label>
                    <textarea
                      value={missionVisionData?.visionContent || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, visionContent: e.target.value} : null)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      placeholder="To be a leading institution in Islamic education, recognized for our commitment to excellence..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Vision Image URL (Optional)</label>
                    <Input
                      value={missionVisionData?.visionImage || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, visionImage: e.target.value} : null)}
                      placeholder="https://example.com/vision-image.jpg"
                      className="h-12 text-base"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'goals' && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Goals Section</h3>
                    <p className="text-sm text-gray-500">Define your institution's key objectives and aspirations</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Goals Section Title</label>
                    <Input
                      value={missionVisionData?.goalTitle || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, goalTitle: e.target.value} : null)}
                      placeholder="Our Goals"
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Goals Content</label>
                    <textarea
                      value={missionVisionData?.goalContent || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, goalContent: e.target.value} : null)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base"
                      placeholder="We strive to create an environment where students excel academically while developing strong moral character..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Goals Image URL (Optional)</label>
                    <Input
                      value={missionVisionData?.goalImage || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, goalImage: e.target.value} : null)}
                      placeholder="https://example.com/goals-image.jpg"
                      className="h-12 text-base"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cta' && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Call to Action Section</h3>
                    <p className="text-sm text-gray-500">Encourage visitors to take action and get involved</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">CTA Title</label>
                    <Input
                      value={missionVisionData?.ctaTitle || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, ctaTitle: e.target.value} : null)}
                      placeholder="Join Our Mission"
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">CTA Button Text</label>
                    <Input
                      value={missionVisionData?.ctaButtonText || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, ctaButtonText: e.target.value} : null)}
                      placeholder="Get Involved"
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">CTA Subtitle</label>
                    <textarea
                      value={missionVisionData?.ctaSubtitle || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, ctaSubtitle: e.target.value} : null)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base"
                      placeholder="Be part of our journey to transform lives through quality Islamic education"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">CTA Button Link</label>
                    <Input
                      value={missionVisionData?.ctaButtonLink || ''}
                      onChange={(e) => setMissionVisionData(prev => prev ? {...prev, ctaButtonLink: e.target.value} : null)}
                      placeholder="/contact"
                      className="h-12 text-base"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Changes will be applied to your live website immediately after saving.
              </div>
              <Button
                onClick={saveData}
                loading={saving}
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
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
                <p className="text-sm text-gray-500">See how your changes will look on the Mission & Vision page</p>
              </div>
            </div>
            <a
              href="/aboutus/mission"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Mission & Vision Page
            </a>
          </div>
          <p className="text-gray-600">
            To see your changes, save the content above and then visit the Mission & Vision page. 
            All changes are applied immediately to the live website.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
