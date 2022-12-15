import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { BankType, InterestsType } from "../typings";
import { useAppDispatch } from "../app/hooks";
import InterestRow from "./InterestRow";
import DeleteModal from "./DeleteModal";
import { useFieldArray, useForm } from "react-hook-form";

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
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

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
                aria-controls={`panel${index + 1}d-content`}
                id="panel1d-header"
              >
                <Typography>
                  <div className="flex space-x-10">
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
