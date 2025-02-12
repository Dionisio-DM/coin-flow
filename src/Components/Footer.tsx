import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Flex, Link } from "@radix-ui/themes";

export const Footer: React.FC = () => {
  return (
    <>
      <Flex align={"center"} justify={"center"} direction={"row"} gap={"4"}>
        <Link
          href="https://github.com/Dionisio-DM"
          target="_blank"
          color="gray"
        >
          <GitHubLogoIcon width={"1.5rem"} height={"1.5rem"} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/dionisiodiogenes/"
          target="_blank"
        >
          <LinkedInLogoIcon width={"1.5rem"} height={"1.5rem"} color="gray" />
        </Link>
      </Flex>
    </>
  );
};
