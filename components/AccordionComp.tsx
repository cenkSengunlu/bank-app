import { useState } from "react";
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
import { deleteBank, setInterest } from "../slices/bank/bankSlice";
import InterestRow from "./InterestRow";
import DeleteModal from "./DeleteModal";
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import { current } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const [test, setTest] = useState<any>([]);
  const [interests, setInterests] = useState<any>();
  const [currentBank, setCurrentBank] = useState<any>({
    id: 0,
    isOpen: false,
  });

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const schema = yup.object().shape({
    credit_type: yup.number().required(),
    time_option: yup.number().required(),
    interest: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: any) => {
    console.log({ data });
    reset();
  };

  const handleInterest = (bank: BankType) => {
    bank.interests.push({
      bank_id: bank.id,
      interest: 0,
      credit_type: 0,
      time_option: 0,
    });
    console.log(bank);
    // if (bank) {
    //   const bankInterests = [
    //     ...bank?.interests,
    //     {
    //       bank_id: bank.id,
    //       interest: 0,
    //       time_option: 0,
    //       credit_type: 0,
    //     },
    //   ];
    //   const newBank = {
    //     ...bank,
    //     interests: bankInterests,
    //   } as BankType;
    //   console.log(newBank);
    //   dispatch(setInterest(newBank));
    // }
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
      {banks.map((bank: BankType, index: number) => {
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
                <Typography>test {bank.id}</Typography>
                <div className="grid grid-cols-4 gap-4">
                  <div className="w-full flex justify-center items-center">
                    Tür
                  </div>
                  <div className="w-full flex justify-center items-center">
                    Vade
                  </div>
                  <div className="w-full flex justify-center items-center">
                    Aylık Faiz Oranı
                  </div>
                  <div className="w-full grid grid-cols-2 gap-1">
                    <button
                      disabled={bank.interests && bank.interests.length === 8}
                      onClick={() => {
                        setCurrentBank({
                          id: bank.id,
                          isOpen: !currentBank.isOpen,
                        });
                      }}
                      className="cursor-pointer bg-blue-600 border-2 border-blue-700 rounded-lg w-full h-10 flex justify-center items-center text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Faiz Ekle
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(bank);
                      }}
                      className="cursor-pointer bg-red-500 border-2 border-red-600 rounded-lg w-full h-10 flex justify-center items-center text-white text-sm"
                    >
                      Bankayı Sil
                    </button>
                  </div>

                  {currentBank.id === bank.id &&
                    currentBank.isOpen &&
                    bank.interests.map(
                      (interest: InterestsType, index: number) => {
                        return (
                          <InterestRow interest={interest} index={index} />
                        );
                      }
                    )}
                  {currentBank.id === bank.id && currentBank.isOpen && (
                    <InterestRow
                      interest={{
                        bank_id: bank.id,
                        interest: 0,
                        credit_type: 0,
                        time_option: 0,
                      }}
                      index={index}
                    />
                  )}

                  {/* 
                  {currentBank.id === bank.id && (
                    <InterestRow
                      interest={{
                        bank_id: bank.id,
                        interest: 0,
                        credit_type: 0,
                        time_option: 0,
                      }}
                      index={0}
                    />
                  )} */}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}
