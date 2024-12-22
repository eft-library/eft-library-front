import { Box, Flex } from "@chakra-ui/react";
import type { PageParent } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import AdBanner from "@/components/adsense/adBanner";

export default function PageParent({ children, leftAdUse = true }: PageParent) {
  return (
    <Box
      className="Main"
      bgSize="cover"
      bg={ALL_COLOR.BACKGROUND}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      minHeight="100vh"
    >
      {leftAdUse && (
        <Box
          style={{
            display: "block",
            position: "fixed",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "10%",
            zIndex: 1000,
          }}
        >
          <AdBanner
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
            dataAdSlot="8601640289"
          />
        </Box>
      )}

      <Flex
        className="Container"
        flex="1"
        flexDirection="column"
        maxWidth="1200px"
        minWidth="300px"
        paddingTop="60px"
        marginX="10%"
        bg={ALL_COLOR.BACKGROUND}
        borderRadius="lg"
        justifyContent="center"
      >
        {children}
      </Flex>

      <Box
        style={{
          display: "block",
          position: "fixed",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "10%",
          zIndex: 10,
        }}
      >
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="8601640289"
        />
      </Box>
    </Box>
  );
}
