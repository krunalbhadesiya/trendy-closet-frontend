import ContactUsForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DribbbleIcon, GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

function ContactUs() {
  return (
    <div>
      <Helmet>
        <title>Contact Us | Lotus Group</title>
        <meta name="description" content="Get in touch with Lotus Group for inquiries, collaborations, or to discuss your project needs in web development, software development, UI/UX design, or IT consulting." />
        <meta name="keywords" content="Lotus Group, Contact Us, web development, software development, UI/UX design, IT consulting" />
        <meta name="author" content="Lotus Group" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contact Us - Lotus Group" />
        <meta property="og:description" content="Get in touch with Lotus Group for inquiries, collaborations, or to discuss your project needs in web development, software development, UI/UX design, or IT consulting." />
        <meta property="og:url" content="https://lotusgroup.vercel.app/contactus" />
        <meta property="og:image" content="https://lotusgroup.vercel.app/logo.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      <motion.main
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center min-h-[100dvh] py-12 md:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container max-w-4xl px-4 md:px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6 text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Get in Touch</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Have a question or want to work together? Fill out the form below or reach out to us directly.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold">Lotus Group IT Solution</h2>
              <div className="space-y-2">
                <div className="flex items-start gap-4">
                  <div>
                    <a href="tel:+919725636621" className="font-medium" target="_blank">+91 97256 36621</a>
                    <p className="text-gray-500 dark:text-gray-400">Monday - Friday, 9am - 5pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div>
                    <a href="https://wa.me/+919724354610" className="font-medium" target="_blank">+91 97243 54610</a>
                    <p className="text-gray-500 dark:text-gray-400">Get in touch via Whatsapp</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div>
                    <a href="mailto:lotusgroup.dev@gmail.com" className="font-medium" target="_blank">lotusgroup.dev@gmail.com</a>
                    <p className="text-gray-500 dark:text-gray-400">Get in touch via email</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <a className="hover:text-gray-300 transition-colors" href="https://x.com/LotusGroupDev" target="_blank">
                  <Button variant={"ghost"} >
                    <TwitterIcon />
                  </Button>
                </a>
                <a className="hover:text-gray-300 transition-colors" href="https://www.linkedin.com/company/lotusgroupdev" target="_blank" >
                  <Button variant={"ghost"}>
                    <LinkedinIcon />
                  </Button>
                </a>
                <a className="hover:text-gray-300 transition-colors" href="https://github.com/lotusgroupdev" target="_blank">
                  <Button variant={"ghost"}>
                    <GithubIcon />
                  </Button>
                </a>
                <a className="hover:text-gray-300 transition-colors" href="https://www.instagram.com/lotusgroup.dev/" target="_blank">
                  <Button variant={"ghost"}>
                    <InstagramIcon />
                  </Button>
                </a>
                <a className="hover:text-gray-300 transition-colors" href="https://dribbble.com/lotusgroupdev" target="_blank">
                  <Button variant={"ghost"}>
                    <DribbbleIcon />
                  </Button>
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="w-full"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactUsForm />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  );
}

export default ContactUs;
