'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof ContactSchema>;

export default function ContactPage({ params: { lang } }: { params: { lang: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema)
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const locations = [
    {
      title: 'Botoșani HQ & Factory',
      address: 'Str. Manolești Deal, Nr. 33, Botoșani',
      phone: '+40 231 532 186',
      email: 'office@electroalfa.ro'
    },
    {
      title: 'Bucharest Office',
      address: 'Str. Gara Herăstrău Nr. 4, București',
      phone: '+40 31 433 6600',
      email: 'bucuresti@electroalfa.ro'
    }
  ];

  return (
    <main className="bg-steel min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-navy mb-6 tracking-tight">
            {lang === 'ro' ? 'Contactează-ne' : 'Get in Touch'}
          </h1>
          <p className="text-xl text-navy/70 font-light">
            {lang === 'ro' 
              ? 'Suntem pregătiți să dezvoltăm următorul tău proiect la cheie. Alege experiența și precizia.'
              : 'We are ready to develop your next turnkey project. Choose experience and precision.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column - Forms */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-steel-dark shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
            
            <h2 className="text-2xl font-bold text-navy mb-8 relative z-10">
              {lang === 'ro' ? 'Trimite o Solicitare' : 'Send an Inquiry'}
            </h2>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl flex flex-col items-center justify-center text-center h-64 relative z-10"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {lang === 'ro' ? 'Mesaj Trimis!' : 'Message Sent!'}
                </h3>
                <p>
                  {lang === 'ro' 
                    ? 'Echipa noastră te va contacta în cel mai scurt timp.' 
                    : 'Our team will contact you shortly.'}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label={lang === 'ro' ? 'Nume Complet *' : 'Full Name *'}
                    {...register('name')}
                    error={errors.name?.message}
                    placeholder="Ion Popescu"
                  />
                  <Input 
                    label={lang === 'ro' ? 'Companie' : 'Company'}
                    {...register('company')}
                    error={errors.company?.message}
                    placeholder="Compania SRL"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="Email *"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    placeholder="ion@compania.ro"
                  />
                  <Input 
                    label={lang === 'ro' ? 'Telefon *' : 'Phone *'}
                    type="tel"
                    {...register('phone')}
                    error={errors.phone?.message}
                    placeholder="+40 700 000 000"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label className="text-sm font-semibold text-navy">
                    {lang === 'ro' ? 'Mesaj *' : 'Message *'}
                  </label>
                  <textarea
                    {...register('message')}
                    className={`px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-shadow min-h-[150px] resize-y ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-steel-dark focus:border-navy focus:ring-navy/20'
                    }`}
                    placeholder={lang === 'ro' ? 'Detaliile proiectului tău...' : 'Your project details...'}
                  />
                  {errors.message && <span className="text-sm text-red-500">{errors.message.message}</span>}
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full mt-4"
                >
                  {isSubmitting 
                    ? (lang === 'ro' ? 'Se trimite...' : 'Sending...') 
                    : (lang === 'ro' ? 'Trimite Mesajul' : 'Send Message')}
                </Button>
              </form>
            )}
          </section>

          {/* Right Column - Locations & Map Placeholder */}
          <section className="space-y-8">
            <div className="bg-navy rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
              
              <div className="relative z-10 space-y-12">
                {locations.map((loc, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="mt-1">
                      <div className="w-12 h-12 bg-orange/20 border border-orange/50 rounded-full flex items-center justify-center text-orange">
                        <MapPin size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{loc.title}</h3>
                      <ul className="space-y-3 text-steel/80">
                        <li className="flex items-start gap-3">
                          <MapPin size={18} className="mt-1 flex-shrink-0" />
                          <span>{loc.address}</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Phone size={18} className="flex-shrink-0" />
                          <span>{loc.phone}</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Mail size={18} className="flex-shrink-0" />
                          <span>{loc.email}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}

                <div className="pt-8 border-t border-white/20">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-orange" />
                    {lang === 'ro' ? 'Program' : 'Business Hours'}
                  </h3>
                  <p className="text-steel/80">
                    {lang === 'ro' ? 'Luni - Vineri: 08:00 - 17:00' : 'Monday - Friday: 08:00 AM - 05:00 PM'}<br/>
                    {lang === 'ro' ? 'Sâmbătă - Duminică: Închis' : 'Saturday - Sunday: Closed'}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-steel-dark rounded-3xl overflow-hidden border border-steel relative group shadow-sm">
               <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm group-hover:bg-white/10 transition-all duration-500">
                 <p className="font-bold text-navy uppercase tracking-wider flex items-center gap-2">
                   <MapPin />
                   {lang === 'ro' ? 'Harta Locațiilor (Integrare GMap)' : 'Location Map (GMap Integration)'}
                 </p>
               </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
