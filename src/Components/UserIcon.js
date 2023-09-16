import { Box, Tooltip } from "@mui/material";
export default function UserIcon({ user, isCreator }) {
  const firstLetter = user.email.charAt(0).toUpperCase();
  const backgroundColor =
    user.gender === "Female"
      ? "pink"
      : user.gender === "Male"
      ? "lightblue"
      : "grey.300";

  return (
    <div>
      <Tooltip title={`${user.firstName} ${user.lastName}`} arrow>
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: backgroundColor,
            border: isCreator ? "4px solid gold" : "none",
            "&:hover": {
              backgroundColor: "grey.500",
            },
          }}
        >
          <div>{firstLetter}</div>
        </Box>
      </Tooltip>
    </div>
  );
}
