import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import { submitLead } from "../lib/api";

export default function ContactModal({ open, onOpenChange, source = "hero", title, description }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) {
      toast.error("Please complete the required fields.");
      return;
    }
    setLoading(true);
    try {
      await submitLead({ ...form, source });
      toast.success("Request received. Our team will reach out within 24 hours.");
      setForm({ name: "", email: "", company: "", message: "" });
      onOpenChange(false);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="contact-modal"
        className="bg-[#0F0F0F] border border-white/10 text-white sm:max-w-lg rounded-2xl"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-2xl md:text-3xl tracking-tight">
            {title || "Request your growth audit"}
          </DialogTitle>
          <DialogDescription className="text-[#A3A3A3]">
            {description || "Share a few details. A LinkOps strategist will respond within one business day."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2" data-testid="contact-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lead-name" className="text-white/80">Name</Label>
              <Input
                id="lead-name"
                data-testid="contact-name-input"
                value={form.name}
                onChange={update("name")}
                placeholder="Jane Doe"
                className="bg-[#141414] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#6BE05A]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-email" className="text-white/80">Work Email</Label>
              <Input
                id="lead-email"
                type="email"
                data-testid="contact-email-input"
                value={form.email}
                onChange={update("email")}
                placeholder="jane@company.com"
                className="bg-[#141414] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#6BE05A]"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-company" className="text-white/80">Company</Label>
            <Input
              id="lead-company"
              data-testid="contact-company-input"
              value={form.company}
              onChange={update("company")}
              placeholder="Acme Inc."
              className="bg-[#141414] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#6BE05A]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-message" className="text-white/80">What does success look like?</Label>
            <Textarea
              id="lead-message"
              data-testid="contact-message-input"
              value={form.message}
              onChange={update("message")}
              placeholder="A few lines about your goals, ICP, or current pipeline."
              className="bg-[#141414] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#6BE05A] min-h-[110px]"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              data-testid="contact-submit"
              disabled={loading}
              className="bg-[#6BE05A] hover:bg-[#58C248] text-[#0A0A0A] font-semibold rounded-full px-6 py-5"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending</>
              ) : (
                <>Submit request <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
