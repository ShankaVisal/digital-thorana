import type { Metadata } from "next";

import { ThoranaExperience } from "@/components/ThoranaExperience";

export const metadata: Metadata = {
  title: "Tapro IT Digital Vesak Thorana | Nandivisala Jataka",
  description: "A premium, animated Vesak thorana experience with the Nandivisala Jataka story.",
};

export default function ThoranaPage() {
  return <ThoranaExperience />;
}