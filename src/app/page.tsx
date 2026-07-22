import { ApplicationProcess } from "@/components/home/ApplicationProcess";
import { Benefits } from "@/components/home/Benefits";
import { Hero } from "@/components/home/Hero";
import { ScholarshipOverview } from "@/components/home/ScholarshipOverview";

export default function HomePage() {
  return (
    <>
      <Hero />

      <ScholarshipOverview />

      <Benefits />

      <ApplicationProcess />
    </>
  );
}
