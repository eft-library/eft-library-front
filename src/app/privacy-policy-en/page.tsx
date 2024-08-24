import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | EFT Library",
  description: "EFT Library",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library Privacy Policy",
    description: "EFT Library Privacy Policy",
    images: "/og.png",
    url: "https://eftlibrary.com/privacy-policy-en",
  },
};

export default function PrivacyPolicy() {
  return (
    <PageParent>
      <SubHeader title="Privacy Policy" />
      <Box padding="4">
        <Text>
          <strong>‘EFT Library’</strong> places great importance on the
          protection of customer personal information and complies with the
          relevant laws and regulations that information and communications
          service providers must adhere to, such as the Act on Promotion of
          Information and Communications Network Utilization and Information
          Protection and the Personal Information Protection Act. Based on this,
          we have established the following privacy policy to inform you of how
          your personal information is used and what measures are being taken to
          protect it.
        </Text>
        <Text mt={4}>
          This privacy policy may change according to changes in laws or
          guidelines, or changes in our policy. Members are encouraged to check
          our site regularly for updates.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          General Provisions
        </Heading>
        <Text mt={2}>
          <strong>‘EFT Library’</strong> (hereinafter referred to as "the
          Company") places great importance on the protection of the personal
          information of users and makes every effort to ensure that personal
          information provided online is protected while users use the company's
          services. The company complies with the personal information
          protection regulations and guidelines of relevant laws, such as the
          Act on Promotion of Information and Communications Network Utilization
          and Information Protection.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          1. Description of App Functions
        </Heading>
        <Text mt={2}>
          <strong>EFT Library</strong> is a site that provides guide information
          for the Escape from Tarkov game. Users can enjoy the game more
          effectively through various guides, weapon and equipment information,
          and community forums. The personal information collected on the site
          is used only for providing these services and enhancing the user
          experience.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          2. Hosting on a Verified Domain
        </Heading>
        <Text mt={2}>
          The <strong>EFT Library</strong> website is hosted on a verified
          domain,{" "}
          <Link href="https://www.eftlibrary.com">
            <strong>www.eftlibrary.com</strong>
          </Link>
          , owned by the company, and is not hosted on a third-party platform.
          This ensures that users can utilize the service in a trustworthy
          environment.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          3. Consistent Privacy Policy Link
        </Heading>
        <Text mt={2}>
          The privacy policy link accessed from the personal information
          provision consent screen is consistent with the link on this page,
          ensuring that users can always view the correct privacy policy.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          4. Accessible Without Login
        </Heading>
        <Text mt={2}>
          This privacy policy is publicly accessible to all users of{" "}
          <strong>EFT Library</strong> without requiring a login. Users can
          check this page to view the privacy policy at any time.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          5. Consent to the Collection of Personal Information
        </Heading>
        <Text mt={2}>
          The company provides a procedure where users can click the "Agree" or
          "Cancel" button for the contents of the company's privacy policy or
          terms of use. If the "Agree" button is clicked, it is considered that
          the user agrees to the collection of personal information.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          6. Items of Personal Information Collected and Purpose of Collection
          and Use
        </Heading>
        <Text mt={2}>
          ① "Personal information" refers to information about a living
          individual that can identify a specific individual by the name, date
          of birth, etc., included in the information.
        </Text>
        <Text mt={2}>
          ② The items of personal information collected from individual members
          and the purposes for collection and use are as follows:
        </Text>
        <Text mt={2} pl={4}>
          <strong>Required items:</strong> ID (email account), authentication
          value - to prevent unauthorized use and misuse by malicious users,
          cookie information, member number, etc., necessary for service
          provision.
        </Text>
        <Text mt={2} pl={4}>
          <strong>Optional items:</strong> Address, verification procedures for
          membership services, IP address.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          7. Methods of Collecting Personal Information
        </Heading>
        <Text mt={2}>
          The company collects essential information online when users sign up
          for membership services and may request additional information (such
          as a phone number) that can be selectively entered as needed.
          Additional personal information may be requested for statistical
          analysis and prize delivery during surveys or events within the
          shopping mall.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          8. Retention and Use Period of Personal Information
        </Heading>
        <Text mt={2}>
          The company continuously retains and uses the personal information of
          users while they are members of the company to provide services.
          However, if a user requests withdrawal or the purpose of collection is
          achieved, the company will promptly destroy the personal information.
        </Text>
        <Text mt={2}>
          In accordance with the law, the company retains member information for
          a certain period if it is required by law, or if necessary for
          litigation or dispute resolution:
        </Text>
        <Text mt={2} pl={4}>
          - If necessary for retention according to the Commercial Act or other
          laws
          <br />
          - If necessary for retention in anticipation of litigation or disputes
          <br />- If separate consent has been obtained from the transaction
          counterpart
        </Text>

        <Heading as="h2" size="md" mt={6}>
          9. Procedure and Method of Destroying Personal Information
        </Heading>
        <Text mt={2}>
          The company promptly destroys personal information after the purpose
          of collection and use is achieved. The procedure and method of
          destruction are as follows:
        </Text>
        <Text mt={2} pl={4}>
          <strong>Destruction procedure:</strong> Information entered by users
          is transferred to a separate database after the purpose is achieved
          and stored for a certain period before being destroyed.
          <br />
          <strong>Destruction method:</strong> Electronic files are deleted
          using a technical method that makes recovery impossible, and personal
          information printed on paper is shredded or incinerated.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          10. User and Legal Representative Rights and How to Exercise Them
        </Heading>
        <Text mt={2}>
          Users and legal representatives can view or modify their personal
          information at any time and request account cancellation. After
          identity verification, requests are promptly processed via written
          request, phone, or email.
        </Text>
        <Text mt={2}>
          In the case of children under the age of 14, legal representatives
          have the right to view or modify the child's personal information and
          to withdraw consent to the collection and use of the child's personal
          information.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          11. Installation, Operation, and Rejection of Automatic Personal
          Information Collection Devices
        </Heading>
        <Text mt={2}>
          The company uses cookies to frequently store and retrieve user
          information. The purpose of using cookies is to provide customized
          services by identifying the usage patterns of visited services and
          websites.
        </Text>
        <Text mt={2}>
          Users have the option to allow or reject the installation of cookies
          through their web browser settings.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          12. Technical and Managerial Measures for Personal Information
          Protection
        </Heading>
        <Text mt={2}>
          The company implements the following technical and managerial measures
          to protect users' personal information:
        </Text>
        <Text mt={2} pl={4}>
          <strong>Password encryption:</strong> Passwords are encrypted and
          stored.
          <br />
          <strong>Measures against hacking:</strong> Security systems are in
          place to prevent hacking and viruses.
          <br />
          <strong>
            Minimization and education of personal information handlers:
          </strong>{" "}
          The company provides training for personal information handlers.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          13. Contact Information of the Personal Information Protection Officer
          and Staff
        </Heading>
        <Text mt={2}>
          The company has designated relevant departments and responsible
          persons for the protection of personal information and provides the
          following contact information for inquiries or complaints:
        </Text>
        <Text mt={2} pl={4}>
          <strong>Personal Information Protection Officer</strong>:<br />
          Name: Huijae Mun
          <br />
          Email: tarkovlibrary@gmail.com
        </Text>
      </Box>
    </PageParent>
  );
}
