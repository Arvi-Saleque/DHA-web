import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { prisma } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

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

export default async function MissionVisionPage() {
  noStore(); // prevent caching

  // Fetch data from database
  const missionVisionData = await prisma.missionVision.findUnique({ where: { id: 1 } });

  // Fallback data if database records don't exist
  const pageData = missionVisionData || {
    heroTitle: "Our Mission & Vision",
    heroSubtitle: "Discover the driving force behind our commitment to excellence in Islamic education and our vision for the future.",
    missionTitle: "Our Mission",
    missionContent: "To provide exceptional Islamic education that nurtures both spiritual growth and academic excellence, preparing students to become responsible citizens and leaders in their communities while maintaining strong Islamic values and principles.",
    visionTitle: "Our Vision", 
    visionContent: "To be a leading institution in Islamic education, recognized for our commitment to excellence, innovation, and the holistic development of our students, creating future leaders who will contribute positively to society.",
    goalTitle: "Our Goals",
    goalContent: "We strive to create an environment where students excel academically while developing strong moral character, critical thinking skills, and a deep understanding of Islamic principles that will guide them throughout their lives.",
    ctaTitle: "Join Our Journey",
    ctaSubtitle: "Be part of our mission to transform lives through quality Islamic education",
    ctaButtonText: "Get Involved",
    ctaButtonLink: "/contact"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-32">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-12 backdrop-blur-sm">
              <svg className="w-10 h-10 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              {pageData.heroTitle.split(' ').slice(0, -2).join(' ')} <span className="text-yellow-300">{pageData.heroTitle.split(' ').slice(-2).join(' ')}</span>
            </h1>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed font-medium">
                {pageData.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Mission Content */}
            <div className="order-2 lg:order-1">
              <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-lg" padding="xl">
                <div className="p-6 flex items-start mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mr-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{pageData.missionTitle}</h2>
                  </div>
                </div>
                
                <p className="px-4 text-lg text-gray-700 leading-relaxed mb-8 font-medium">
                  {pageData.missionContent}
                </p>
                
                <div className="flex items-center p-4 bg-white rounded-lg border border-blue-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-semibold">Our commitment to excellence</span>
                </div>
              </Card>
            </div>

            {/* Mission Image/Illustration */}
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-16 text-center border border-blue-200 shadow-lg">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Educational Excellence</h3>
                <p className="text-gray-700 text-lg leading-relaxed">Nurturing minds and souls through Islamic education</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Vision Image/Illustration */}
            <div className="order-1">
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-16 text-center text-white border border-indigo-500 shadow-lg">
                <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Future Leaders</h3>
                <p className="text-blue-100 text-lg leading-relaxed">Shaping tomorrow's Islamic leaders</p>
              </div>
            </div>

            {/* Vision Content */}
            <div className="order-2">
              <Card className="h-full bg-gradient-to-br from-indigo-600 to-blue-700 text-white border border-indigo-500 shadow-lg" padding="xl">
                <div className="p-6 flex items-start mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.visionTitle}</h2>
                  </div>
                </div>
                
                <p className="px-4 text-lg text-blue-100 leading-relaxed mb-8 font-medium">
                  {pageData.visionContent}
                </p>
                
                <div className="flex items-center p-4 bg-white/10 rounded-lg border border-white/20">
                  <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-indigo-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <span className="text-yellow-300 font-semibold">Shaping tomorrow's leaders</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {pageData.goalTitle.split(' ').slice(0, -1).join(' ')} <span className="text-blue-600">{pageData.goalTitle.split(' ').slice(-1)}</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Goals Content */}
            <div>
              <Card className="h-full bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg" padding="xl">
                <div className="p-6 flex items-start mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Academic & Spiritual Excellence</h3>
                  </div>
                </div>
                
                <p className="px-4 text-lg text-gray-700 leading-relaxed mb-8 font-medium">
                  {pageData.goalContent}
                </p>
                
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold">Academic Excellence</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold">Moral Character</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold">Critical Thinking</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold">Islamic Values</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Goals Illustration */}
            <div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-16 text-center border border-green-200 shadow-lg">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Empowering Success</h3>
                <p className="text-gray-700 text-lg leading-relaxed">Building confident, capable, and caring individuals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
            <svg className="w-10 h-10 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {pageData.ctaTitle.split(' ').slice(0, -1).join(' ')} <span className="text-yellow-300">{pageData.ctaTitle.split(' ').slice(-1)}</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-10 leading-relaxed">
            {pageData.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              variant="secondary" 
              size="xl" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
            >
              {pageData.ctaButtonText}
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
