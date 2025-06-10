
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, Globe, Twitter } from "lucide-react";

export interface DeveloperModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeveloperModal({ open, onOpenChange }: DeveloperModalProps) {
  const developerLinks = [
    { icon: <Github className="h-4 w-4" />, label: "GitHub", url: "https://github.com" },
    { icon: <Linkedin className="h-4 w-4 text-blue-600" />, label: "LinkedIn", url: "https://www.linkedin.com/in/gthangella/" },
    { icon: <Twitter className="h-4 w-4 text-blue-400" />, label: "Twitter", url: "https://twitter.com/g_thangella" },
    { icon: <Mail className="h-4 w-4 text-red-500" />, label: "Email", url: "mailto:imgtk17@gmail.com" },
    { icon: <Globe className="h-4 w-4 text-green-500" />, label: "Portfolio", url: "https://thangella-creaftech-solutions.vercel.app/" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] max-w-md rounded-lg p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-md sm:text-lg text-center">Meet the Developer</DialogTitle>
          <DialogDescription className="text-center text-xs">
            Behind the Reel Revival application
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 pt-3 sm:pt-4">
          {/* Avatar & Info - Smaller on mobile */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border border-primary mb-2 sm:mb-3">
              <AvatarImage src="/GTK.JPG" alt="G. Thangella" />
              <AvatarFallback>GT</AvatarFallback>
            </Avatar>
            <h3 className="text-xs sm:text-sm font-semibold">G. Thangella</h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 whitespace-pre-line leading-tight sm:leading-snug">
              💼 Entrepreneur{"\n"}
              🧠 Tech Explorer{"\n"}
              🎨 Creative Thinker{"\n"}
              🔭 Visionary
            </p>

            <div className="flex gap-1 mt-1 sm:mt-2 flex-wrap justify-center sm:justify-start">
              {developerLinks.map((link, i) => (
                <Button key={i} variant="outline" size="icon" asChild className="h-6 w-6 sm:h-7 sm:w-7 rounded-full">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Description - Smaller text on mobile */}
          <div className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs w-full sm:w-[60%]">
            <p>
              I build impactful digital tools to simplify complex systems. The Reel Revival platform reflects my passion for cinema tech innovation and accessible design.
            </p>

            <div>
              <h4 className="font-medium text-xs sm:text-sm mb-0.5 sm:mb-1">Tech Stack of This Application</h4>
              <p className="text-muted-foreground">
                React, TypeScript, TailwindCSS, shadcn/ui, Framer Motion, Git, Vercel
              </p>
            </div>

            <div>
              <h4 className="font-medium text-xs sm:text-sm mb-0.5 sm:mb-1">Mission</h4>
              <p className="text-muted-foreground">
              I'm driven to create meaningful digital products that solve real-world problems. My focus is building tools that inspire, innovate, and leave a lasting impact through technology and design.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-2 sm:my-3" />

        <DialogFooter className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>Close</Button>
          <Button variant="default" size="sm" asChild>
            <a href="mailto:imgtk17@gmail.com" target="_blank" rel="noopener noreferrer">
              Get in Touch
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
