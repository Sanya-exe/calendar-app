import { motion } from "framer-motion";

export const HeroImage = ({ theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-36 sm:h-44 md:h-56 lg:h-72 overflow-hidden rounded-t-2xl md:rounded-2xl"
      style={{
        backgroundColor: theme.bgLight,
      }}
    >
      <img
        src={theme.heroImage}
        alt={`${theme.name} theme`}
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${theme.bgLight}cc 100%)`,
        }}
      />
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: theme.primary }}
          />
          <span
            className="text-xs sm:text-sm font-medium"
            style={{ color: theme.text }}
          >
            {theme.name} Theme
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};