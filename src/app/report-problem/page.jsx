"use client";

import { useRef, useState } from "react";
import { Button } from "@heroui/react";
import ProblemStep from "@/components/homePage/reports/ProblemStep";
import LocationEvidenceStep from "@/components/homePage/reports/LocationEvidenceStep";
import ReviewSubmitStep from "@/components/homePage/reports/ReviewSubmitStep";

const ReportProblemPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const problemFormRef = useRef(null);
    const locationFormRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        category: {
            id: "",
            name: "",
        },
        priority: "",
        description: "",
        division: {
            id: "",
            name: "",
        },
        district: {
            id: "",
            name: "",
        },
        upazila: {
            id: "",
            name: "",
        },
        areaWard: "",
        specificLocation: "",
        evidence: [],
    });

    const steps = [
        {
            id: 1,
            title: "Problem",
        },
        {
            id: 2,
            title: "Location & Evidence",
        },
        {
            id: 3,
            title: "Review & Submit",
        },
    ];

    const handleNext = () => {
        const formRef =
            currentStep === 1 ? problemFormRef : locationFormRef;

        if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }

        const form = new FormData(formRef.current);
        const data = Object.fromEntries(form.entries());

        setFormData((prev) => ({
            ...prev,
            ...(currentStep === 1
                ? {
                      title: data.title,
                      priority: data.priority,
                      description: data.description,
                  }
                : {
                      areaWard: data.areaWard,
                      specificLocation: data.specificLocation,
                  }),
        }));

        if (currentStep < 3) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <div className="min-h-screen px-4 py-8 md:px-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Report a Public Problem
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Help improve your community by reporting a public issue.
                    </p>
                </div>

                <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
                    <div className="flex items-center">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className="flex flex-1 items-center"
                            >
                                <div className="flex items-center">
                                    <div
                                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                                            currentStep >= step.id
                                                ? "bg-[#0F6848] text-white"
                                                : "border border-gray-300 bg-white text-gray-500"
                                        }`}
                                    >
                                        {step.id}
                                    </div>

                                    <span
                                        className={`ml-3 hidden text-sm font-medium sm:block ${
                                            currentStep >= step.id
                                                ? "text-gray-900"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {step.title}
                                    </span>
                                </div>

                                {index < steps.length - 1 && (
                                    <div
                                        className={`mx-3 h-px flex-1 sm:mx-5 ${
                                            currentStep > step.id
                                                ? "bg-[#0F6848]"
                                                : "bg-gray-200"
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                    {currentStep === 1 && (
                        <ProblemStep
                            formRef={problemFormRef}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )}

                    {currentStep === 2 && (
                        <LocationEvidenceStep
                            formRef={locationFormRef}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )}

                    {currentStep === 3 && (
                        <ReviewSubmitStep data={formData} />
                    )}

                    <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                        {currentStep > 1 ? (
                            <Button
                                variant="bordered"
                                onPress={handleBack}
                                className="px-6 font-medium"
                            >
                                Back
                            </Button>
                        ) : (
                            <div />
                        )}

                        {currentStep < 3 && (
                            <Button
                                type="button"
                                onPress={handleNext}
                                className="bg-[#0F6848] px-7 font-medium"
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportProblemPage;