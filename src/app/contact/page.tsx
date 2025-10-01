import { Metadata } from 'next';
import { PrismaClient } from '@prisma/client';
import ContactForm from '@/components/ContactForm';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon, 
  GlobeAltIcon,
  PrinterIcon 
} from '@heroicons/react/24/outline';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Contact Us - Madrasa Management System',
  description: 'Get in touch with us. Find our contact information, location, and send us a message.',
  keywords: 'contact, madrasa, education, location, phone, email, address',
};

interface ContactInfo {
  id: number;
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

async function getContactInfo(): Promise<ContactInfo[]> {
  const prisma = new PrismaClient();
  
  try {
    const contactInfos = await prisma.contactInfo.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    
    return contactInfos;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export default async function ContactPage() {
  const contactInfos = await getContactInfo();
  const primaryContact = contactInfos[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              We're here to help and answer any questions you might have. 
              We look forward to hearing from you.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              {contactInfos.length > 0 ? (
                <div className="space-y-8">
                  {contactInfos.map((contact) => (
                    <div key={contact.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{contact.title}</h3>
                      
                      <div className="space-y-4">
                        {/* Address */}
                        <div className="flex items-start space-x-3">
                          <MapPinIcon className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900 font-medium">Address</p>
                            <p className="text-gray-600">
                              {contact.address}<br />
                              {contact.city}
                              {contact.state && `, ${contact.state}`}
                              {contact.zipCode && ` ${contact.zipCode}`}<br />
                              {contact.country}
                            </p>
                          </div>
                        </div>

                        {/* Phone */}
                        {contact.phone && (
                          <div className="flex items-center space-x-3">
                            <PhoneIcon className="h-5 w-5 text-purple-600 flex-shrink-0" />
                            <div>
                              <p className="text-gray-900 font-medium">Phone</p>
                              <a 
                                href={`tel:${contact.phone}`}
                                className="text-purple-600 hover:text-purple-700 transition-colors"
                              >
                                {contact.phone}
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Email */}
                        {contact.email && (
                          <div className="flex items-center space-x-3">
                            <EnvelopeIcon className="h-5 w-5 text-purple-600 flex-shrink-0" />
                            <div>
                              <p className="text-gray-900 font-medium">Email</p>
                              <a 
                                href={`mailto:${contact.email}`}
                                className="text-purple-600 hover:text-purple-700 transition-colors"
                              >
                                {contact.email}
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Fax */}
                        {contact.fax && (
                          <div className="flex items-center space-x-3">
                            <PrinterIcon className="h-5 w-5 text-purple-600 flex-shrink-0" />
                            <div>
                              <p className="text-gray-900 font-medium">Fax</p>
                              <p className="text-gray-600">{contact.fax}</p>
                            </div>
                          </div>
                        )}

                        {/* Website */}
                        {contact.website && (
                          <div className="flex items-center space-x-3">
                            <GlobeAltIcon className="h-5 w-5 text-purple-600 flex-shrink-0" />
                            <div>
                              <p className="text-gray-900 font-medium">Website</p>
                              <a 
                                href={contact.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-700 transition-colors"
                              >
                                {contact.website}
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Working Hours */}
                        {contact.workingHours && (
                          <div className="flex items-start space-x-3">
                            <ClockIcon className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-gray-900 font-medium">Working Hours</p>
                              <p className="text-gray-600 whitespace-pre-line">{contact.workingHours}</p>
                            </div>
                          </div>
                        )}

                        {/* Description */}
                        {contact.description && (
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="text-gray-700 text-sm">{contact.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Contact information will be available soon.</p>
                </div>
              )}
            </div>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                <PhoneIcon className="h-8 w-8 mb-3" />
                <h3 className="font-semibold mb-1">Call Us</h3>
                <p className="text-purple-100 text-sm">
                  {primaryContact?.phone || 'Phone number coming soon'}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                <EnvelopeIcon className="h-8 w-8 mb-3" />
                <h3 className="font-semibold mb-1">Email Us</h3>
                <p className="text-blue-100 text-sm">
                  {primaryContact?.email || 'Email coming soon'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        {primaryContact?.mapEmbedUrl && (
          <div className="mt-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8 pb-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Us</h2>
                <p className="text-gray-600 mb-6">Visit us at our location</p>
              </div>
              
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={primaryContact.mapEmbedUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Location Map"
                />
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What are your admission requirements?
                </h3>
                <p className="text-gray-600">
                  Please visit our admissions page or contact us directly for detailed information 
                  about our admission requirements and application process.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How can I schedule a visit?
                </h3>
                <p className="text-gray-600">
                  You can schedule a visit by calling us or filling out the contact form above. 
                  We'll be happy to arrange a tour of our facilities.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer online classes?
                </h3>
                <p className="text-gray-600">
                  Please contact us to learn more about our current online learning options 
                  and digital education programs.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How can I get more information about your programs?
                </h3>
                <p className="text-gray-600">
                  You can browse our website, call us directly, or fill out the contact form 
                  to receive detailed information about our educational programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}