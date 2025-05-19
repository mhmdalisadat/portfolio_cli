// components/ContactForm.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Phone } from "lucide-react";
import { sendContactEmail } from "../services";



const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    await sendContactEmail(form);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="max-w-3xl w-full p-10 bg-[#0D1117] rounded-2xl shadow-2xl border border-[#0077B5] text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="flex flex-col items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-[#0077B5] p-4 rounded-full shadow-lg mb-3">
            <Phone size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-center">در تماس باشید</h2>
          <p className="text-center text-gray-400 text-sm mt-2">
            با پر کردن فرم زیر، مستقیماً با من ارتباط برقرار کنید.
          </p>
        </motion.div>

        {submitted ? (
          <motion.p
            className="text-green-400 text-center text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            پیام شما با موفقیت ارسال شد.
          </motion.p>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {["name", "email", "phone", "message"].map((field) => (
              <motion.div
                key={field}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {field === "name"
                    ? "نام و نام خانوادگی"
                    : field === "email"
                    ? "ایمیل"
                    : field === "phone"
                    ? "شماره تماس"
                    : "پیام شما"}
                </label>
                {field !== "message" ? (
                  <div className="relative">
                    <input
                      type={
                        field === "email"
                          ? "email"
                          : field === "phone"
                          ? "tel"
                          : "text"
                      }
                      name={field}
                      placeholder={
                        field === "name"
                          ? "مثلاً علی رضایی"
                          : field === "email"
                          ? "example@email.com"
                          : "09123456789"
                      }
                      value={form[field as keyof typeof form]}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-[#161B22] text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B5]"
                    />
                    <div className="absolute left-3 top-3 text-[#0077B5]">
                      {field === "name" ? (
                        <User size={20} />
                      ) : field === "email" ? (
                        <Mail size={20} />
                      ) : (
                        <Phone size={20} />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder="سلام..."
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-[#161B22] text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B5] resize-none"
                    />
                    <div className="absolute left-3 top-3 text-[#0077B5]">
                      <MessageSquare size={20} />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              className="w-full bg-[#0077B5] text-white py-3 font-medium rounded-xl hover:brightness-110 transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ارسال پیام
            </motion.button>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
          </motion.form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
