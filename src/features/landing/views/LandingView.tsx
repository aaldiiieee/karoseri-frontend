import { useNavigate } from "react-router";
import { Button } from "@/shared/components/ui/button";

export const LandingView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        Karoseri Component Analysis
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl">
        Advanced damage assessment and component classification system. Upload
        verification images and get instant analysis results.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button onClick={() => navigate("/dashboard")} size="lg">
          Get Started
        </Button>
      </div>
    </div>
  );
};
