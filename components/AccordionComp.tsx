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

export default function AccordionComp({ banks }: { banks: BankType[] }) {
  const [expanded, setExpanded] = useState<string | false>("");
  const [selectedBank, setSelectedBank] = useState<BankType>();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [interests, setInterests] = useState<any>();
  const { control, register, watch, trigger } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "banks",
  });

  useEffect(() => {
    if (watch("banks").length === 0) {
      banks.forEach((bank) => {
        append({
          id: bank.id,
          bank_name: bank.bank_name,
          interests: bank.interests,
        });
      });
    }
  }, [append, banks, watch]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleDelete = (id: any) => {
    setSelectedBank(id);
    setIsOpen(true);
  };

  return (
    <div>
      {isOpen && selectedBank && (
        <DeleteModal
          id={selectedBank.id}
          bank_name={selectedBank.bank_name}
          isOpen={isOpen}
          setExpanded={setExpanded}
          setIsOpen={setIsOpen}
        />
      )}
      {fields.map((bank: any, index: number) => {
        return (
          <div key={index}>
            <Accordion
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                aria-controls={`panel${index + 1}d-content`}
                id="panel1d-header"
              >
                <Typography>{bank.bank_name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <InterestRow
                    ban
                    rowIndex={index}
                    control={control}
                    watch={watch}
                    register={register}
                    bank={banks[index]}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}
