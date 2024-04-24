import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <Button onClick={goBack} size="icon" className="rounded-full">
      <ArrowRight className="transform rotate-180" />
    </Button>
  );
}
