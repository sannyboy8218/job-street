import { Toaster } from "sonner";

import { useTheme } from "@/context/ThemeContext";

export default function AppTheme() {
  const { isDark } = useTheme();

  return <Toaster richColors position="top-right" theme={isDark ? "dark" : "light"} />;
}
