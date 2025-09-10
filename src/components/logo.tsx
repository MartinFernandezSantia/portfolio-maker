import { MotionLink } from "./motion-link";
import { scrollToSection } from "@/lib/utils";

type LogoProps = {
    onClick: () => void;
}

export default function Logo({ onClick }: LogoProps) {
    return (
        <MotionLink
            href="#"
            onClick={(e) => {
                e.preventDefault();
                scrollToSection("#");
                onClick();
            }}
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
        >
            Alex Johnson
        </MotionLink>
    )
}
