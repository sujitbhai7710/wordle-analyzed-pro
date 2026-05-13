'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const contactFaqs = [
  {
    question: 'How do I report a bug or issue with the analyzer?',
    answer: 'Please use the contact form below and select "Bug Report" as the subject. Include a description of the issue, your browser and device, and steps to reproduce the problem. We investigate all reports within 48 hours.',
  },
  {
    question: 'Can I suggest a new feature?',
    answer: 'Absolutely! We love hearing from our users. Use the contact form with "Feature Request" as the subject and describe what you\'d like to see. We review all suggestions and prioritize based on community demand.',
  },
  {
    question: 'Do you offer Wordle coaching or consulting?',
    answer: 'While we don\'t currently offer one-on-one coaching, our blog is packed with strategies from players with 300+ day streaks. Check out our strategy guides for comprehensive tips that cover everything from opening words to endgame techniques.',
  },
  {
    question: 'Can I use your analysis data in my own project?',
    answer: 'Our analysis methodology and word lists are available for educational purposes. Please reach out to us with details about your project, and we\'ll be happy to discuss how you can use our data with proper attribution.',
  },
];

export function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a static site, we just show success
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Get in <span className="text-[#6aaa64]">Touch</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have feedback, questions, or suggestions? We&apos;d love to hear from you
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {submitted ? (
            <Card className="border-[#6aaa64]/30">
              <CardContent className="pt-6 text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#6aaa64]/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-[#6aaa64]" />
                </div>
                <h2 className="text-xl font-bold">Message Sent!</h2>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  variant="outline"
                >
                  Send Another Message
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Bug Report, Feature Request, Question..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what's on your mind..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#6aaa64] hover:bg-[#5a9a54]">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Info & FAQ */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Contact Info */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#6aaa64]/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-[#6aaa64]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Email Us</h3>
                  <p className="text-sm text-muted-foreground">hello@wordleanalyzer.dev</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#c9b458]/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-[#c9b458]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Response Time</h3>
                  <p className="text-sm text-muted-foreground">Usually within 24-48 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <div>
            <h3 className="font-semibold mb-3">Common Questions</h3>
            <Accordion type="single" collapsible className="w-full">
              {contactFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
