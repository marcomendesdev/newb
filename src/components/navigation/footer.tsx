import Link from "next/link"
import { JSX, SVGProps } from "react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 px-8 w-full">
      <div className="container max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <MountainIcon className="h-6 w-6" />
            <span className="text-lg font-bold">Acme Inc</span>
          </div>
          <p className="text-muted-foreground">Crafting innovative solutions for a better tomorrow.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              <GitlabIcon className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              <LinkedinIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="grid gap-2">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            Services
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            Contact
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="text-lg font-semibold">Resources</h4>
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            Documentation
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            Tutorials
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            Support
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            FAQs
          </Link>
        </div>
        <div className="grid gap-4">
          <h4 className="text-lg font-semibold">Contact</h4>
          <div className="grid gap-2">
            <div className="flex items-start gap-2">
              <MapPinIcon className="h-5 w-5 text-muted-foreground" />
              <address className="not-italic text-muted-foreground">
                123 Main Street
                <br />
                Anytown, USA 12345
              </address>
            </div>
            <div className="flex items-start gap-2">
              <PhoneIcon className="h-5 w-5 text-muted-foreground" />
              <a href="#" className="text-muted-foreground hover:text-foreground">
                +1 (234) 567-890
              </a>
            </div>
            <div className="flex items-start gap-2">
              <MailIcon className="h-5 w-5 text-muted-foreground" />
              <a href="#" className="text-muted-foreground hover:text-foreground">
                info@acme.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function GitlabIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </svg>
  )
}


function LinkedinIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function MailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function MapPinIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}


function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function PhoneIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}