import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Heading, Text, Highlight } from "@chakra-ui/react";

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
      <Box mb={10} />
      <Box p={5} w={"100%"}>
        <Text mb={3} fontWeight={600}>
          ‘TKL’ highly values the privacy of its customers and is committed to
          protecting their personal information to prevent any harm caused by
          data breaches. In line with this commitment, we comply with the
          relevant laws, including the
          <Highlight
            query="Act on Promotion of Information and Communications Network Utilization and Information Protection"
            styles={{ color: ALL_COLOR.RED, fontWeight: "bold" }}
          >
            Act on Promotion of Information and Communications Network
            Utilization and Information Protection
          </Highlight>
          and the
          <Highlight
            query="Personal Information Protection Act"
            styles={{ color: ALL_COLOR.RED, fontWeight: "bold" }}
          >
            Personal Information Protection Act
          </Highlight>
          . This Privacy Policy outlines how we use, manage, and protect your
          personal information.
        </Text>

        <Text mb={3} fontWeight={600}>
          Our Privacy Policy may change due to legal updates or changes in our
          policies. We recommend that you regularly check our website for any
          updates.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          General Provisions
        </Heading>
        <Text mb={3} fontWeight={600}>
          'TKL' (hereinafter referred to as "the Company") places great
          importance on the protection of users' personal information. The
          Company strives to protect the personal information that users provide
          online while using our services. We comply with the
          <Highlight
            query="Act on Promotion of Information and Communications Network Utilization and Information Protection"
            styles={{ color: ALL_COLOR.RED, fontWeight: "bold" }}
          >
            Act on Promotion of Information and Communications Network
            Utilization and Information Protection
          </Highlight>
          and other relevant regulations.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          1. Consent to Collection of Personal Information
        </Heading>
        <Text mb={3} fontWeight={600}>
          The Company provides a procedure where users can click "Agree" or
          "Cancel" on the Privacy Policy or Terms of Service. By clicking
          "Agree," users are deemed to have consented to the collection of
          personal information.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          2. Personal Information Collected and Purpose of Collection/Use
        </Heading>
        <Text mb={3} fontWeight={600}>
          ① "Personal information" refers to information about a living
          individual that can identify that person based on the information,
          including name and date of birth. This includes information that, when
          combined with other data, can easily identify a person.
        </Text>
        <Text mb={3} fontWeight={600}>
          ② The personal information we collect from individual members and the
          purposes for its collection and use are as follows:
        </Text>
        <Text mb={3} fontWeight={600}>
          [Mandatory Information]
          <br />
          <Highlight
            query="Username (email address), authentication value: Prevention of unauthorized use by problematic members, cookie information collected through automated data collection devices, member number: Service provision"
            styles={{ color: ALL_COLOR.RED, fontWeight: "bold" }}
          >
            Username (email address), authentication value: Prevention of
            unauthorized use by problematic members, cookie information
            collected through automated data collection devices, member number:
            Service provision
          </Highlight>
        </Text>
        <Text mb={3} fontWeight={600}>
          [Optional Information]
          <br />
          <Highlight
            query="Address and identity verification procedures for membership services, IP Address"
            styles={{ color: ALL_COLOR.RED, fontWeight: "bold" }}
          >
            Address and identity verification procedures for membership
            services, IP Address
          </Highlight>
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          3. Methods of Collecting Personal Information
        </Heading>
        <Text mb={3} fontWeight={600}>
          ① The Company collects essential information online when users sign up
          for membership services. Mandatory information includes password,
          email address, etc. Optional information, such as phone number, may
          also be collected to provide high-quality services. Additionally,
          personal information may be requested for statistical analysis or
          prize delivery during surveys or events on our shopping mall.
        </Text>
        <Text mb={3} fontWeight={600}>
          ② Sensitive personal information (e.g., race, ethnicity, ideology,
          religion, birthplace, political affiliation, and criminal records)
          that could infringe on basic human rights is not collected. If such
          information must be collected, prior consent from users will be
          obtained. The information collected will not be used for purposes
          other than those stated or disclosed to users.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          4. Retention and Use Period of Personal Information
        </Heading>
        <Text mb={3} fontWeight={600}>
          The Company retains and uses users' personal information for the
          duration of the service provision period. However, if a user requests
          withdrawal or deletion, or if the purpose of collection is achieved,
          the information will be immediately destroyed.
        </Text>
        <Text mb={3} fontWeight={600}>
          Additionally, information may be retained for a specified period
          according to relevant laws in the following cases:
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ When retention is necessary under commercial or other relevant laws.
          <br />
          ▶ When retention is necessary for litigation or dispute resolution.
          <br />▶ When separate consent has been obtained from the transaction
          counterpart.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          5. Procedure and Method for Destroying Personal Information
        </Heading>
        <Text mb={3} fontWeight={600}>
          The Company will promptly destroy users' personal information once the
          purpose of collection and use has been achieved. The destruction
          process and methods are as follows:
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ Destruction Procedure
          <br />
          Information entered by the user for membership, etc., will be moved to
          a separate database (in the case of paper, a separate file cabinet)
          after the purpose is achieved. The information will then be stored for
          a certain period according to internal policies and other relevant
          laws before being destroyed. Personal information moved to the
          database will not be used for other purposes unless required by law.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ Destruction Method
          <br />
          Electronic files will be deleted using technical methods that prevent
          recovery. Personal information printed on paper will be shredded or
          incinerated.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          6. Users' and Legal Guardians' Rights and How to Exercise Them
        </Heading>
        <Text mb={3} fontWeight={600}>
          Users and legal guardians can view or edit their registered personal
          information or request membership cancellation at any time.
          Verification of identity will be required to process such requests.
          The Company will promptly take action upon receiving a request via
          written communication, phone, or email.
        </Text>
        <Text mb={3} fontWeight={600}>
          For children under the age of 14, legal guardians have the right to
          view, edit, or withdraw consent for the collection and use of their
          child's personal information.
        </Text>
        <Text mb={3} fontWeight={600}>
          Deleted or withdrawn personal information will be processed as
          outlined in the "Retention and Use Period of Personal Information"
          section and will not be used or accessed for other purposes.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          7. Installation, Operation, and Rejection of Automatic Data Collection
          Devices
        </Heading>
        <Text mb={3} fontWeight={600}>
          The Company uses "cookies" to store and retrieve user information.
          Cookies are small text files sent to the user's browser by the web
          server and stored on the user's hard disk. Cookies are used to provide
          users with more personalized services by identifying user visit
          patterns, service usage, and preferences.
        </Text>
        <Text mb={3} fontWeight={600}>
          Users have the option to accept or reject cookie installation. Users
          can configure their web browser settings to allow all cookies, receive
          confirmation each time a cookie is stored, or reject all cookies.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ Cookie settings
          <br />- Internet Explorer: Tools {">"} Internet Options {">"} Privacy{" "}
          {">"} Advanced
          <br />- Chrome: Settings {">"} Show Advanced Settings {">"} Privacy{" "}
          {">"} Content Settings
        </Text>
        <Text mb={3} fontWeight={600}>
          Rejecting cookies may limit the use of certain services or features
          provided by the Company.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          8. Protection Measures for Personal Information
        </Heading>
        <Text mb={3} fontWeight={600}>
          The Company implements the following technical, administrative, and
          physical measures to ensure the security of personal information:
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ Technical Measures: Using secure networks and systems, encryption of
          critical data, installing and regularly updating anti-virus software.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ Administrative Measures: Limiting access to personal information to
          authorized personnel, conducting regular training on personal
          information protection.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ Physical Measures: Storing personal information in secure locations,
          using access control systems.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          9. Personal Information Protection Officer
        </Heading>
        <Text mb={3} fontWeight={600}>
          The Company has designated a Personal Information Protection Officer
          to handle inquiries, complaints, and damage relief regarding the
          processing of personal information.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ Personal Information Protection Officer:
          <br />
          Name: HuiJae Mun
          <br />
          Contact: tarkovlibrary@gmail.com
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          10. Changes to the Privacy Policy
        </Heading>
        <Text mb={3} fontWeight={600}>
          This Privacy Policy may be revised periodically due to changes in
          laws, regulations, or the Company's internal policies. Any changes
          will be announced on the website 7 days prior to the effective date.
        </Text>
        <Text mt={10} mb={3} fontWeight={600}>
          This policy is effective from [2024.08.21].
        </Text>
      </Box>
    </PageParent>
  );
}
