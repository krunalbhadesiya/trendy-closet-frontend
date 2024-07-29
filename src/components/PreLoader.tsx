import { motion } from "framer-motion";

function PreLoader() {

    return (
        <motion.div
            className="w-full h-screen flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                ease: "linear",
                duration: 0.7,
                x: { duration: 0.7 }
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6 text-xl md:text-3xl font-mono font-semibold">
                👋 Welcome to Trendy Closet
            </motion.div>

        </motion.div>
    )
}

export default PreLoader