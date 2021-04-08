import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Container,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import { PersonalInfo } from "../components/PersonalInfo";
import { PaymentInfo } from "../components/PaymentInfo";
import { OrderConfirmation } from "../components/OrderConfirmation";
import { PopupDialog } from "../components/PopupDialog";
import { CartContext, CheckoutContext } from "../contexts";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { PageLoader } from "../components/PageLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  emptyState: {
    display: "block",
    width: 300,
    margin: "100px auto",
  },
}));

function getSteps() {
  return ["Personal Information", "Payment", "Done"];
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [showRedirectionPopup, setShowRedirectionPopup] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>();
  const [showLoader, setShowLoader] = useState(false);
  const cartStore = useContext(CartContext);
  const checkoutStore = useContext(CheckoutContext);
  const steps = getSteps();
  const history = useHistory();

  useEffect(() => {
    if (activeStep === 2) {
      cartStore.destroy();
      setTimeout(() => setShowRedirectionPopup(true), 5000);
    }
  }, [activeStep, cartStore]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const checkout = async () => {
    setShowLoader(true);
    try {
      const response: any = await checkoutStore.submit([...cartStore.items]);
      if (response.status === "sucess") {
        setOrderInfo({
          id: response.order_id,
          items: [...cartStore.items],
          totalPrice: cartStore.totalPrice,
        });
        handleNext();
      } else {
        throw response;
      }
    } catch (error) {
      // proper error handling
      alert("Error happend, please try again");
    } finally {
      setShowLoader(false);
    }
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <PersonalInfo onNext={handleNext} />;
      case 1:
        return <PaymentInfo onNext={checkout} onBack={handleBack} />;
      case 2:
        return (
          <OrderConfirmation
            orderId={orderInfo.id}
            totalPrice={orderInfo.totalPrice}
            items={orderInfo.items}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  };

  if (!cartStore.items.length && !orderInfo) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" className={classes.emptyState}>
          Cart is Empty, <Link to="/">fill it</Link>
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Helmet>
        <title>Shop app | Checkout</title>
      </Helmet>
      <Box mt={3} component="div">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button>Done</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
            </div>
          )}
        </div>
      </Box>
      <PopupDialog
        open={showRedirectionPopup}
        onClose={() => setShowRedirectionPopup(false)}
        onConfirm={() => {
          setShowRedirectionPopup(false);
          history.replace("/");
        }}
      />
      {showLoader && <PageLoader />}
    </Container>
  );
}
