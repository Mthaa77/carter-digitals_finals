'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Loader2, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// ── Zod Schema ──────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  businessName: z.string().min(1, 'Business name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactSchema>

// ── Shared input styles ─────────────────────────────────────────────────────
const inputStyles =
  'bg-[#1A1A1A] border-[#333] text-[#F0EFE8] placeholder:text-[#777] focus:ring-2 focus:ring-cd-gold/30 focus:border-cd-gold/50 focus-visible:border-[#C9A84C] focus-visible:ring-[#C9A84C]/30 h-11 w-full rounded-md px-4 text-sm font-sans transition-colors duration-200'

const selectTriggerStyles =
  'bg-[#1A1A1A] border-[#333] text-[#F0EFE8] data-[placeholder]:text-[#777] focus:ring-2 focus:ring-cd-gold/30 focus:border-cd-gold/50 focus-visible:border-[#C9A84C] focus-visible:ring-[#C9A84C]/30 h-11 w-full rounded-md px-4 text-sm font-sans transition-colors duration-200 [&>svg]:text-[#777]'

// ── Component ───────────────────────────────────────────────────────────────
export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      businessName: '',
      email: '',
      phone: '',
      service: '',
      budget: '',
      message: '',
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = form

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.')
      }

      toast.success('Message sent!', {
        description: "We'll get back to you within 4 business hours.",
      })
      reset()
    } catch (err) {
      toast.error('Failed to send', {
        description:
          err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative bg-[#080808] py-20 md:py-28 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#C9A84C] blur-[200px] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* ── Section Header ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-[var(--text-h2)] font-bold text-[#F0EFE8] mb-4">
            Let&apos;s Build Something.
          </h2>
          {/* Gold accent line */}
          <div className="mx-auto mb-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#7A6330] via-[#C9A84C] to-[#E8CA7A]" />
          <p className="text-[#C8C8C0] font-sans text-base max-w-md mx-auto">
            Tell us about your project. We reply within 4 business hours.
          </p>
        </motion.div>

        {/* ── Form Card ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="glass-card rounded-xl p-6 md:p-10 relative overflow-hidden"
          >
            {/* Gold gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7A6330] via-[#C9A84C] to-[#E8CA7A]" />
            {/* Row 1 — Name & Business Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-cd-text font-medium text-sm">
                  Name <span className="text-[#C9A84C]">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  className={inputStyles}
                  {...register('name')}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs font-sans mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-cd-text font-medium text-sm">
                  Business Name <span className="text-[#C9A84C]">*</span>
                </Label>
                <Input
                  id="businessName"
                  placeholder="Your business name"
                  className={inputStyles}
                  {...register('businessName')}
                  aria-invalid={!!errors.businessName}
                />
                {errors.businessName && (
                  <p className="text-red-400 text-xs font-sans mt-1">
                    {errors.businessName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2 — Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cd-text font-medium text-sm">
                  Email <span className="text-[#C9A84C]">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.co.za"
                  className={inputStyles}
                  {...register('email')}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs font-sans mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-cd-text font-medium text-sm">
                  Phone <span className="text-[#C9A84C]">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="072 000 0000"
                  className={inputStyles}
                  {...register('phone')}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs font-sans mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Row 3 — Service & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {/* Service */}
              <div className="space-y-2">
                <Label className="text-cd-text font-medium text-sm">Service</Label>
                <Select onValueChange={(value) => setValue('service', value)}>
                  <SelectTrigger className={selectTriggerStyles}>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-[#242424] text-[#F0EFE8] font-sans">
                    <SelectItem
                      value="website"
                      className="text-[#F0EFE8] focus:bg-[#242424] focus:text-[#E8CA7A] cursor-pointer"
                    >
                      Website
                    </SelectItem>
                    <SelectItem
                      value="dashboard"
                      className="text-[#F0EFE8] focus:bg-[#242424] focus:text-[#E8CA7A] cursor-pointer"
                    >
                      Dashboard
                    </SelectItem>
                    <SelectItem
                      value="seo"
                      className="text-[#F0EFE8] focus:bg-[#242424] focus:text-[#E8CA7A] cursor-pointer"
                    >
                      SEO
                    </SelectItem>
                    <SelectItem
                      value="google-ads"
                      className="text-[#F0EFE8] focus:bg-[#242424] focus:text-[#E8CA7A] cursor-pointer"
                    >
                      Google Ads
                    </SelectItem>
                    <SelectItem
                      value="not-sure"
                      className="text-[#F0EFE8] focus:bg-[#242424] focus:text-[#E8CA7A] cursor-pointer"
                    >
                      Not sure
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label className="text-cd-text font-medium text-sm">Budget Range</Label>
                <Select onValueChange={(value) => setValue('budget', value)}>
                  <SelectTrigger className={selectTriggerStyles}>
                    <SelectValue placeholder="Select a budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-[#242424] text-[#F0EFE8] font-sans">
                    <SelectItem
                      value="under-10k"
                      className="text-[#F0EFE8] focus:bg-[#242424] focus:text-[#E8CA7A] cursor-pointer"
                    >
                      Under R10k
                    </SelectItem>
                    <SelectItem
                      value="10k-20k"
                      className="text-[#F0EFE8] focus:bg-[#242424] focus:text-[#E8CA7A] cursor-pointer"
                    >
                      R10k – R20k
                    </SelectItem>
                    <SelectItem
                      value="20k-50k"
                      className="text-[#F0EFE8] focus:bg-[#242424] focus:text-[#E8CA7A] cursor-pointer"
                    >
                      R20k – R50k
                    </SelectItem>
                    <SelectItem
                      value="50k+"
                      className="text-[#F0EFE8] focus:bg-[#242424] focus:text-[#E8CA7A] cursor-pointer"
                    >
                      R50k+
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 4 — Message */}
            <div className="mb-8">
              <div className="space-y-2">
                <Label htmlFor="message" className="text-cd-text font-medium text-sm">
                  Tell us about your project
                </Label>
                <Textarea
                  id="message"
                  placeholder="Describe your project, goals, and any specific requirements..."
                  rows={5}
                  className={`${inputStyles} min-h-[120px] py-3 resize-none`}
                  {...register('message')}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-press bg-[#C9A84C] hover:bg-[#E8CA7A] text-[#080808] font-display font-semibold text-sm tracking-wide px-8 h-12 rounded-md transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Send Message
                  </>
                )}
              </Button>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-4 text-[#9A9A92] text-xs font-sans">
                <span className="flex items-center gap-1.5">
                  🔒 Your info is private
                </span>
                <span className="text-[#242424]">|</span>
                <span className="flex items-center gap-1.5">
                  ⚡ Reply in 4 hours
                </span>
                <span className="text-[#242424]">|</span>
                <span className="flex items-center gap-1.5">
                  🇿🇦 100% SA-owned
                </span>
              </div>
            </div>
          </form>
        </motion.div>

        {/* ── Bottom Info: WhatsApp + Office Details ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Left — WhatsApp */}
          <div className="glass-card rounded-xl p-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#C9A84C]/10">
                <MessageCircle className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#F0EFE8]">
                Prefer to chat?
              </h3>
            </div>
            <p className="text-[#C8C8C0] font-sans text-sm mb-5">
              Message us on WhatsApp for a faster response.
            </p>
            <a
              href="https://wa.me/27724026893?text=Hi%20Carter%20Digitals%2C%20I%27d%20like%20to%20discuss%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-cd-gold/10 hover:bg-cd-gold/20 text-cd-gold font-display font-semibold text-sm transition-colors duration-200 w-fit"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right — Office Details */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-display text-lg font-semibold text-[#F0EFE8] mb-5">
              Office Details
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                <span className="text-[#C8C8C0] font-sans text-sm">
                  Soshanguve, Pretoria, Gauteng
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                <a
                  href="tel:0724026893"
                  className="text-[#C8C8C0] hover:text-[#C9A84C] font-sans text-sm transition-colors duration-200"
                >
                  072 402 6893
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                <a
                  href="mailto:kadiakakabelo4@gmail.com"
                  className="text-[#C8C8C0] hover:text-[#C9A84C] font-sans text-sm transition-colors duration-200"
                >
                  kadiakakabelo4@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                <span className="text-[#C8C8C0] font-sans text-sm">
                  We reply within 4 business hours
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* ── Google Maps Embed ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="mt-8"
        >
          <div className="glass-card rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57218.97267884841!2d28.08!3d-25.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e8f5e2b3b6f8c4d%3A0x5d3b7e0a1c8f2b4d!2sSoshanguve%2C%20Pretoria!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza"
              width="100%"
              height="250"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carter Digitals Location - Soshanguve, Pretoria"
              className="w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
