import HomeContent from "@/components/HomeContent";
import SiteLoader from "@/components/SiteLoader";

export default function Home() {
  return (
    <SiteLoader>
      <HomeContent />
    </SiteLoader>
  );
}
