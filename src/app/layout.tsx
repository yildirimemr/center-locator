import "./globals.css";
import RootStyleRegistry from "../utils/emotion";
import DarkLightTheme from "@/theme/DarkLightTheme";
import PageContainer from "@/components/PageContainer";

export const metadata = {
  title: "Center Locator",
  description: "Optimum Center Locator | Developed by Emre Yıldırım",
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html>
      <head></head>
      <body>
        <DarkLightTheme>
          <RootStyleRegistry>            
            <PageContainer>{children}</PageContainer>
          </RootStyleRegistry>
        </DarkLightTheme>
      </body>
    </html>
  );
}
