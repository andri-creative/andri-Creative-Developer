"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MessageSquare,
  Monitor,
  User,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Github,
  Dribbble,
  Facebook,
} from "lucide-react";
import { PiTiktokLogoLight } from "react-icons/pi";
import sendContact, { createServices } from "@/app/services/contactService";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HelpPage() {
  const [formData, setFormData] = useState<createServices>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Simulasi loading 3 detik untuk seluruh halaman
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const response = await sendContact.SendContact(formData);
      if (response.success) {
        setSuccessMsg(response.message || "Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          country: "",
          message: "",
        });
      } else {
        setErrorMsg(response.message || "Failed to send message");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const socialMedia = [
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "https://www.instagram.com/andri__dev",
      color: "hover:text-pink-600 dark:hover:text-pink-400",
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      url: "https://www.youtube.com/andri-creative",
      color: "hover:text-red-600 dark:hover:text-red-400",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://id.linkedin.com/andri-creative",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: "https://x.com/andri-creative",
      color: "hover:text-sky-500 dark:hover:text-sky-400",
    },
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/andri-creative",
      color: "hover:text-gray-700 dark:hover:text-gray-300",
    },
    {
      name: "Dribbble",
      icon: <Dribbble className="h-5 w-5" />,
      url: "https://dribbble.com/andri-creative",
      color: "hover:text-pink-500 dark:hover:text-pink-300",
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: "#",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      name: "TikTok",
      icon: <PiTiktokLogoLight className="h-5 w-5" />,
      url: "https://www.tiktok.com/@dricode.com",
      color: "hover:text-gray-800 dark:hover:text-gray-200",
    },
  ];

  if (isPageLoading) {
    return <HelpPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 sm:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-2 sm:mb-4">
              Need help? Let's connect
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Have a question about our platform, security issues, or want to
              report a bug? We're here to help you 24/7!
            </p>
          </div>
        </div>

        {/* Grid Layout untuk Form dan Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-50 flex items-center gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Mail className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </div>
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* First Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 h-11"
                      />
                    </div>
                    {/* Last Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 h-11"
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 h-11"
                      />
                    </div>
                    {/* Country/Region */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="country"
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        Country/Region
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, country: value }))
                        }
                      >
                        <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 h-11">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50">
                          <SelectItem value="indonesia">Indonesia</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="japan">Japan</SelectItem>
                          <SelectItem value="singapore">Singapore</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* Message */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      Message
                    </Label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 min-h-[140px] resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 dark:bg-gray-50 dark:text-gray-900 text-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 h-11 text-base font-medium"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                  {successMsg && (
                    <p className="text-green-600 mt-2">{successMsg}</p>
                  )}
                  {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}
                </form>
              </CardContent>
            </Card>
          </div>
          {/* Contact Info & Social Media Section */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-50 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Customer Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Available 24/7 for urgent issues
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-50 mt-1">
                    +62 812-4919-2305
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Typically responds within 2 hours
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-50 mt-1">
                    andri.dev.code@gmail.com
                  </p>
                </div>
              </CardContent>
            </Card>
            {/* Social Media Card */}
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-50">
                  Follow Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Stay updated with our latest news and updates
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {socialMedia.map((platform, index) => (
                    <a
                      key={index}
                      href={platform.url}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-all duration-200 ${platform.color} hover:scale-105 hover:shadow-md`}
                      title={platform.name}
                    >
                      {platform.icon}
                      <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                        {platform.name}
                      </span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              title: "Contact an Expert",
              description:
                "Get in touch with our support team for personalized assistance and quick answers to your questions.",
              icon: (
                <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ),
            },
            {
              title: "Speak with the Expert",
              description:
                "Schedule a call with our experts for in-depth guidance and technical support.",
              icon: (
                <Phone className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ),
            },
            {
              title: "Formulate a Solution",
              description:
                "Work with us to create a tailored solution that meets your specific business needs.",
              icon: (
                <MessageSquare className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ),
            },
            {
              title: "Implementation and Monitor",
              description:
                "We'll help you implement the solution and provide ongoing monitoring and support.",
              icon: (
                <Monitor className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ),
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-gray-300 dark:hover:border-gray-600"
            >
              <CardHeader className="pb-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
                  {item.icon}
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-50 mt-3">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex-grow">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            |{" "}
            <a
              href="#"
              className="hover:text-gray-900 dark:hover:text-gray-50 underline"
            >
              Privacy Policy
            </a>{" "}
            |{" "}
            <a
              href="#"
              className="hover:text-gray-900 dark:hover:text-gray-50 underline"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// === SKELETON UNTUK SELURUH HALAMAN ===
function HelpPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8 sm:mb-12">
          <div className="space-y-3">
            <Skeleton className="h-12 w-96 rounded-md" />
            <Skeleton className="h-5 w-80 rounded-md" />
          </div>
        </div>

        {/* Grid Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Form Section Skeleton (2/3) */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-lg">
              {/* Header */}
              <div className="p-6 space-y-3">
                <Skeleton className="h-8 w-64 rounded-md" />
              </div>
              {/* Form */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-11 w-full rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-11 w-full rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-11 w-full rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-11 w-full rounded-md" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-36 w-full rounded-md" />
                </div>
                <Skeleton className="h-11 w-full rounded-md" />
              </div>
            </div>
          </div>

          {/* Contact Info & Social Skeleton */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-lg">
              <div className="p-6 space-y-3">
                <Skeleton className="h-6 w-48 rounded-md" />
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32 rounded-md" />
                  <Skeleton className="h-4 w-48 rounded-md" />
                  <Skeleton className="h-6 w-36 rounded-md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32 rounded-md" />
                  <Skeleton className="h-4 w-48 rounded-md" />
                  <Skeleton className="h-6 w-36 rounded-md" />
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-lg">
              <div className="p-6 space-y-3">
                <Skeleton className="h-6 w-32 rounded-md" />
              </div>
              <div className="p-6">
                <Skeleton className="h-4 w-64 rounded-md mb-4" />
                <div className="grid grid-cols-4 gap-3">
                  {[...Array(8)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-20 w-full rounded-lg"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Options Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl space-y-4 p-6"
            >
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Skeleton className="h-4 w-64 mx-auto rounded-md" />
        </div>
      </div>
    </div>
  );
}
