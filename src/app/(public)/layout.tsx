import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { AnalyticsTracker } from "@/components/public/AnalyticsTracker";
import { getContent } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();
  return (
    <div className="flex min-h-screen flex-col">
      <AnalyticsTracker />
      <Navbar waMessage={content.waMessage} />
      <main className="flex-1">{children}</main>
      <Footer content={content} />
    </div>
  );
}
