import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { cn } from "@/lib/utils";

export default function Contact() {


    return (
        <div className="relative flex items-center justify-center h-[90vh] overflow-hidden">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
                    "inset-0 h-full skew-y-12"
                )}
            />
        </div>
    );
}