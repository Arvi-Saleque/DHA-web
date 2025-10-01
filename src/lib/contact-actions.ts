'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

interface ContactInfo {
  title: string;
  address: string;
  city: string;
  state?: string;
  zipCode?: string;
  country?: string;
  phone: string;
  email: string;
  fax?: string;
  website?: string;
  workingHours: string;
  mapEmbedUrl?: string;
  description?: string;
  displayOrder?: number;
  isActive: boolean;
}

export async function createContactInfo(data: ContactInfo) {
  try {
    const contactInfo = await prisma.contactInfo.create({
      data: {
        title: data.title,
        address: data.address,
        city: data.city,
        state: data.state || null,
        zipCode: data.zipCode || null,
        country: data.country || "Bangladesh",
        phone: data.phone,
        email: data.email,
        fax: data.fax || null,
        website: data.website || null,
        workingHours: data.workingHours,
        mapEmbedUrl: data.mapEmbedUrl || null,
        description: data.description || null,
        displayOrder: data.displayOrder || 0,
        isActive: data.isActive,
      },
    });
    
    revalidatePath('/admin/contactpage');
    return { success: true, data: contactInfo };
  } catch (error) {
    console.error('Error creating contact info:', error);
    return { success: false, error: 'Failed to create contact info' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateContactInfo(id: number, data: ContactInfo) {
  try {
    const contactInfo = await prisma.contactInfo.update({
      where: { id },
      data: {
        title: data.title,
        address: data.address,
        phone: data.phone,
        email: data.email,
        workingHours: data.workingHours,
        mapEmbedUrl: data.mapEmbedUrl || null,
        isActive: data.isActive,
      },
    });
    
    revalidatePath('/admin/contactpage');
    return { success: true, data: contactInfo };
  } catch (error) {
    console.error('Error updating contact info:', error);
    return { success: false, error: 'Failed to update contact info' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function toggleContactInfoActive(id: number) {
  try {
    const contactInfo = await prisma.contactInfo.findUnique({
      where: { id },
    });

    if (!contactInfo) {
      return { success: false, error: 'Contact info not found' };
    }

    const updated = await prisma.contactInfo.update({
      where: { id },
      data: { isActive: !contactInfo.isActive },
    });
    
    revalidatePath('/admin/contactpage');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Error toggling contact info active status:', error);
    return { success: false, error: 'Failed to toggle active status' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteContactInfo(id: number) {
  try {
    await prisma.contactInfo.delete({
      where: { id },
    });
    
    revalidatePath('/admin/contactpage');
    return { success: true };
  } catch (error) {
    console.error('Error deleting contact info:', error);
    return { success: false, error: 'Failed to delete contact info' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateSubmissionStatus(id: number, status: string, isRead?: boolean, adminNotes?: string) {
  try {
    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: {
        status,
        isRead: isRead !== undefined ? isRead : undefined,
        adminNotes: adminNotes !== undefined ? adminNotes : undefined,
      },
    });
    
    revalidatePath('/admin/contactpage');
    return { success: true, data: submission };
  } catch (error) {
    console.error('Error updating submission status:', error);
    return { success: false, error: 'Failed to update submission status' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteSubmission(id: number) {
  try {
    await prisma.contactSubmission.delete({
      where: { id },
    });
    
    revalidatePath('/admin/contactpage');
    return { success: true };
  } catch (error) {
    console.error('Error deleting submission:', error);
    return { success: false, error: 'Failed to delete submission' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getContactInfos() {
  try {
    const contactInfos = await prisma.contactInfo.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return { success: true, data: contactInfos };
  } catch (error) {
    console.error('Error fetching contact infos:', error);
    return { success: false, error: 'Failed to fetch contact infos' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getContactSubmissions() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return { success: true, data: submissions };
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return { success: false, error: 'Failed to fetch contact submissions' };
  } finally {
    await prisma.$disconnect();
  }
}