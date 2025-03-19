import React, { useState, useEffect } from "react";
import { Stack } from "@fluentui/react";
import { makeStyles, Button } from "@fluentui/react-components";

interface Step {
  stepComponent: React.ReactNode; 
  number: number; 
  label?: string; 
  icon: React.ElementType;
}

interface StepperProps {
  steps: Step[];
  activeStep?: number; 
  onStepChange?: (stepNumber: number) => void; 
  onSubmit?: () => void; 
  backButtonLabel?: string; 
  nextButtonLabel?: string; 
  submitButtonLabel?: string;
  disableButtons?: boolean; 
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep = 0,
  onStepChange,
  onSubmit,
  backButtonLabel,
  nextButtonLabel,
  submitButtonLabel,
  disableButtons = false,
}) => {
  const [currentStep, setCurrentStep] = useState(activeStep);
  const styles = useStyles();

  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (onSubmit) {
      onSubmit(); 
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getCircleColor = (index: number) => {
    if (index === currentStep) return "#F15D22"; 
    if (index < currentStep) return "#4CAF50"; 
    return "#ccc"; 
  };

  const getLineColor = (index: number) => {
    if (index < currentStep) return "#4CAF50"; 
    if (index === currentStep) return "#4CAF50"; 
    return "#ccc";
  };

  return (
    <div>
      <Stack
        tokens={{ childrenGap: 15 }}
        styles={{
          root: styles.stepperContainer,
        }}
      >
        <Stack
          horizontal
          verticalAlign="center"
          styles={{
            root: {
              width: "fit-content",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              position: "relative",
            },
          }}
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon; 
            return (
              <Stack
                key={index}
                horizontal
                verticalAlign="center"
                styles={{
                  root: {
                    alignItems: "center",
                    position: "relative",
                    margin: "0 -1px",
                    flex: "0 0 auto",
                    cursor: "pointer",
                  },
                }}
                onClick={() => setCurrentStep(index)}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      margin: "0 6vh",
                    }}
                  >
                    {index > 0 && (
                      <div
                        style={{
                          backgroundColor: getLineColor(index),
                          right: "100%",
                          width: "80px",
                          height: "4px",
                          position: "absolute",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      />
                    )}
                    <div
                      className={styles.stepCircle}
                      style={{
                        backgroundColor: getCircleColor(index),
                      }}
                    >
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        style={{
                          backgroundColor: getLineColor(index + 1),
                          left: "100%",
                          width: "80px",
                          height: "4px",
                          position: "absolute",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      />
                    )}
                  </div>
                  <IconComponent
                    style={{
                      fontSize: 28,
                      width: "32px",
                      height: "32px",
                      marginTop: "10px",
                      marginBottom: 8,
                      color: index <= currentStep ? "#002856" : "#ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                  <div
                    style={{
                      color: index === currentStep ? "#002856" : "#ccc",
                      fontWeight: index === currentStep ? "bold" : "normal",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    {step.label}
                  </div>
                </div>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
      <div>
        {steps[currentStep].stepComponent}{" "}
        {/* Render the content for the current step */}
      </div>
      <div className={styles.buttonContainer}>
        {!disableButtons && (
          <>
            <Button
              disabled={currentStep === 0}
              onClick={handleBack}
              style={{
                backgroundColor: "#FFFFF",
                color: "#242424",
              }}
            >
              {backButtonLabel || "Back"}
            </Button>
            <Button
              onClick={handleNext}
              style={{
                backgroundColor: "#F15D22",
                color: "#fff",
              }}
            >
              {currentStep === steps.length - 1
                ? submitButtonLabel || "Submit"
                : nextButtonLabel || "Next"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Stepper;

const useStyles = makeStyles({
  stepperContainer: {
    width: "80%",
    padding: "0 20px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2%",
  },
  stepCircle: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
  },
  stepLine: {
    width: "80px",
    height: "4px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "end",
    marginTop: "20px",
    gap: "10px",
  },
});


