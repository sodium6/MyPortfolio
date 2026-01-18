import React from 'react';
import SocialLink from './SocialLink';

// SVG Icons - optimized
const GithubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const EmailIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
);

const LocationIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
);

const ContactSection = ({ contacts }) => {
    const defaultContacts = {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        email: 'contact@johndoe.dev',
        phone: '+66 99 999 9999',
        location: 'Bangkok, Thailand'
    };

    const data = { ...defaultContacts, ...contacts };

    return (
        <div className="w-full space-y-5 sm:space-y-6">
            {/* Section Title */}
            <h2 className="
        text-xs 
        sm:text-sm 
        uppercase 
        tracking-[0.2em]
        text-purple-400/80
        flex items-center justify-center gap-2
        font-semibold
      ">
                <span className="text-base">🔗</span>
                Connect With Me
            </h2>

            {/* Social Links */}
            <div className="flex justify-center gap-3 sm:gap-4">
                <SocialLink
                    href={data.github}
                    icon={<GithubIcon />}
                    label="GitHub"
                    color="gray"
                />
                <SocialLink
                    href={data.linkedin}
                    icon={<LinkedInIcon />}
                    label="LinkedIn"
                    color="blue"
                />
                <SocialLink
                    href={`mailto:${data.email}`}
                    icon={<EmailIcon />}
                    label="Email"
                    color="purple"
                />
                <SocialLink
                    href={`tel:${data.phone.replace(/\s/g, '')}`}
                    icon={<PhoneIcon />}
                    label="Phone"
                    color="green"
                />
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-2.5">
                <a
                    href={`mailto:${data.email}`}
                    className="
            group
            flex items-center justify-center gap-2.5
            px-4 py-2.5
            bg-white/[0.03]
            hover:bg-white/[0.08]
            border border-purple-500/20
            hover:border-purple-400/40
            rounded-xl
            text-xs sm:text-sm 
            text-purple-200 
            hover:text-white
            transition-all duration-300
            hover:shadow-[0_5px_20px_rgba(168,85,247,0.15)]
          "
                >
                    <span className="text-purple-400 group-hover:scale-110 transition-transform">✉️</span>
                    <span className="font-medium">{data.email}</span>
                </a>

                <div className="
          flex items-center justify-center gap-2.5
          px-4 py-2.5
          bg-white/[0.02]
          border border-gray-700/30
          rounded-xl
          text-xs sm:text-sm 
          text-gray-400
        ">
                    <LocationIcon />
                    <span>{data.location}</span>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
