import React from 'react';

interface Step {
  id: number | string;
  title: string;
  icon?: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  activeStep: number;
  onStepClick?: (stepIndex: number) => void;
  color?: string;
  className?: string;
}

const Stepper = ({
  steps,
  activeStep,
  onStepClick,
  color = '#3B82F6',
  className = '',
}: StepperProps) => {
  const totalWidthPercent = 80;
  const lineContainerPaddingPercent = 5;

  // Align progress width exactly with the center of the active step
  const progressWidthPercent =
    steps.length <= 1
      ? 0
      : (activeStep / (steps.length - 1)) * totalWidthPercent +
        lineContainerPaddingPercent;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Background line */}
      <div
        className="absolute h-6 bg-gray-300 top-1/2 -translate-y-1/2 z-0 rounded-full"
        style={{
          left: `${lineContainerPaddingPercent}%`,
          right: `${lineContainerPaddingPercent}%`,
        }}
      ></div>

      {/* Progress line */}
      <div
        className="absolute h-6 top-1/2 -translate-y-1/2 z-10 transition-all duration-500 rounded-full"
        style={{
          left: `${lineContainerPaddingPercent}%`,
          width: `${progressWidthPercent}%`,
          backgroundColor: color,
        }}
      ></div>

      {/* Steps */}
      <div
        className="grid relative z-20"
        style={{
          gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
          paddingLeft: `${lineContainerPaddingPercent}%`,
          paddingRight: `${lineContainerPaddingPercent}%`,
        }}
      >
        {steps.map((step, index) => {
          const isActive = index <= activeStep;
          const StepElement = onStepClick ? 'button' : 'div';

          const stepCenterPercent =
            (index / (steps.length - 1)) * totalWidthPercent +
            lineContainerPaddingPercent;
          const left = `${stepCenterPercent}%`;

          return (
            <div key={step.id} className="relative h-32">
              {/* Step circle */}
              <StepElement
                className={`w-5 h-5 rounded-full flex items-center justify-center absolute top-1/2 shadow-md transition-all duration-300 ${
                  isActive ? 'scale-110 shadow-lg' : 'bg-gray-400'
                } ${onStepClick ? 'cursor-pointer' : ''}`}
                style={{
                  left,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: isActive ? color : undefined,
                }}
                onClick={() => onStepClick?.(index)}
              />

              {/* Icon & Title */}
              <div
                className="absolute flex flex-col items-center mt-2"
                style={{
                  top: '60%',
                  left,
                  transform: 'translate(-50%, 0%)',
                }}
              >
                {step.icon && <div className="mt-1">{step.icon}</div>}
                <span
                  className={`text-sm font-medium mt-1 text-center ${
                    isActive ? 'font-semibold' : 'text-gray-500'
                  }`}
                  style={isActive ? { color } : undefined}
                >
                  {step.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
