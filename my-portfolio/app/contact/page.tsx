import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import Scales from "@/components/ui/scales";
import { cn } from "@/lib/utils";

export default function Contact() {


    return (
        <div className="relativemin-h-screen overflow-hidden">
            {/* <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
                    "inset-0 h-full skew-y-12"
                )}
            /> */}
            <Scales orientation="diagonal" size={15} className="" />
            <div className="">
                <a className="flex justify-center items-center sm:justify-start text-[2em] sm:text-[3.5em] leading-[0.9em] p-20 sm:pl-1 sm:p-20" href="mailto:faik.hasanov05@gmail.com">
                    faik.hasanov05@<br />gmail.com
                </a>
                <a className="text-[3em]">GitHub</a>
                <br/>
                <a className="text-[3em]" href="">LiknedIn</a>
            </div>
        </div>
    );
}