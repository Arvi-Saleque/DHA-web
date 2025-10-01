import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Card from '@/components/ui/Card';
import { prisma } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

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

export default async function ChairmanMessagePage() {
  noStore(); // prevent caching

  // Fetch data from database
  const chairmanMessageData = await prisma.chairmanMessage.findUnique({ 
    where: { id: 1 } 
  });

  // Fallback data if database record doesn't exist
  const pageData = chairmanMessageData || {
    heroTitle: "Chairman's Message",
    heroSubtitle: "A message from our esteemed Chairman about our vision, mission, and commitment to excellence in Islamic education.",
    chairmanName: "Dr. Muhammad Al-Rashid",
    chairmanTitle: "Chairman of the Board",
    chairmanImage: "/images/chairman-placeholder.jpg",
    messageTitle: "Welcome to Our Institution",
    messageContent: "Assalamu Alaikum wa Rahmatullahi wa Barakatuh. It is with great pleasure and humility that I welcome you to our esteemed institution. As Chairman of the Board, I am honored to lead an organization that has been at the forefront of Islamic education for decades. Our commitment to excellence in both religious and academic education remains unwavering, as we strive to nurture the next generation of Muslim leaders who will contribute positively to society while maintaining their Islamic identity and values.",
    visionTitle: "Our Vision for the Future",
    visionContent: "We envision a future where our graduates become beacons of knowledge, wisdom, and moral excellence in their communities. Our institution serves as a bridge between traditional Islamic scholarship and contemporary educational needs, ensuring that our students are well-equipped to face the challenges of the modern world while remaining firmly rooted in their faith. We are committed to fostering an environment of intellectual curiosity, spiritual growth, and character development.",
    achievementsTitle: "Our Achievements and Milestones",
    achievementsContent: "Over the years, we have achieved remarkable milestones that reflect our dedication to educational excellence. Our graduates have gone on to become successful professionals, scholars, and community leaders across various fields. We have established partnerships with renowned institutions worldwide, expanded our academic programs, and continuously improved our facilities to provide the best learning environment for our students.",
    closingMessage: "I invite you to join us in this noble journey of education and character building. Together, we can create a brighter future for our community and contribute to the betterment of society as a whole. May Allah bless our efforts and guide us on the path of righteousness.",
    signature: "Dr. Muhammad Al-Rashid"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 text-white py-32">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-12 backdrop-blur-sm">
              <svg className="w-10 h-10 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              {pageData.heroTitle.split(' ').slice(0, -1).join(' ')} <span className="text-yellow-300">{pageData.heroTitle.split(' ').slice(-1)}</span>
            </h1>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed font-medium">
                {pageData.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Message Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            {/* Chairman Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl blur-xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200 shadow-xl">
                  {pageData.chairmanImage ? (
                    <img 
                      src={pageData.chairmanImage} 
                      alt={pageData.chairmanName}
                      className="w-full h-96 object-cover rounded-2xl shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <div className="text-center text-white">
                        <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-xl font-semibold">{pageData.chairmanName}</p>
                        <p className="text-blue-200">{pageData.chairmanTitle}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Chairman Info Card */}
                  <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pageData.chairmanName}</h3>
                    <p className="text-blue-600 font-semibold mb-4">{pageData.chairmanTitle}</p>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span className="font-medium">Leading with Vision and Integrity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="order-1 lg:order-2">
              <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-lg">
                <div className="p-4 flex items-start mb-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mr-8">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{pageData.messageTitle}</h2>
                  </div>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="px-6 text-lg text-gray-700 leading-relaxed mb-8 font-medium">
                    {pageData.messageContent}
                  </p>
                </div>
                
                <div className="flex items-center p-6 bg-white rounded-lg border border-blue-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-semibold">Committed to Excellence in Islamic Education</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            {/* Vision Content */}
            <div>
              <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-lg">
                <div className="p-4 flex items-start mb-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mr-8">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{pageData.visionTitle}</h2>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-12 font-medium">
                  {pageData.visionContent}
                </p>
                
                <div className="flex items-center p-6 bg-white/10 rounded-lg border border-white/20">
                  <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-blue-800 font-semibold">Shaping Future Leaders</span>
                </div>
              </Card>
            </div>

            {/* Vision Illustration */}
            <div>
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-20 text-center text-white border border-indigo-500 shadow-lg">
                <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-10 flex items-center justify-center shadow-lg">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-6">Visionary Leadership</h3>
                <p className="text-blue-100 text-lg leading-relaxed">Guiding our institution towards a brighter future</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            {/* Achievements Illustration */}
            <div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-20 text-center border border-green-200 shadow-lg">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-10 flex items-center justify-center shadow-lg">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Excellence Achieved</h3>
                <p className="text-gray-700 text-lg leading-relaxed">Celebrating our milestones and continued success</p>
              </div>
            </div>

            {/* Achievements Content */}
            <div>
              <Card className="h-full bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg">
                <div className="p-6 flex items-start mb-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-8">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{pageData.achievementsTitle}</h2>
                  </div>
                </div>
                
                <p className="px-6 text-lg text-gray-700 leading-relaxed mb-12 font-medium">
                  {pageData.achievementsContent}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold">Academic Excellence</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold">Global Partnerships</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold">Community Impact</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold">Student Success</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Message Section */}
            {/* Closing Message Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16">
          <Card className="bg-white border border-gray-200 shadow-lg">
            <div className="text-center mb-12">
              {/* Simple Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-8">
                <svg className="w-8 h-8 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              
              {/* Simple Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">A Personal Invitation</h2>
            </div>
            
            {/* Quote Section */}
            <div className="prose prose-lg max-w-none text-center mb-12">
              <p className="text-lg text-gray-700 leading-relaxed font-medium italic">
                "{pageData.closingMessage}"
              </p>
            </div>
            
            {/* Simple Signature Section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="text-center">
                {/* Warm Regards */}
                <p className="text-gray-600 mb-4">
                  With warm regards,
                </p>

                {/* Simple Signature */}
                <div className="mb-4">
                  <p className="text-xl font-semibold text-blue-900">
                    {pageData.signature}
                  </p>
                </div>

                {/* Simple Title */}
                <p className="text-gray-600 text-sm">
                  {pageData.chairmanTitle}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
