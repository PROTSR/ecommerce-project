import React, { useState } from 'react'
import { AdminSignupMethod } from '../../../contex/Api'

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        employee_code: '',
        gender: 'MALE',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverError, setServerError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear specific field error on edit
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    // Frontend Validation matching Mongoose constraints
    const validateForm = () => {
        const newErrors = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required'
        }

        if (!formData.employee_code.trim()) {
            newErrors.employee_code = 'Employee code is required'
        }

        if (!['MALE', 'FEMALE'].includes(formData.gender)) {
            newErrors.gender = 'Select a valid gender'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required'
        } else if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = 'Enter a valid email address'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        setServerError('')
        setSuccessMessage('')

        if (!validateForm()) return

        setIsSubmitting(true)

        // Schema-aligned payload
        const payload = {
            name: formData.name.trim(),
            employee_code: formData.employee_code.trim(),
            gender: formData.gender,
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
        }

        try {
            await AdminSignupMethod(payload)
            setSuccessMessage('Admin account created successfully!')
            setFormData({
                name: '',
                employee_code: '',
                gender: 'MALE',
                email: '',
                password: '',
                confirmPassword: '',
            })
        } catch (err) {
            setServerError(err.message || 'An error occurred during registration')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="col-span-10 min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Register Admin User</h2>
                    <p className="text-sm text-gray-500 mt-1">Create a new administrative account</p>
                </div>

                {/* Server Status Alerts */}
                {serverError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg">
                        {serverError}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 text-sm rounded-lg">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder="e.g. John Doe"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name
                                    ? 'border-red-500 focus:ring-red-200'
                                    : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                }`}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Employee Code & Gender Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Employee Code */}
                        <div>
                            <label htmlFor="employee_code" className="block text-sm font-semibold text-gray-700 mb-1">
                                Employee Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="employee_code"
                                name="employee_code"
                                value={formData.employee_code}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                placeholder="e.g. EMP-101"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.employee_code
                                        ? 'border-red-500 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                    }`}
                            />
                            {errors.employee_code && (
                                <p className="text-xs text-red-500 mt-1">{errors.employee_code}</p>
                            )}
                        </div>

                        {/* Gender Dropdown */}
                        <div>
                            <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-1">
                                Gender <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className={`w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 ${errors.gender
                                        ? 'border-red-500 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                    }`}
                            >
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                            </select>
                            {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
                        </div>
                    </div>

                    {/* Email Address */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder="admin@company.com"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email
                                    ? 'border-red-500 focus:ring-red-200'
                                    : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                }`}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                placeholder="••••••••"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password
                                        ? 'border-red-500 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                    }`}
                            />
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                placeholder="••••••••"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword
                                        ? 'border-red-500 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                    }`}
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Registering Admin...' : 'Register Admin Account'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default AdminSignup