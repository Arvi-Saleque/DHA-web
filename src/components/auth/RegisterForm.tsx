import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Alert from '../ui/Alert';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  phone?: string;
  studentId?: string;
  parentName?: string;
  parentPhone?: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  loading?: boolean;
  error?: string;
  className?: string;
  allowedRoles?: Array<{ value: string; label: string; requiresApproval?: boolean }>;
  onLogin?: () => void;
}

export default function RegisterForm({
  onSubmit,
  loading = false,
  error,
  className = '',
  allowedRoles = [
    { value: 'student', label: 'Student', requiresApproval: true },
    { value: 'parent', label: 'Parent', requiresApproval: true },
    { value: 'teacher', label: 'Teacher', requiresApproval: true }
  ],
  onLogin
}: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: allowedRoles[0]?.value || '',
    phone: '',
    studentId: '',
    parentName: '',
    parentPhone: ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.role) {
      errors.role = 'Please select a role';
    }
    
    // Role-specific validation
    if (formData.role === 'student' && !formData.studentId) {
      errors.studentId = 'Student ID is required';
    }
    
    if (formData.role === 'parent') {
      if (!formData.parentName) {
        errors.parentName = 'Parent name is required';
      }
      if (!formData.parentPhone) {
        errors.parentPhone = 'Parent phone is required';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await onSubmit(formData);
    } catch (err) {
      // Error handling is done by parent component
    }
  };

  const handleInputChange = (field: keyof RegisterFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const selectedRole = allowedRoles.find(role => role.value === formData.role);

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Join our academic community</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert
            type="error"
            message={error}
            className="mb-6"
            dismissible
          />
        )}

        {/* Approval Notice */}
        {selectedRole?.requiresApproval && (
          <Alert
            type="info"
            message={`${selectedRole.label} accounts require approval from administrators before activation.`}
            className="mb-6"
          />
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              placeholder="First name"
              required
              error={validationErrors.firstName}
            />
            
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              placeholder="Last name"
              required
              error={validationErrors.lastName}
            />
          </div>

          {/* Email */}
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            placeholder="Enter your email"
            required
            error={validationErrors.email}
            icon={
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            }
          />

          {/* Password */}
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange('password')}
            placeholder="Create a password"
            required
            error={validationErrors.password}
            icon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            }
          />

          {/* Confirm Password */}
          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            placeholder="Confirm your password"
            required
            error={validationErrors.confirmPassword}
          />

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.role}
              onChange={handleInputChange('role')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="">Select your role</option>
              {allowedRoles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label} {role.requiresApproval && '(Requires Approval)'}
                </option>
              ))}
            </select>
            {validationErrors.role && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.role}</p>
            )}
          </div>

          {/* Phone */}
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone || ''}
            onChange={handleInputChange('phone')}
            placeholder="Your phone number"
          />

          {/* Role-specific fields */}
          {formData.role === 'student' && (
            <Input
              label="Student ID"
              value={formData.studentId || ''}
              onChange={handleInputChange('studentId')}
              placeholder="Enter your student ID"
              required
              error={validationErrors.studentId}
            />
          )}

          {formData.role === 'parent' && (
            <>
              <Input
                label="Student Name"
                value={formData.parentName || ''}
                onChange={handleInputChange('parentName')}
                placeholder="Your child's name"
                required
                error={validationErrors.parentName}
              />
              
              <Input
                label="Student Phone"
                type="tel"
                value={formData.parentPhone || ''}
                onChange={handleInputChange('parentPhone')}
                placeholder="Student's phone number"
                required
                error={validationErrors.parentPhone}
              />
            </>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Create Account
          </Button>
        </form>

        {/* Footer Links */}
        {onLogin && (
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <button
              type="button"
              onClick={onLogin}
              className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}