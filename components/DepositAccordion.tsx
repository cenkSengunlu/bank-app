import { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { BankType } from "../typings";
import { Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  display: "flex",
  justfifyContent: "flex-start",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "column",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(0deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const CustomExpandIcon = () => {
  return (
    <Box
      sx={{
        ".Mui-expanded & > .collapsIconWrapper": {
          display: "none",
        },
        ".expandIconWrapper": {
          display: "none",
        },
        ".Mui-expanded & > .expandIconWrapper": {
          display: "block",
        },
      }}
    >
      <div className="expandIconWrapper text-dark-purple font-semibold bg-secondary-purple py-1 px-5 rounded-full mt-1 mb-2">
        Detayları Gizle
      </div>
      <div className="collapsIconWrapper text-dark-purple font-semibold bg-secondary-purple py-1 px-5 rounded-full mt-1 mb-2">
        Detaylar İçin Tıkla
      </div>
    </Box>
  );
};

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const DepositAccordion = ({
  bank,
  amount,
  time,
  timeName,
}: {
  bank: BankType;
  amount: number;
  time: number;
  timeName: string | undefined;
}) => {
  const [expanded, setExpanded] = useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div className="w-4/6 mx-auto overflow-auto">
      {bank.interests.map((interest, index) => {
        if (interest.time_option === time) {
          return (
            <Accordion
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                expandIcon={<CustomExpandIcon />}
                aria-controls={`panel${index + 1}d-content`}
                id="panel1d-header"
              >
                <Typography>
                  <div className="flex justify-start space-x-10">
                    <div className="w-32 font-semibold">{bank.bank_name}</div>
                    <div className="">
                      Aylık Faiz Oranı %{interest.interest}
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="w-full flex flex-col items-center">
                  <div>Mevduat Tutarı: {amount} TL</div>
                  <div>
                    {timeName} vade sonra alınacak faiz tutarı:{" "}
                    {(amount * interest.interest) / 100} TL
                  </div>
                  <div>
                    {" "}
                    {timeName} vade sonra toplam mevduat:{" "}
                    {(amount * interest.interest) / 100 + amount} TL
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        }
      })}
    </div>
  );
};

export default DepositAccordion;
