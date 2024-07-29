import { motion } from "framer-motion"; // Import motion from framer-motion library
import ourmission from "../assets/our-mission.png";
import ourvission from "../assets/our-vission.png";
import ourexpertise from "../assets/aboutus-our-expertise.jpg";

const AboutUs = () => {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full py-24 md:py-32 lg:py-40 xl:py-48"
      >
        <div className="inset-0"></div>
        <div className="container px-4 md:px-6">
          <div className="relative mx-auto max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
            >
              About Our IT Company
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 text-lg md:text-xl"
            >
              Discover how our team of experts can transform your business with cutting-edge project management and
              software development services.
            </motion.p>
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full py-12 md:py-24 lg:py-32 border-t-2"
      >
        <div className="container px-4 md:px-6">
          <div className="space-y-6 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-lg dark:bg-gray-800"
            >
              About Us
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
            >
              Empowering Businesses with Innovative IT Solutions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            >
              At our company, we are dedicated to transforming businesses with cutting-edge IT solutions.
            </motion.p>
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full py-12 md:py-24 lg:py-32 border-t-2"
      >
        <div className="container px-4 md:px-6">
          <div className="space-y-6 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-lg dark:bg-gray-800"
            >
              Our Team
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Meet the Experts Behind Our Success
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
            >
              Our talented team of project managers, software developers, and designers are dedicated to delivering
              exceptional results for our clients.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              <div className="flex flex-col items-center space-y-3">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">KB</span>
                </span>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Krunal Bhadesiya</h3>
                  <p className="text-gray-500 dark:text-gray-400">Project Manager</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">HP</span>
                </span>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Himanshu Patel</h3>
                  <p className="text-gray-500 dark:text-gray-400">Software Developer</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">HP</span>
                </span>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Harsh Patel</h3>
                  <p className="text-gray-500 dark:text-gray-400">Web Developer</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">OB</span>
                </span>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Om Bhavsar</h3>
                  <p className="text-gray-500 dark:text-gray-400">UI/UX Designer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full py-12 md:py-24 lg:py-32 border-t-2"
      >
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <motion.img
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: -50 }}
              transition={{ duration: 0.5 }}
              src={ourmission}
              width="550"
              height="310"
              alt="Mission"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-lg dark:bg-gray-800">Our Mission</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Driving Success Through Innovation
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our mission is to empower businesses with innovative IT solutions that drive growth and efficiency. We
                are committed to delivering exceptional results for our clients through our expertise and dedication.
              </p>
            </motion.div>
            <motion.img
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: -50 }}
              transition={{ duration: 0.5 }}
              src={ourmission}
              width="550"
              height="310"
              alt="Mission"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full max-sm:hidden"
            />
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full py-12 md:py-24 lg:py-32 border-t-2"
      >
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={ourvission}
              width="550"
              height="310"
              alt="Vision"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-lg dark:bg-gray-800">Our Vision</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Shaping the Future of IT Solutions
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our vision is to be the leading provider of innovative IT solutions that empower businesses to achieve
                their goals. We strive to continuously evolve our services and stay at the forefront of technology to
                deliver exceptional value to our clients.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full py-12 md:py-24 lg:py-32 border-t-2"
      >
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <motion.img
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              src={ourexpertise}
              width="550"
              height="310"
              alt="Expertise"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-lg dark:bg-gray-800">Our Expertise</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Transforming Businesses with Cutting-Edge IT Solutions
              </h2>
              <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our team of experts specializes in delivering innovative project management and software development
                services that drive growth and efficiency for our clients. We stay at the forefront of technology to
                provide cutting-edge solutions that help businesses achieve their goals.
              </p>
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background h-10 px-4 py-2 text-white border-white hover:bg-white hover:text-[#4338ca]"
              >
                Learn More
              </motion.button>
            </motion.div>
            <motion.img
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              src={ourexpertise}
              width="550"
              height="310"
              alt="Expertise"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last max-sm:hidden"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
