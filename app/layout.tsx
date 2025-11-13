import "./globals.css";

export const metadata = {
  title: "Logistics Route Analytics Map",
  description: "Interactive geospatial clustering & hexagonal analysis"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
