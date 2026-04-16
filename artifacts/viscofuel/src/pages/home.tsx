import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { Clock, ShieldAlert, Calendar, ArrowRight, CheckCircle2, Sun, Moon } from "lucide-react";

import { useCreateWaitlistEntry, useUpdateWaitlistName, useTrackPageView } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const step1Schema = z.object({
  neighborhood: z.string().min(1, "Please select your neighborhood"),
  phone: z.string().min(9, "Please enter a valid phone number"),
});

const step2Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
});

const NEIGHBORHOODS = [
  "Kilimani",
  "Westlands",
  "Karen",
  "Lavington",
  "Kileleshwa",
  "Langata",
  "South B",
  "South C"
];

export default function Home() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const trackPageView = useTrackPageView();
  const createWaitlist = useCreateWaitlistEntry();
  const updateName = useUpdateWaitlistName();

  const [entryId, setEntryId] = useState<number | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("");
  const [showStep2, setShowStep2] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    trackPageView.mutate({ data: { page: "home" } });
  }, []); // Only run once on mount

  const form1 = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      neighborhood: "",
      phone: "",
    },
  });

  const form2 = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      name: "",
    },
  });

  const onStep1Submit = (data: z.infer<typeof step1Schema>) => {
    createWaitlist.mutate({ data }, {
      onSuccess: (res) => {
        setEntryId(res.id);
        setSelectedNeighborhood(data.neighborhood);
        setShowStep2(true);
      },
      onError: (err) => {
        toast({
          title: "Something went wrong",
          description: err.message || "Failed to join waitlist. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  const onStep2Submit = (data: z.infer<typeof step2Schema>) => {
    if (!entryId) return;
    updateName.mutate({ id: entryId, data }, {
      onSuccess: () => {
        setShowStep2(false);
        setCompleted(true);
        form1.reset();
        form2.reset();
        toast({
          title: "You're on the list!",
          description: "We'll be in touch as soon as we launch in your area.",
        });
      },
      onError: (err) => {
        toast({
          title: "Something went wrong",
          description: err.message || "Failed to update your name.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-2xl tracking-tight text-foreground">VISCO<span className="text-primary">FUEL</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-muted-foreground" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
            </button>
            <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-white" onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}>
              Request Early Access
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 inset-x-0 h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Launching soon in Nairobi
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              Fuel your car <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">anywhere, anytime.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              On-demand fuel delivery directly to your car. Skip the petrol station queues and get moving in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8 md:p-10 shadow-2xl relative z-10">
            {completed ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold">You're on the list!</h3>
                <p className="text-muted-foreground">We'll notify you the moment ViscoFuel goes live in your area.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="font-display text-3xl font-bold mb-2">Get early access</h2>
                  <p className="text-muted-foreground">Join the waitlist to be among the first to experience ViscoFuel.</p>
                </div>

                <Form {...form1}>
                  <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-6">
                    <FormField
                      control={form1.control}
                      name="neighborhood"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Neighborhood</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-background border-border">
                                <SelectValue placeholder="Select your area" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {NEIGHBORHOODS.map((n) => (
                                <SelectItem key={n} value={n}>{n}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form1.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="07XX XXX XXX" className="h-12 bg-background border-border" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base font-semibold group" 
                      disabled={createWaitlist.isPending}
                    >
                      {createWaitlist.isPending ? "Joining..." : "JOIN WAITLIST"}
                      {!createWaitlist.isPending && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/50 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Why ViscoFuel?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">We're reimagining how Nairobi refuels. No more detours, no more queues.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-background border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Save 20+ Minutes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Let us top up your car while it's parked at the office or in your driveway. Your time is better spent elsewhere.
              </p>
            </div>

            <div className="bg-background border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Roadside Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                Don't leave your car unattended. We bring high-quality fuel to you during emergencies, ensuring you're never stranded.
              </p>
            </div>

            <div className="bg-background border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Scheduled Refills</h3>
              <p className="text-muted-foreground leading-relaxed">
                Choose when you need us — right away or even overnight delivery. Wake up to a full tank every morning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-border/50 text-muted-foreground text-sm">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2 text-foreground/50 opacity-50 grayscale">
            <span className="font-display font-bold tracking-tight">VISCOFUEL</span>
          </div>
          <p>Visco Fuel Nairobi - Beta Test Phase - Not live yet</p>
        </div>
      </footer>

      {/* Step 2 Modal */}
      <Dialog open={showStep2} onOpenChange={(open) => {
        if (!open) {
          // If they close it without submitting, just count as complete but without name
          setShowStep2(false);
          setCompleted(true);
        }
      }}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">One last thing!</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Great! We are preparing to launch in <span className="text-primary font-medium">{selectedNeighborhood}</span>. What's your name so we can address you personally when we call?
            </DialogDescription>
          </DialogHeader>
          <Form {...form2}>
            <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-6 pt-4">
              <FormField
                control={form2.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Your full name" className="h-12 bg-background border-border" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="w-full h-12" disabled={updateName.isPending}>
                  {updateName.isPending ? "Saving..." : "FINISH"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
