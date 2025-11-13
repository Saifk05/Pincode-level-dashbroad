import "./globals.css";

export const metadata = {
  title: "Map Project",
  description: "Leaflet Map with CSV Data",
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
