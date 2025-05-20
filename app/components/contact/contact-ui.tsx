"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Phone } from "lucide-react";
import { sendContactEmail } from "../../services";
import { useTranslation } from "react-i18next";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactUI = React.memo(() => {
  const { t } = useTranslation("common");
  const [form, setForm] = React.useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await sendContactEmail(form);
      if (response.error) {
        throw new Error(response.error);
      }
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="max-w-3xl w-full p-10 bg-[#0D1117] rounded-2xl shadow-2xl border-2 border-[#0077B5] text-gray-400"
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
            <Phone size={32} className="text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-center">
            {t("contact_form.title")}
          </h2>
          <p className="text-center text-gray-400 text-sm mt-2">
            {t("contact_form.subtitle")}
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-green-400 text-lg mb-4">
              {t("contact_form.success")}
            </p>
            <motion.button
              onClick={() => setSubmitted(false)}
              className="text-[#0077B5] hover:text-[#005582] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("contact_form.send_another")}
            </motion.button>
          </motion.div>
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
                  {t(`contact_form.${field}`)}
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
                      placeholder={t(`contact_form.${field}_placeholder`)}
                      value={form[field as keyof FormData]}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-[#161B22] text-gray-400 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B5] disabled:opacity-50 disabled:cursor-not-allowed"
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
                      placeholder={t("contact_form.message_placeholder")}
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-[#161B22] text-gray-400 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B5] resize-none disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={isSubmitting}
              className="w-full bg-[#0077B5] text-white py-3 font-medium rounded-xl hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                  {t("contact_form.sending")}
                </div>
              ) : (
                t("contact_form.submit")
              )}
            </motion.button>

            {error && (
              <motion.p
                className="text-red-400 text-sm text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.p>
            )}
          </motion.form>
        )}
      </motion.div>
    </motion.div>
  );
});

export default ContactUI;
