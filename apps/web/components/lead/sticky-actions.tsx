"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { CONTACT, telLink, whatsappLink } from "@pestosot/config";
import { useLeadModal } from "./lead-modal";

export function StickyActions() {
  const { open } = useLeadModal();

  return (
    <>
      {/* Desktop floating rail */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed bottom-6 right-6 z-50 hidden flex-col items-end gap-3 md:flex"
      >
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-sm font-semibold text-white shadow-float transition-transform hover:scale-105"
        >
          <MessageCircle className="size-5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[120px] group-hover:opacity-100">
            WhatsApp
          </span>
        </a>
        <a
          href={telLink()}
          aria-label={`Call ${CONTACT.phone}`}
          className="group flex items-center gap-2 rounded-full bg-navy-900 py-3 pl-3 pr-4 text-sm font-semibold text-white shadow-float transition-transform hover:scale-105"
        >
          <Phone className="size-5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[120px] group-hover:opacity-100">
            Call Now
          </span>
        </a>
        <button
          onClick={() => open()}
          className="flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
        >
          <CalendarCheck className="size-5" /> Book Inspection
        </button>
      </motion.div>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-ink-200 bg-white/90 backdrop-blur-md md:hidden">
        <a
          href={telLink()}
          className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium text-ink-700"
        >
          <Phone className="size-5 text-navy-800" />
          Call
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium text-ink-700"
        >
          <MessageCircle className="size-5 text-[#25D366]" />
          WhatsApp
        </a>
        <button
          onClick={() => open()}
          className="m-1.5 flex flex-col items-center justify-center gap-0.5 rounded-xl bg-primary-600 py-1.5 text-xs font-semibold text-white"
        >
          <CalendarCheck className="size-5" />
          Book
        </button>
      </div>
    </>
  );
}
